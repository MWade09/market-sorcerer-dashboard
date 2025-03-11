
import { useState, useEffect } from 'react';
import { Cryptocurrency, ChartData, TimeFrame } from '@/lib/types';
import { cryptocurrencies, bitcoinChartData, ethereumChartData } from '@/utils/mockData';
import { toast } from '@/components/ui/sonner';

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // In a real app, this would be an API call
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use mock data for now
        setMarketData(cryptocurrencies);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to fetch market data');
        setLoading(false);
        toast.error('Failed to fetch market data', {
          description: 'Please check your connection and try again'
        });
      }
    };

    fetchMarketData();
    
    // Set up periodic refresh
    const refreshInterval = setInterval(() => {
      // Add small random price movements to simulate live data
      setMarketData(prev => 
        prev.map(crypto => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.01),
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.3
        }))
      );
    }, 5000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const getChartData = (symbol: string, timeframe: TimeFrame = '1d'): ChartData[] => {
    // In a real app, this would fetch specific chart data based on symbol and timeframe
    if (symbol.includes('BTC')) {
      return bitcoinChartData;
    } else if (symbol.includes('ETH')) {
      return ethereumChartData;
    }
    
    // Default to BTC data if symbol not found
    return bitcoinChartData;
  };

  const refreshData = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Use mock data for now with slight modifications
    setMarketData(cryptocurrencies.map(crypto => ({
      ...crypto,
      price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
      change24h: crypto.change24h + (Math.random() - 0.5) * 0.5
    })));
    
    setLoading(false);
    toast.success('Market data refreshed');
  };

  return { marketData, loading, error, getChartData, refreshData };
};
