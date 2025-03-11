
import { toast } from '@/components/ui/sonner';
import { exchangeService, SupportedExchange } from './exchangeService';

export interface OrderParams {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  quantity: number;
  price?: number; // Required for limit orders
  stopPrice?: number; // Required for stop orders
  timeInForce?: 'GTC' | 'IOC' | 'FOK';
}

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  status: 'new' | 'filled' | 'partially_filled' | 'canceled' | 'rejected';
  quantity: number;
  price: number;
  stopPrice?: number;
  filledQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  symbol: string;
  quantity: number;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  pnlPercent: number;
  openTime: string;
  side: 'long' | 'short';
}

class TradingService {
  async placeOrder(params: OrderParams, exchange?: SupportedExchange): Promise<Order> {
    const activeExchange = exchange || exchangeService.getActiveExchange();
    if (!activeExchange) {
      throw new Error('No active exchange selected');
    }

    const credentials = exchangeService.getCredentials(activeExchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${activeExchange}`);
    }

    // Validate order parameters
    this.validateOrderParams(params);

    try {
      // Each exchange has different endpoints for placing orders
      switch (activeExchange) {
        case 'binance':
          return await this.placeBinanceOrder(params, credentials);
        case 'coinbase':
          return await this.placeCoinbaseOrder(params, credentials);
        case 'kraken':
          return await this.placeKrakenOrder(params, credentials);
        default:
          throw new Error(`Unsupported exchange: ${activeExchange}`);
      }
    } catch (error) {
      console.error(`Failed to place order on ${activeExchange}:`, error);
      toast.error(`Failed to place order on ${activeExchange}`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  async cancelOrder(orderId: string, symbol: string, exchange?: SupportedExchange): Promise<boolean> {
    const activeExchange = exchange || exchangeService.getActiveExchange();
    if (!activeExchange) {
      throw new Error('No active exchange selected');
    }

    const credentials = exchangeService.getCredentials(activeExchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${activeExchange}`);
    }

