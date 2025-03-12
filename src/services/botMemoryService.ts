import { toast } from '@/components/ui/sonner';
import { 
  TradePerformanceRecord, 
  MarketCondition, 
  StrategyPerformance,
  LearningRecommendation,
  ConditionPerformanceMap
} from '@/lib/types/memoryTypes';
import { TradingStrategy } from '@/lib/types';

class BotMemoryService {
  private readonly STORAGE_KEY = 'market-sorcerer-memory';
  private readonly MAX_RECORDS = 1000; // Limit memory size
  private tradeRecords: TradePerformanceRecord[] = [];
  private strategyPerformance: Map<string, StrategyPerformance> = new Map();
  private initialized = false;

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Initialize the memory service by loading data from storage
   */
  private loadFromStorage() {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.tradeRecords = parsedData.tradeRecords || [];
        
        // Convert dates from strings back to Date objects
        this.tradeRecords = this.tradeRecords.map(record => ({
          ...record,
          entryTime: new Date(record.entryTime),
          exitTime: new Date(record.exitTime)
        }));
        
        // Rebuild performance map
        this.rebuildPerformanceMap();
      }
      this.initialized = true;
      console.log(`Bot memory loaded with ${this.tradeRecords.length} records`);
    } catch (error) {
      console.error('Failed to load memory from storage:', error);
      this.tradeRecords = [];
      this.strategyPerformance = new Map();
      this.initialized = true;
    }
  }

  /**
   * Save the current memory state to local storage
   */
  private saveToStorage() {
    try {
      const dataToStore = {
        tradeRecords: this.tradeRecords,
        lastUpdated: new Date()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Failed to save memory to storage:', error);
      toast.error('Failed to save trading memory', {
        description: 'Your trading bot memory could not be saved to local storage'
      });
    }
  }

  /**
   * Record a completed trade with its performance metrics
   */
  recordTradePerformance(record: Omit<TradePerformanceRecord, 'id' | 'successScore'>) {
    // Generate ID and calculate success score
    const successScore = this.calculateSuccessScore(record);
    const newRecord: TradePerformanceRecord = {
      ...record,
      id: `trade-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      successScore
    };

    // Add to records (keeping within size limit)
    this.tradeRecords.push(newRecord);
    if (this.tradeRecords.length > this.MAX_RECORDS) {
      this.tradeRecords = this.tradeRecords.slice(-this.MAX_RECORDS);
    }

    // Update the performance metrics
    this.updateStrategyPerformance(newRecord);
    this.saveToStorage();

    console.log(`Recorded trade performance for ${record.symbol} using ${record.strategyType} strategy`);
    return newRecord;
  }

  /**
   * Calculate a success score for a trade (0-100)
   */
  private calculateSuccessScore(record: Omit<TradePerformanceRecord, 'id' | 'successScore'>): number {
    // Base score on profit percentage
    let score = 50 + (record.pnlPercentage * 5); // 1% profit = 5 points
    
    // Cap the score between 0 and 100
    score = Math.max(0, Math.min(100, score));
    return Math.round(score);
  }

  /**
   * Update strategy performance metrics based on a new trade record
   */
  private updateStrategyPerformance(record: TradePerformanceRecord) {
    const { strategyId, strategyType, marketCondition, pnlPercentage, successScore } = record;
    
    // Get existing performance data or create new
    let performance = this.strategyPerformance.get(strategyId);
    if (!performance) {
      performance = {
        strategyId,
        strategyType,
        overallSuccessRate: 0,
        totalTrades: 0,
        profitableTrades: 0,
        avgProfitPercentage: 0,
        conditionPerformance: {}
      };
    }

    // Update overall stats
    performance.totalTrades += 1;
    if (pnlPercentage > 0) {
      performance.profitableTrades += 1;
    }
    
    // Recalculate average profit
    const totalProfit = (performance.avgProfitPercentage * (performance.totalTrades - 1)) + pnlPercentage;
    performance.avgProfitPercentage = totalProfit / performance.totalTrades;
    
    // Recalculate success rate
    performance.overallSuccessRate = (performance.overallSuccessRate * (performance.totalTrades - 1) + successScore) / performance.totalTrades;

    // Generate market condition key
    const conditionKey = this.generateMarketConditionKey(marketCondition);
    
    // Update condition-specific performance
    if (!performance.conditionPerformance[conditionKey]) {
      performance.conditionPerformance[conditionKey] = {
        successRate: 0,
        totalTrades: 0,
        avgProfitPercentage: 0
      };
    }
    
    const condPerf = performance.conditionPerformance[conditionKey];
    condPerf.totalTrades += 1;
    condPerf.avgProfitPercentage = ((condPerf.avgProfitPercentage * (condPerf.totalTrades - 1)) + pnlPercentage) / condPerf.totalTrades;
    condPerf.successRate = (condPerf.successRate * (condPerf.totalTrades - 1) + successScore) / condPerf.totalTrades;

    // Update the performance map
    this.strategyPerformance.set(strategyId, performance);
  }

  /**
   * Create a string key from a market condition for indexing
   */
  private generateMarketConditionKey(condition: MarketCondition): string {
    return `${condition.trend}-${condition.volatility}-${condition.volume}`;
  }

  /**
   * Rebuild the performance map from trade records
   */
  private rebuildPerformanceMap() {
    this.strategyPerformance = new Map();
    for (const record of this.tradeRecords) {
      this.updateStrategyPerformance(record);
    }
  }

  /**
   * Get recommended strategy for current market conditions
   */
  getRecommendation(
    symbol: string, 
    currentCondition: MarketCondition, 
    availableStrategies: TradingStrategy[]
  ): LearningRecommendation | null {
    // If we don't have enough data, return null
    if (this.tradeRecords.length < 10) {
      return null;
    }

    const conditionKey = this.generateMarketConditionKey(currentCondition);
    let bestStrategy: TradingStrategy | null = null;
    let bestSuccessRate = 0;
    let bestConfidence = 0;
    
    // Find strategies that have performed well in similar market conditions
    for (const strategy of availableStrategies) {
      const performance = this.strategyPerformance.get(strategy.id);
      if (!performance) continue;

      const condPerf = performance.conditionPerformance[conditionKey];
      if (!condPerf || condPerf.totalTrades < 3) {
        // Not enough data for this condition
        continue;
      }

      // Calculate confidence based on number of trades and success rate
      const confidence = (condPerf.successRate * Math.min(1, condPerf.totalTrades / 10));
      
      if (confidence > bestConfidence) {
        bestStrategy = strategy;
        bestSuccessRate = condPerf.successRate;
        bestConfidence = confidence;
      }
    }

    if (!bestStrategy) {
      return null;
    }

    // Generate recommendation
    return {
      symbol,
      recommendedStrategy: bestStrategy.id,
      confidence: bestConfidence,
      reason: `Based on ${bestConfidence.toFixed(0)}% confidence from past performance in similar market conditions`,
      marketCondition: currentCondition
    };
  }

  /**
   * Analyze current market conditions based on market data
   */
  analyzeMarketCondition(symbol: string, chartData: any[]): MarketCondition {
    if (!chartData || chartData.length < 14) {
      return {
        volatility: 'medium',
        trend: 'sideways',
        volume: 'medium'
      };
    }

    // Get the last 14 candles for analysis
    const recentCandles = chartData.slice(-14);
    
    // Determine trend
    const firstPrice = recentCandles[0].close;
    const lastPrice = recentCandles[recentCandles.length - 1].close;
    const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
    
    let trend: 'bullish' | 'bearish' | 'sideways';
    if (priceChange > 3) {
      trend = 'bullish';
    } else if (priceChange < -3) {
      trend = 'bearish';
    } else {
      trend = 'sideways';
    }
    
    // Calculate volatility
    const prices = recentCandles.map(c => c.close);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const volatilityRatio = (stdDev / avgPrice) * 100;
    
    let volatility: 'low' | 'medium' | 'high';
    if (volatilityRatio < 1.5) {
      volatility = 'low';
    } else if (volatilityRatio > 4) {
      volatility = 'high';
    } else {
      volatility = 'medium';
    }
    
    // Analyze volume
    const volumes = recentCandles.map(c => c.volume);
    const avgVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;
    const recentVolume = volumes.slice(-3).reduce((sum, vol) => sum + vol, 0) / 3;
    const volumeRatio = recentVolume / avgVolume;
    
    let volume: 'low' | 'medium' | 'high';
    if (volumeRatio < 0.7) {
      volume = 'low';
    } else if (volumeRatio > 1.5) {
      volume = 'high';
    } else {
      volume = 'medium';
    }
    
    // Calculate RSI if we have enough data
    const rsi = this.calculateRSI(recentCandles);
    
    return {
      trend,
      volatility,
      volume,
      rsi
    };
  }
  
  /**
   * Simple RSI calculation
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
   * Get all trade records for a specific strategy
   */
  getStrategyRecords(strategyId: string): TradePerformanceRecord[] {
    return this.tradeRecords.filter(record => record.strategyId === strategyId);
  }

  /**
   * Get performance summary for all strategies
   */
  getAllPerformanceMetrics(): StrategyPerformance[] {
    return Array.from(this.strategyPerformance.values());
  }

  /**
   * Clear all memory data (for testing or reset)
   */
  clearMemory() {
    this.tradeRecords = [];
    this.strategyPerformance = new Map();
    localStorage.removeItem(this.STORAGE_KEY);
    
    toast.success('Trading memory cleared', {
      description: 'All trading history and learned patterns have been reset'
    });
  }
}

// Export a singleton instance
export const botMemoryService = new BotMemoryService();
