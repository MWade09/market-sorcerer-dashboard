
import { tradingService, OrderParams, Position } from '@/services/api/tradingService';
import { botMemoryService } from '@/services/botMemoryService';
import { marketDataService } from '@/services/api/marketDataService';
import { toast } from '@/components/ui/sonner';
import { TradePerformanceRecord, MarketCondition } from '@/lib/types/memoryTypes';
import { TradingStrategy } from '@/lib/types';

/**
 * Service that combines trading logic with memory/learning capabilities
 */
class BotTradingService {
  private activeStrategies: TradingStrategy[] = [];
  
  /**
   * Execute a trade using a specific strategy
   */
  async executeStrategyTrade(strategy: TradingStrategy, symbol: string): Promise<boolean> {
    try {
      // Analyze market conditions
      const chartData = await marketDataService.fetchChartData(symbol, strategy.config.timeframe);
      const marketCondition = botMemoryService.analyzeMarketCondition(symbol, chartData);
      
      // Determine trade action based on strategy type
      const tradeAction = await this.determineTradeAction(strategy, symbol, chartData, marketCondition);
      
      if (!tradeAction) {
        console.log(`No trade signal for ${symbol} using ${strategy.name}`);
        return false;
      }
      
      // Execute the trade
      const { side, price, quantity } = tradeAction;
      
      const orderParams: OrderParams = {
        symbol,
        side,
        type: 'market',
        quantity
      };
      
      const result = await tradingService.placeOrder(orderParams);
      
      // Record the initial state of this trade for later performance tracking
      this.recordTradeInitiation(result.id, strategy, symbol, side, price, quantity, marketCondition);
      
      return true;
    } catch (error) {
      console.error(`Failed to execute strategy trade:`, error);
      toast.error(`Strategy execution failed`, {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }
  
  /**
   * Determine whether to buy, sell, or do nothing based on strategy
   */
  private async determineTradeAction(
    strategy: TradingStrategy, 
    symbol: string, 
    chartData: any[],
    marketCondition: MarketCondition
  ): Promise<{ side: 'buy' | 'sell', price: number, quantity: number } | null> {
    if (!chartData || chartData.length < 10) {
      return null;
    }
    
    const latestCandle = chartData[chartData.length - 1];
    const currentPrice = latestCandle.close;
    
    // Default quantity - in a real implementation this would use position sizing rules
    const quantity = 0.01;
    
    switch (strategy.type) {
      case 'momentum': {
        // Example implementation for Momentum/RSI strategy
        const rsiPeriod = strategy.config.rsiPeriod || 14;
        const rsi = this.calculateRSI(chartData, rsiPeriod);
        
        const overbought = strategy.config.overbought || 70;
        const oversold = strategy.config.oversold || 30;
        
        if (rsi <= oversold) {
          // Oversold condition - Buy signal
          return { side: 'buy', price: currentPrice, quantity };
        } else if (rsi >= overbought) {
          // Overbought condition - Sell signal
          return { side: 'sell', price: currentPrice, quantity };
        }
        return null;
      }
      
      case 'trend_following': {
        // Example implementation for Moving Average Crossover
        const fastMA = strategy.config.fastMA || 9;
        const slowMA = strategy.config.slowMA || 21;
        
        const fastMAValue = this.calculateSMA(chartData, fastMA);
        const slowMAValue = this.calculateSMA(chartData, slowMA);
        
        // Previous values
        const previousFastMA = this.calculateSMA(chartData.slice(0, -1), fastMA);
        const previousSlowMA = this.calculateSMA(chartData.slice(0, -1), slowMA);
        
        // Check for crossover
        const isBullishCrossover = previousFastMA <= previousSlowMA && fastMAValue > slowMAValue;
        const isBearishCrossover = previousFastMA >= previousSlowMA && fastMAValue < slowMAValue;
        
        if (isBullishCrossover) {
          return { side: 'buy', price: currentPrice, quantity };
        } else if (isBearishCrossover) {
          return { side: 'sell', price: currentPrice, quantity };
        }
        return null;
      }
      
      case 'dca': {
        // Dollar-cost averaging always buys
        return { side: 'buy', price: currentPrice, quantity };
      }
      
      default:
        return null;
    }
  }
  
  /**
   * Store information about a new trade for later performance analysis
   */
  private recordTradeInitiation(
    orderId: string,
    strategy: TradingStrategy,
    symbol: string,
    side: 'buy' | 'sell',
    price: number,
    quantity: number,
    marketCondition: MarketCondition
  ) {
    // Here we would store information about the trade
    // In a real implementation this would be stored in a database
    console.log(`Trade initiated: ${side} ${quantity} ${symbol} at ${price} using ${strategy.name}`);
    
    // For simplicity, we'll use local storage to track this trade
    const pendingTrades = JSON.parse(localStorage.getItem('market-sorcerer-pending-trades') || '[]');
    pendingTrades.push({
      orderId,
      strategyId: strategy.id,
      strategyType: strategy.type,
      symbol,
      side,
      entryPrice: price,
      quantity,
      entryTime: new Date(),
      marketCondition,
      tradeParameters: strategy.config
    });
    localStorage.setItem('market-sorcerer-pending-trades', JSON.stringify(pendingTrades));
  }
  
  /**
   * When a position is closed, record the complete trade performance
   */
  recordTradeCompletion(
    symbol: string,
    entryPrice: number,
    exitPrice: number,
    quantity: number,
    strategyId: string,
    strategyType: any,
    entryTime: Date,
    marketCondition: MarketCondition,
    tradeParameters: any
  ) {
    const pnl = (exitPrice - entryPrice) * quantity;
    const pnlPercentage = ((exitPrice / entryPrice) - 1) * 100;
    
    const tradeRecord: Omit<TradePerformanceRecord, 'id' | 'successScore'> = {
      strategyId,
      strategyType,
      symbol,
      entryTime,
      exitTime: new Date(),
      entryPrice,
      exitPrice,
      pnl,
      pnlPercentage,
      marketCondition,
      tradeParameters
    };
    
    botMemoryService.recordTradePerformance(tradeRecord);
    
    toast.success(`Trade completed and recorded`, {
      description: `${symbol}: ${pnl > 0 ? '+' : ''}${pnl.toFixed(2)} USD (${pnl > 0 ? '+' : ''}${pnlPercentage.toFixed(2)}%)`
    });
  }
  
  /**
   * Utility: Calculate Relative Strength Index
   */
  private calculateRSI(candles: any[], period = 14): number {
    if (candles.length < period + 1) {
      return 50; // Not enough data, return neutral
    }
    
    let gains = 0;
    let losses = 0;
    
    // Calculate average gains and losses
    for (let i = 1; i < period + 1; i++) {
      const change = candles[i].close - candles[i - 1].close;
      if (change >= 0) {
        gains += change;
      } else {
        losses -= change;
      }
    }
    
    gains /= period;
    losses /= period;
    
    if (losses === 0) {
      return 100; // No losses, RSI is 100
    }
    
    const rs = gains / losses;
    const rsi = 100 - (100 / (1 + rs));
    
    return Math.round(rsi);
  }
  
  /**
   * Utility: Calculate Simple Moving Average
   */
  private calculateSMA(candles: any[], period: number): number {
    if (candles.length < period) {
      return candles[candles.length - 1].close; // Not enough data
    }
    
    const prices = candles.slice(-period).map(c => c.close);
    const sum = prices.reduce((total, price) => total + price, 0);
    return sum / period;
  }
  
  /**
   * Set active trading strategies
   */
  setActiveStrategies(strategies: TradingStrategy[]) {
    this.activeStrategies = strategies;
  }
  
  /**
   * Get active trading strategies
   */
  getActiveStrategies(): TradingStrategy[] {
    return this.activeStrategies;
  }
}

// Export singleton instance
export const botTradingService = new BotTradingService();
