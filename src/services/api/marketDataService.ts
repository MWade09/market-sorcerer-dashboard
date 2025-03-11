
import { Cryptocurrency, ChartData, TimeFrame } from '@/lib/types';
import { toast } from '@/components/ui/sonner';
import { exchangeService, SupportedExchange } from './exchangeService';

class MarketDataService {
  private supportedPairs: Map<SupportedExchange, string[]> = new Map([
    ['binance', ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT']],
    ['coinbase', ['BTC/USD', 'ETH/USD', 'SOL/USD', 'LINK/USD']],
    ['kraken', ['XBT/USD', 'ETH/USD', 'SOL/USD', 'DOT/USD']]
  ]);

  async fetchMarketData(exchange?: SupportedExchange): Promise<Cryptocurrency[]> {
    const activeExchange = exchange || exchangeService.getActiveExchange();
    if (!activeExchange) {
      throw new Error('No active exchange selected');
    }

    const credentials = exchangeService.getCredentials(activeExchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${activeExchange}`);
    }

    try {
      // Each exchange has different endpoints for getting market data
      switch (activeExchange) {
        case 'binance':
          return await this.fetchBinanceMarketData(credentials);
        case 'coinbase':
          return await this.fetchCoinbaseMarketData(credentials);
        case 'kraken':
          return await this.fetchKrakenMarketData(credentials);
        default:
          throw new Error(`Unsupported exchange: ${activeExchange}`);
      }
    } catch (error) {
      console.error(`Failed to fetch market data from ${activeExchange}:`, error);
      toast.error(`Failed to fetch market data from ${activeExchange}`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  async fetchChartData(symbol: string, timeframe: TimeFrame, exchange?: SupportedExchange): Promise<ChartData[]> {
    const activeExchange = exchange || exchangeService.getActiveExchange();
    if (!activeExchange) {
      throw new Error('No active exchange selected');
    }

    const credentials = exchangeService.getCredentials(activeExchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${activeExchange}`);
    }

    try {
      // Each exchange has different endpoints for getting chart data
      switch (activeExchange) {
        case 'binance':
          return await this.fetchBinanceChartData(symbol, timeframe, credentials);
        case 'coinbase':
          return await this.fetchCoinbaseChartData(symbol, timeframe, credentials);
        case 'kraken':
          return await this.fetchKrakenChartData(symbol, timeframe, credentials);
        default:
          throw new Error(`Unsupported exchange: ${activeExchange}`);
      }
    } catch (error) {
      console.error(`Failed to fetch chart data from ${activeExchange}:`, error);
      toast.error(`Failed to fetch chart data from ${activeExchange}`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  // Implementation of exchange-specific methods
  private async fetchBinanceMarketData(credentials: any): Promise<Cryptocurrency[]> {
    // In a real implementation, you would use the Binance API
    console.log('Fetching market data from Binance with credentials:', credentials.apiKey);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data for now - in production, this would be real API data
    return [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC/USDT',
        price: 36789.45,
        change24h: 1.24,
        volume24h: 22456789012,
        marketCap: 698765432198,
        sparkline: Array(24).fill(0).map((_, i) => 36500 + Math.random() * 1000),
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH/USDT',
        price: 2519.78,
        change24h: 2.56,
        volume24h: 12456789012,
        marketCap: 298765432198,
        sparkline: Array(24).fill(0).map((_, i) => 2500 + Math.random() * 100),
      }
    ];
  }

  private async fetchCoinbaseMarketData(credentials: any): Promise<Cryptocurrency[]> {
    // Simulate Coinbase API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data - in production, this would be real API data
    return [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC/USD',
        price: 36825.45,
        change24h: 1.29,
        volume24h: 21456789012,
        marketCap: 698765432198,
        sparkline: Array(24).fill(0).map((_, i) => 36500 + Math.random() * 1000),
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH/USD',
        price: 2522.78,
        change24h: 2.61,
        volume24h: 11456789012,
        marketCap: 298765432198,
        sparkline: Array(24).fill(0).map((_, i) => 2500 + Math.random() * 100),
      }
    ];
  }

  private async fetchKrakenMarketData(credentials: any): Promise<Cryptocurrency[]> {
    // Simulate Kraken API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data - in production, this would be real API data
    return [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'XBT/USD', // Kraken uses XBT for Bitcoin
        price: 36801.45,
        change24h: 1.27,
        volume24h: 20456789012,
        marketCap: 698765432198,
        sparkline: Array(24).fill(0).map((_, i) => 36500 + Math.random() * 1000),
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH/USD',
        price: 2520.78,
        change24h: 2.59,
        volume24h: 10456789012,
        marketCap: 298765432198,
        sparkline: Array(24).fill(0).map((_, i) => 2500 + Math.random() * 100),
      }
    ];
  }

  private async fetchBinanceChartData(symbol: string, timeframe: TimeFrame, credentials: any): Promise<ChartData[]> {
    // Simulate Binance API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create mock chart data with pseudorandom but realistically looking pattern
    const now = Date.now();
    const interval = this.getTimeframeInMs(timeframe);
    const points = 100;
    
    // Start with a base price and create somewhat realistic chart pattern
    let basePrice = symbol.includes('BTC') ? 36500 : 2500;
    let currentPrice = basePrice;
    let trend = 0;
    
    return Array(points).fill(0).map((_, i) => {
      // Add some randomness to the trend
      trend += (Math.random() - 0.5) * 0.1;
      // Keep trend within bounds
      trend = Math.max(-0.1, Math.min(0.1, trend));
      
      // Apply trend to price with some randomness
      currentPrice = currentPrice * (1 + trend + (Math.random() - 0.5) * 0.01);
      
      // Create a full ChartData object that includes all required properties
      const price = currentPrice;
      return {
        time: now - (points - i) * interval,
        open: price * (1 - Math.random() * 0.005),
        high: price * (1 + Math.random() * 0.01),
        low: price * (1 - Math.random() * 0.01),
        close: price,
        volume: Math.random() * 1000000,
        value: price // Keep the value property for compatibility
      };
    });
  }

  private async fetchCoinbaseChartData(symbol: string, timeframe: TimeFrame, credentials: any): Promise<ChartData[]> {
    // Similar implementation to Binance but might have different patterns
    return this.fetchBinanceChartData(symbol, timeframe, credentials);
  }

  private async fetchKrakenChartData(symbol: string, timeframe: TimeFrame, credentials: any): Promise<ChartData[]> {
    // Similar implementation to Binance but might have different patterns
    return this.fetchBinanceChartData(symbol, timeframe, credentials);
  }

  private getTimeframeInMs(timeframe: TimeFrame): number {
    switch (timeframe) {
      case '1m': return 60 * 1000;
      case '5m': return 5 * 60 * 1000;
      case '15m': return 15 * 60 * 1000;
      case '1h': return 60 * 60 * 1000;
      case '4h': return 4 * 60 * 60 * 1000;
      case '1d': return 24 * 60 * 60 * 1000;
      default: return 60 * 60 * 1000;
    }
  }
}

// Export a singleton instance
export const marketDataService = new MarketDataService();
