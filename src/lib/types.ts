
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';

// Updated MarketData type to be compatible with Cryptocurrency
export interface MarketData {
  price: number;
  change24h: number;
  high24h?: number;
  low24h?: number;
  volume24h: number;
  marketCap: number;
  lastUpdated?: string;
}

export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  sparkline?: number[];
}

export interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  value?: number;
}

export interface Trade {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  currentPrice: number;
  amount: number;
  leverage: number;
  profit: number;
  profitPercentage: number;
  timestamp: string;
  strategy: string;
}

export interface TradePosition {
  id: string;
  symbol: string;
  exchange: string;
  type: 'long' | 'short';
  entryPrice: number;
  quantity: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  openTime: Date;
  strategy: string;
  stopLoss?: number;
  takeProfit?: number;
}

export interface TradeHistory {
  id: string;
  symbol: string;
  exchange: string;
  type: 'long' | 'short';
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  pnlPercentage: number;
  openTime: Date;
  closeTime: Date;
  strategy: string;
  isProfit: boolean;
}

// Updated to include the new strategy types
export type TradingStrategyType = 'momentum' | 'trend_following' | 'arbitrage' | 'dca' | 'machine_learning' | 'mean_reversion';

// Updated TradingStrategy interface to include advancedParams
export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  timeframe?: string;
  indicators?: string[];
  type: TradingStrategyType;
  isActive: boolean;
  config: any;
  advancedParams?: {
    positionSize?: number;
    allowPyramiding?: boolean;
    useStopLoss?: boolean;
    stopLossPercentage?: number;
    useTakeProfit?: boolean;
    takeProfitPercentage?: number;
    useTrailingStop?: boolean;
    trailingStopPercentage?: number;
    useVolume?: boolean;
    volumeThreshold?: number;
    additionalIndicator?: string;
    modelType?: string;
    features?: {
      price?: boolean;
      volume?: boolean;
      indicators?: boolean;
      sentiment?: boolean;
    };
    trainingFrequency?: string;
    lookbackPeriod?: number;
    [key: string]: any;
  };
}

export interface Exchange {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected';
}

export interface ExchangeAccount {
  exchange: string;
  name: string;
  apiKeyConfigured: boolean;
  balance: number;
  isActive: boolean;
  logo: string;
  isLoading?: boolean;
}

export interface PerformanceMetric {
  label: string;
  value: string | number;
  change?: number;
  info: string;
}

export interface BacktestResult {
  strategyId: string;
  symbol: string;
  timeframe: string;
  startDate: Date;
  endDate: Date;
  trades: number;
  winRate: number;
  profitFactor: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
}
