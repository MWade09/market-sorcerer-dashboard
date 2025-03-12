
import { TradingStrategyType } from '@/lib/types';

export interface TradePerformanceRecord {
  id: string;
  strategyId: string;
  strategyType: TradingStrategyType;
  symbol: string;
  entryTime: Date;
  exitTime: Date;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercentage: number;
  marketCondition: MarketCondition;
  tradeParameters: Record<string, any>;
  successScore: number; // 0-100 score indicating success
}

export interface MarketCondition {
  volatility: 'low' | 'medium' | 'high';
  trend: 'bullish' | 'bearish' | 'sideways';
  volume: 'low' | 'medium' | 'high';
  rsi?: number;
  macdSignal?: 'bullish' | 'bearish' | 'neutral';
}

export interface StrategyPerformance {
  strategyId: string;
  strategyType: TradingStrategyType;
  overallSuccessRate: number;
  totalTrades: number;
  profitableTrades: number;
  avgProfitPercentage: number;
  conditionPerformance: ConditionPerformanceMap;
}

export interface ConditionPerformanceMap {
  [key: string]: {
    successRate: number;
    totalTrades: number;
    avgProfitPercentage: number;
  };
}

export interface LearningRecommendation {
  symbol: string;
  recommendedStrategy: string;
  confidence: number;
  reason: string;
  marketCondition: MarketCondition;
}
