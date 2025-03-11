
import { useState, useEffect, useCallback } from 'react';
import { Cryptocurrency, ChartData, TimeFrame } from '@/lib/types';
import { toast } from '@/components/ui/sonner';
import { marketDataService } from '@/services/api/marketDataService';
import { exchangeService, SupportedExchange } from '@/services/api/exchangeService';

// Enhanced hook that uses the actual market data service
export const useMarketData = (exchange?: SupportedExchange) => {
  const [marketData, setMarketData] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we have an active exchange
      const activeExchange = exchange || exchangeService.getActiveExchange();
      if (!activeExchange) {
        setError('No active exchange selected. Please configure an exchange in settings.');
        setLoading(false);
        return;
      }
      
      // Use mock data for fallback during development
      // In production, this would always use the real API
      const credentials = exchangeService.getCredentials(activeExchange);
      if (!credentials) {
        // Fallback to mock data if no credentials (mainly for development)
        console.warn('No credentials found for the active exchange, using mock data');
        setMarketData([]);
        setLoading(false);
        return;
      }
      
      // Fetch real market data
      const data = await marketDataService.fetchMarketData(activeExchange);
      setMarketData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to fetch market data');
      setLoading(false);
      toast.error('Failed to fetch market data', {
        description: 'Please check your connection and API credentials'
      });
    }
  }, [exchange]);

  useEffect(() => {
    fetchData();
    
    // Set up periodic refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchData();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, [fetchData]);

  const getChartData = async (symbol: string, timeframe: TimeFrame = '1d'): Promise<ChartData[]> => {
    try {
      const activeExchange = exchange || exchangeService.getActiveExchange();
      if (!activeExchange) {
        throw new Error('No active exchange selected');
      }
      
      return await marketDataService.fetchChartData(symbol, timeframe, activeExchange);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      await fetchData();
      toast.success('Market data refreshed');
    } catch (error) {
      console.error('Error refreshing market data:', error);
      toast.error('Failed to refresh market data');
    } finally {
      setLoading(false);
    }
  };

  return { 
    marketData, 
    loading, 
    error, 
    getChartData, 
    refreshData,
    isLoading: loading  // Add isLoading alias for compatibility
  };
};
