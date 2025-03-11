
import { toast } from "@/components/ui/sonner";

export interface ExchangeCredentials {
  apiKey: string;
  apiSecret: string;
  passphrase?: string; // Some exchanges like Kraken require this
  testMode: boolean;
}

export type SupportedExchange = 'binance' | 'coinbase' | 'kraken';

class ExchangeService {
  private credentials: Map<SupportedExchange, ExchangeCredentials> = new Map();
  private activeExchange: SupportedExchange | null = null;

  // Store credentials securely (in memory only for now)
  // In a production environment, consider using more secure storage
  setCredentials(exchange: SupportedExchange, credentials: ExchangeCredentials): void {
    this.credentials.set(exchange, credentials);
    
    // Store minimal information in localStorage - just which exchanges are configured
    // but NOT the actual credentials
    const configuredExchanges = this.getConfiguredExchanges();
    if (!configuredExchanges.includes(exchange)) {
      const updatedExchanges = [...configuredExchanges, exchange];
      localStorage.setItem('configuredExchanges', JSON.stringify(updatedExchanges));
    }
  }

  getCredentials(exchange: SupportedExchange): ExchangeCredentials | undefined {
    return this.credentials.get(exchange);
  }

  getConfiguredExchanges(): SupportedExchange[] {
    const storedExchanges = localStorage.getItem('configuredExchanges');
    return storedExchanges ? JSON.parse(storedExchanges) : [];
  }

  setActiveExchange(exchange: SupportedExchange): void {
    if (!this.credentials.has(exchange)) {
      throw new Error(`Exchange ${exchange} is not configured yet`);
    }
    this.activeExchange = exchange;
    localStorage.setItem('activeExchange', exchange);
  }

  getActiveExchange(): SupportedExchange | null {
    if (!this.activeExchange) {
      const storedActive = localStorage.getItem('activeExchange');
      if (storedActive && this.credentials.has(storedActive as SupportedExchange)) {
        this.activeExchange = storedActive as SupportedExchange;
      }
    }
    return this.activeExchange;
  }

  async testConnection(exchange: SupportedExchange): Promise<boolean> {
    const credentials = this.credentials.get(exchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${exchange}`);
    }

    try {
      // Each exchange has different endpoints for testing connection
      switch (exchange) {
        case 'binance':
          return await this.testBinanceConnection(credentials);
        case 'coinbase':
          return await this.testCoinbaseConnection(credentials);
        case 'kraken':
          return await this.testKrakenConnection(credentials);
        default:
          throw new Error(`Unsupported exchange: ${exchange}`);
      }
    } catch (error) {
      console.error(`Failed to test connection to ${exchange}:`, error);
      throw error;
    }
  }

  private async testBinanceConnection(credentials: ExchangeCredentials): Promise<boolean> {
    try {
      // In a real implementation, you would use the Binance API client
      // For now, we'll simulate a successful connection
      console.log('Testing Binance connection with credentials:', credentials.apiKey);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production code, you would make a real API call here
      // Example: const account = await binanceClient.account();
      
      return true;
    } catch (error) {
      console.error('Binance connection test failed:', error);
      return false;
    }
  }

  private async testCoinbaseConnection(credentials: ExchangeCredentials): Promise<boolean> {
    try {
      // In a real implementation, you would use the Coinbase API client
      console.log('Testing Coinbase connection with credentials:', credentials.apiKey);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production code, you would make a real API call here
      
      return true;
    } catch (error) {
      console.error('Coinbase connection test failed:', error);
      return false;
    }
  }

  private async testKrakenConnection(credentials: ExchangeCredentials): Promise<boolean> {
    try {
      // In a real implementation, you would use the Kraken API client
      console.log('Testing Kraken connection with credentials:', credentials.apiKey);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production code, you would make a real API call here
      
      return true;
    } catch (error) {
      console.error('Kraken connection test failed:', error);
      return false;
    }
  }

  async getAccountBalance(exchange?: SupportedExchange): Promise<Record<string, number>> {
    const targetExchange = exchange || this.getActiveExchange();
    if (!targetExchange) {
      throw new Error('No active exchange selected');
    }

    const credentials = this.credentials.get(targetExchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${targetExchange}`);
    }

    try {
      // Each exchange has different endpoints for getting account balance
      switch (targetExchange) {
        case 'binance':
          return await this.getBinanceBalance(credentials);
        case 'coinbase':
          return await this.getCoinbaseBalance(credentials);
        case 'kraken':
          return await this.getKrakenBalance(credentials);
        default:
          throw new Error(`Unsupported exchange: ${targetExchange}`);
      }
    } catch (error) {
      console.error(`Failed to get balance from ${targetExchange}:`, error);
      toast.error(`Failed to fetch balance from ${targetExchange}`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  private async getBinanceBalance(credentials: ExchangeCredentials): Promise<Record<string, number>> {
    // In a real implementation, you would use the Binance API
    // For now, return mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate API response
    return {
      'BTC': 0.5,
      'ETH': 5.2,
      'USDT': 10000
    };
  }

  private async getCoinbaseBalance(credentials: ExchangeCredentials): Promise<Record<string, number>> {
    // In a real implementation, you would use the Coinbase API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate API response
    return {
      'BTC': 0.3,
      'ETH': 4.0,
      'USDC': 8500
    };
  }

  private async getKrakenBalance(credentials: ExchangeCredentials): Promise<Record<string, number>> {
    // In a real implementation, you would use the Kraken API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate API response
    return {
      'XBT': 0.4, // Kraken uses XBT for Bitcoin
      'ETH': 3.5,
      'USDT': 7500
    };
  }
}

// Export a singleton instance
export const exchangeService = new ExchangeService();
