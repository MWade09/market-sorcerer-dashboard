
export type Exchange = 'binance' | 'coinbase' | 'kraken';

export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';

export type TradingStrategyType = 
  | 'momentum' 
  | 'trend_following' 
  | 'arbitrage'
  | 'dca'
  | 'custom';

export type TradingStrategy = {
  id: string;
  name: string;
  type: TradingStrategyType;
  description: string;
  config: Record<string, any>;
  isActive: boolean;
  riskLevel: 'low' | 'medium' | 'high';
};

export type Cryptocurrency = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image?: string;
};

export type ChartData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type TradePosition = {
  id: string;
  symbol: string;
  exchange: Exchange;
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
};

export type TradeHistory = {
  id: string;
  symbol: string;
  exchange: Exchange;
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
};

export type ExchangeAccount = {
  exchange: Exchange;
  name: string;
  apiKeyConfigured: boolean;
  balance: number;
  isActive: boolean;
  logo: string;
};

export type PerformanceMetric = {
  label: string;
  value: string | number;
  change?: number;
  info?: string;
};

export type BacktestResult = {
  strategyId: string;
  symbol: string;
  timeframe: TimeFrame;
  startDate: Date;
  endDate: Date;
  trades: number;
  winRate: number;
  profitFactor: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
};