    try {
      // Each exchange has different endpoints for canceling orders
      switch (activeExchange) {
        case 'binance':
          return await this.cancelBinanceOrder(orderId, symbol, credentials);
        case 'coinbase':
          return await this.cancelCoinbaseOrder(orderId, symbol, credentials);
        case 'kraken':
          return await this.cancelKrakenOrder(orderId, symbol, credentials);
        default:
          throw new Error(`Unsupported exchange: ${activeExchange}`);
      }
    } catch (error) {
      console.error(`Failed to cancel order on ${activeExchange}:`, error);
      toast.error(`Failed to cancel order on ${activeExchange}`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  async getOpenOrders(symbol?: string, exchange?: SupportedExchange): Promise<Order[]> {
    const activeExchange = exchange || exchangeService.getActiveExchange();
    if (!activeExchange) {
      throw new Error('No active exchange selected');
    }

    const credentials = exchangeService.getCredentials(activeExchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${activeExchange}`);
    }

    try {
      // Each exchange has different endpoints for getting open orders
      switch (activeExchange) {
        case 'binance':
          return await this.getBinanceOpenOrders(symbol, credentials);
        case 'coinbase':
          return await this.getCoinbaseOpenOrders(symbol, credentials);
        case 'kraken':
          return await this.getKrakenOpenOrders(symbol, credentials);
        default:
          throw new Error(`Unsupported exchange: ${activeExchange}`);
      }
    } catch (error) {
      console.error(`Failed to get open orders from ${activeExchange}:`, error);
      toast.error(`Failed to fetch open orders from ${activeExchange}`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  async getPositions(exchange?: SupportedExchange): Promise<Position[]> {
    const activeExchange = exchange || exchangeService.getActiveExchange();
    if (!activeExchange) {
      throw new Error('No active exchange selected');
    }

    const credentials = exchangeService.getCredentials(activeExchange);
    if (!credentials) {
      throw new Error(`No credentials found for ${activeExchange}`);
    }

    try {
      // Each exchange has different endpoints for getting positions
      switch (activeExchange) {
        case 'binance':
          return await this.getBinancePositions(credentials);
        case 'coinbase':
          return await this.getCoinbasePositions(credentials);
        case 'kraken':
          return await this.getKrakenPositions(credentials);
        default:
          throw new Error(`Unsupported exchange: ${activeExchange}`);
      }
    } catch (error) {
      console.error(`Failed to get positions from ${activeExchange}:`, error);
      toast.error(`Failed to fetch positions from ${activeExchange}`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  // Validation helpers
  private validateOrderParams(params: OrderParams): void {
    if (!params.symbol) {
      throw new Error('Symbol is required');
    }
    
    if (!params.side || !['buy', 'sell'].includes(params.side)) {
      throw new Error('Invalid order side. Must be "buy" or "sell"');
    }
    
    if (!params.type || !['market', 'limit', 'stop'].includes(params.type)) {
      throw new Error('Invalid order type. Must be "market", "limit", or "stop"');
    }
    
    if (params.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    
    if (params.type === 'limit' && !params.price) {
      throw new Error('Price is required for limit orders');
    }
    
    if (params.type === 'stop' && !params.stopPrice) {
      throw new Error('Stop price is required for stop orders');
    }
  }

  // Binance-specific implementations
  private async placeBinanceOrder(params: OrderParams, credentials: any): Promise<Order> {
    // In a real implementation, you would use the Binance API
    console.log('Placing order on Binance:', params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate a mock response
    const order: Order = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      symbol: params.symbol,
      side: params.side,
      type: params.type,
      status: 'new',
      quantity: params.quantity,
      price: params.price || 0,
      stopPrice: params.stopPrice,
      filledQuantity: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Mock successful placement
    toast.success(`Order placed successfully on Binance`, {
      description: `${params.side.toUpperCase()} ${params.quantity} ${params.symbol} at ${params.price || 'market price'}`
    });
    
    return order;
  }

  private async cancelBinanceOrder(orderId: string, symbol: string, credentials: any): Promise<boolean> {
    console.log(`Canceling order ${orderId} for ${symbol} on Binance`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful cancellation
    toast.success(`Order canceled successfully on Binance`, {
      description: `Order #${orderId} for ${symbol}`
    });
    
    return true;
  }

  private async getBinanceOpenOrders(symbol: string | undefined, credentials: any): Promise<Order[]> {
    console.log(`Getting open orders${symbol ? ` for ${symbol}` : ''} on Binance`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return [
      {
        id: `ORD-${Date.now() - 3600000}-${Math.floor(Math.random() * 1000)}`,
        symbol: 'BTC/USDT',
        side: 'buy',
        type: 'limit',
        status: 'new',
        quantity: 0.01,
        price: 35000,
        filledQuantity: 0,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: `ORD-${Date.now() - 7200000}-${Math.floor(Math.random() * 1000)}`,
        symbol: 'ETH/USDT',
        side: 'sell',
        type: 'limit',
        status: 'partially_filled',
        quantity: 0.5,
        price: 2600,
        filledQuantity: 0.2,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  }

  private async getBinancePositions(credentials: any): Promise<Position[]> {
    console.log('Getting positions on Binance');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return [
      {
        symbol: 'BTC/USDT',
        quantity: 0.05,
        entryPrice: 36500,
        markPrice: 36789.45,
        pnl: (36789.45 - 36500) * 0.05,
        pnlPercent: ((36789.45 / 36500) - 1) * 100,
        openTime: new Date(Date.now() - 86400000).toISOString(),
        side: 'long'
      },
      {
        symbol: 'ETH/USDT',
        quantity: 1.2,
        entryPrice: 2480,
        markPrice: 2519.78,
        pnl: (2519.78 - 2480) * 1.2,
        pnlPercent: ((2519.78 / 2480) - 1) * 100,
        openTime: new Date(Date.now() - 172800000).toISOString(),
        side: 'long'
      }
    ];
  }

  // Coinbase-specific implementations
  private async placeCoinbaseOrder(params: OrderParams, credentials: any): Promise<Order> {
    // Similar implementation to Binance but with Coinbase specifics
    console.log('Placing order on Coinbase:', params);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const order: Order = {
      id: `CB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      symbol: params.symbol,
      side: params.side,
      type: params.type,
      status: 'new',
      quantity: params.quantity,
      price: params.price || 0,
      stopPrice: params.stopPrice,
      filledQuantity: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    toast.success(`Order placed successfully on Coinbase`, {
      description: `${params.side.toUpperCase()} ${params.quantity} ${params.symbol} at ${params.price || 'market price'}`
    });
    
    return order;
  }

  private async cancelCoinbaseOrder(orderId: string, symbol: string, credentials: any): Promise<boolean> {
    // Similar to Binance implementation
    return true;
  }

  private async getCoinbaseOpenOrders(symbol: string | undefined, credentials: any): Promise<Order[]> {
    // Similar to Binance implementation
    return [];
  }

  private async getCoinbasePositions(credentials: any): Promise<Position[]> {
    // Coinbase Pro doesn't have positions in the same way as futures exchanges
    // Instead, we can return the actual holdings as "positions"
    return [];
  }

  // Kraken-specific implementations
  private async placeKrakenOrder(params: OrderParams, credentials: any): Promise<Order> {
    // Similar implementation to Binance but with Kraken specifics
    return {
      id: `KRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      symbol: params.symbol,
      side: params.side,
      type: params.type,
      status: 'new',
      quantity: params.quantity,
      price: params.price || 0,
      stopPrice: params.stopPrice,
      filledQuantity: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  private async cancelKrakenOrder(orderId: string, symbol: string, credentials: any): Promise<boolean> {
    // Similar to Binance implementation
    return true;
  }

  private async getKrakenOpenOrders(symbol: string | undefined, credentials: any): Promise<Order[]> {
    // Similar to Binance implementation
    return [];
  }

  private async getKrakenPositions(credentials: any): Promise<Position[]> {
    // Similar to Binance implementation
    return [];
  }
}

// Export a singleton instance
export const tradingService = new TradingService();
