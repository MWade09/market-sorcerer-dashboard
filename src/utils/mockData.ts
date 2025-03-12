import { 
  Cryptocurrency, 
  TradePosition, 
  TradeHistory, 
  ExchangeAccount,
  TradingStrategy,
  BacktestResult,
  PerformanceMetric
} from '@/lib/types';

// Cryptocurrencies
export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: 'btc-usdt',
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    price: 47892.34,
    change24h: 2.54,
    volume24h: 28765432000,
    marketCap: 924567890000,
    sparkline: [47500, 47600, 47800, 47750, 47900, 47892.34]
  },
  {
    id: 'eth-usdt',
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    price: 2489.12,
    change24h: 3.78,
    volume24h: 15678932000,
    marketCap: 295678420000,
    sparkline: [2450, 2460, 2480, 2470, 2490, 2489.12]
  },
  {
    id: 'sol-usdt',
    symbol: 'SOL/USDT',
    name: 'Solana',
    price: 102.45,
    change24h: -1.32,
    volume24h: 5678910000,
    marketCap: 43289760000,
    sparkline: [104, 103.5, 103, 102.8, 102.5, 102.45]
  },
  {
    id: 'bnb-usdt',
    symbol: 'BNB/USDT',
    name: 'Binance Coin',
    price: 378.91,
    change24h: 0.87,
    volume24h: 2345677000,
    marketCap: 58769230000,
    sparkline: [376, 377, 378, 378.5, 379, 378.91]
  },
  {
    id: 'ada-usdt',
    symbol: 'ADA/USDT',
    name: 'Cardano',
    price: 0.59,
    change24h: -2.12,
    volume24h: 1234567000,
    marketCap: 19876540000,
    sparkline: [0.61, 0.605, 0.6, 0.595, 0.59, 0.59]
  },
  {
    id: 'xrp-usdt',
    symbol: 'XRP/USDT',
    name: 'Ripple',
    price: 0.57,
    change24h: 4.23,
    volume24h: 3456789000,
    marketCap: 30123450000,
    sparkline: [0.55, 0.555, 0.56, 0.565, 0.57, 0.57]
  },
];

// Active trading positions
export const activeTrades: TradePosition[] = [
  {
    id: '1',
    symbol: 'BTC/USDT',
    exchange: 'binance',
    type: 'long',
    entryPrice: 46500.00,
    quantity: 0.5,
    currentPrice: 47892.34,
    pnl: 696.17,
    pnlPercentage: 2.99,
    openTime: new Date(Date.now() - 3600000 * 24 * 2),
    strategy: 'Momentum RSI',
    stopLoss: 45000,
    takeProfit: 52000
  },
  {
    id: '2',
    symbol: 'ETH/USDT',
    exchange: 'coinbase',
    type: 'long',
    entryPrice: 2200.00,
    quantity: 2.5,
    currentPrice: 2489.12,
    pnl: 722.80,
    pnlPercentage: 13.14,
    openTime: new Date(Date.now() - 3600000 * 24 * 5),
    strategy: 'Moving Average Crossover',
    stopLoss: 2000,
    takeProfit: 2800
  },
  {
    id: '3',
    symbol: 'SOL/USDT',
    exchange: 'binance',
    type: 'short',
    entryPrice: 108.50,
    quantity: 25,
    currentPrice: 102.45,
    pnl: 151.25,
    pnlPercentage: 5.58,
    openTime: new Date(Date.now() - 3600000 * 12),
    strategy: 'Bollinger Band Reversal',
    stopLoss: 115,
  },
];

// Trade history
export const tradeHistory: TradeHistory[] = [
  {
    id: '101',
    symbol: 'BTC/USDT',
    exchange: 'binance',
    type: 'long',
    entryPrice: 43200.00,
    exitPrice: 45700.00,
    quantity: 0.75,
    pnl: 1875.00,
    pnlPercentage: 5.79,
    openTime: new Date(Date.now() - 3600000 * 24 * 12),
    closeTime: new Date(Date.now() - 3600000 * 24 * 10),
    strategy: 'Momentum RSI',
    isProfit: true
  },
  {
    id: '102',
    symbol: 'ETH/USDT',
    exchange: 'kraken',
    type: 'long',
    entryPrice: 2650.00,
    exitPrice: 2320.00,
    quantity: 3.2,
    pnl: -1056.00,
    pnlPercentage: -12.45,
    openTime: new Date(Date.now() - 3600000 * 24 * 15),
    closeTime: new Date(Date.now() - 3600000 * 24 * 8),
    strategy: 'Moving Average Crossover',
    isProfit: false
  },
  {
    id: '103',
    symbol: 'SOL/USDT',
    exchange: 'binance',
    type: 'short',
    entryPrice: 120.00,
    exitPrice: 95.00,
    quantity: 40,
    pnl: 1000.00,
    pnlPercentage: 20.83,
    openTime: new Date(Date.now() - 3600000 * 24 * 7),
    closeTime: new Date(Date.now() - 3600000 * 24 * 2),
    strategy: 'Bollinger Band Reversal',
    isProfit: true
  },
  {
    id: '104',
    symbol: 'BTC/USDT',
    exchange: 'coinbase',
    type: 'short',
    entryPrice: 48200.00,
    exitPrice: 49100.00,
    quantity: 0.3,
    pnl: -270.00,
    pnlPercentage: -1.87,
    openTime: new Date(Date.now() - 3600000 * 24 * 6),
    closeTime: new Date(Date.now() - 3600000 * 24 * 5),
    strategy: 'RSI Divergence',
    isProfit: false
  },
  {
    id: '105',
    symbol: 'ADA/USDT',
    exchange: 'binance',
    type: 'long',
    entryPrice: 0.52,
    exitPrice: 0.64,
    quantity: 5000,
    pnl: 600.00,
    pnlPercentage: 23.08,
    openTime: new Date(Date.now() - 3600000 * 24 * 20),
    closeTime: new Date(Date.now() - 3600000 * 24 * 1),
    strategy: 'DCA',
    isProfit: true
  },
];

// Exchange accounts
export const exchangeAccounts: ExchangeAccount[] = [
  {
    exchange: 'binance',
    name: 'Binance',
    apiKeyConfigured: true,
    balance: 25432.56,
    isActive: true,
    logo: 'binance-logo'
  },
  {
    exchange: 'coinbase',
    name: 'Coinbase',
    apiKeyConfigured: true,
    balance: 12456.78,
    isActive: true,
    logo: 'coinbase-logo'
  },
  {
    exchange: 'kraken',
    name: 'Kraken',
    apiKeyConfigured: false,
    balance: 0,
    isActive: false,
    logo: 'kraken-logo'
  }
];

// Trading strategies
export const tradingStrategies: TradingStrategy[] = [
  {
    id: 'strategy-1',
    name: 'Momentum RSI',
    type: 'momentum',
    description: 'Uses RSI indicator to identify overbought and oversold conditions',
    config: {
      rsiPeriod: 14,
      overbought: 70,
      oversold: 30,
      timeframe: '1h'
    },
    isActive: true,
    riskLevel: 'medium'
  },
  {
    id: 'strategy-2',
    name: 'Moving Average Crossover',
    type: 'trend_following',
    description: 'Identifies trends using moving average crossovers',
    config: {
      fastMA: 9,
      slowMA: 21,
      timeframe: '4h'
    },
    isActive: true,
    riskLevel: 'low'
  },
  {
    id: 'strategy-3',
    name: 'Bollinger Band Reversal',
    type: 'momentum',
    description: 'Trades reversals at Bollinger Band extremes',
    config: {
      period: 20,
      deviations: 2,
      timeframe: '1h'
    },
    isActive: true,
    riskLevel: 'medium'
  },
  {
    id: 'strategy-4',
    name: 'Multi-Exchange Arbitrage',
    type: 'arbitrage',
    description: 'Exploits price differences between exchanges',
    config: {
      minSpreadPercentage: 0.5,
      maxSlippage: 0.2,
      exchanges: ['binance', 'coinbase', 'kraken']
    },
    isActive: false,
    riskLevel: 'high'
  },
  {
    id: 'strategy-5',
    name: 'DCA Bitcoin',
    type: 'dca',
    description: 'Dollar-cost averaging for Bitcoin',
    config: {
      interval: 'weekly',
      amount: 100,
      asset: 'BTC/USDT'
    },
    isActive: false,
    riskLevel: 'low'
  }
];

// Backtesting results
export const backtestResults: BacktestResult[] = [
  {
    strategyId: 'strategy-1',
    symbol: 'BTC/USDT',
    timeframe: '1h',
    startDate: new Date(Date.now() - 3600000 * 24 * 30),
    endDate: new Date(),
    trades: 42,
    winRate: 64.3,
    profitFactor: 1.87,
    totalReturn: 12.4,
    maxDrawdown: 8.2,
    sharpeRatio: 1.24
  },
  {
    strategyId: 'strategy-2',
    symbol: 'ETH/USDT',
    timeframe: '4h',
    startDate: new Date(Date.now() - 3600000 * 24 * 30),
    endDate: new Date(),
    trades: 22,
    winRate: 59.1,
    profitFactor: 1.52,
    totalReturn: 8.7,
    maxDrawdown: 5.4,
    sharpeRatio: 1.12
  },
  {
    strategyId: 'strategy-3',
    symbol: 'SOL/USDT',
    timeframe: '1h',
    startDate: new Date(Date.now() - 3600000 * 24 * 30),
    endDate: new Date(),
    trades: 56,
    winRate: 51.8,
    profitFactor: 1.38,
    totalReturn: 15.2,
    maxDrawdown: 11.8,
    sharpeRatio: 0.98
  }
];

// Performance metrics
export const performanceMetrics: PerformanceMetric[] = [
  {
    label: 'Total P&L (30d)',
    value: '$2,845.67',
    change: 12.4,
    info: 'Profit/loss across all trading strategies'
  },
  {
    label: 'Win Rate',
    value: '62.5%',
    change: 4.2,
    info: 'Percentage of profitable trades'
  },
  {
    label: 'Profit Factor',
    value: '1.78',
    change: 0.24,
    info: 'Ratio of gross profits to gross losses'
  },
  {
    label: 'Avg. Trade',
    value: '$124.58',
    change: -2.8,
    info: 'Average profit/loss per trade'
  },
  {
    label: 'Max Drawdown',
    value: '9.2%',
    change: -1.5,
    info: 'Maximum observed loss from a peak'
  },
  {
    label: 'Sharpe Ratio',
    value: '1.12',
    change: 0.08,
    info: 'Risk-adjusted return metric'
  }
];

// Market Data Points (for charts)
export const generateCandlestickData = (days = 30, interval = 24): { time: number; open: number; high: number; low: number; close: number; volume: number }[] => {
  const data = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let price = 45000 + Math.random() * 10000;
  
  for (let i = days * interval; i > 0; i--) {
    const time = now.getTime() - i * 3600000;
    const open = price;
    const change = (Math.random() - 0.5) * price * 0.05;
    price += change;
    const high = Math.max(open, price) + Math.random() * Math.abs(change) * 0.5;
    const low = Math.min(open, price) - Math.random() * Math.abs(change) * 0.5;
    const close = price;
    const volume = 1000000 + Math.random() * 10000000;
    
    data.push({
      time: time / 1000,
      open,
      high,
      low,
      close,
      volume
    });
  }
  
  return data;
};

export const bitcoinChartData = generateCandlestickData();
export const ethereumChartData = generateCandlestickData();

// Add chart data for TradingViewChart
export const chartData = [
  { time: 1672531200, open: 16500, high: 16800, low: 16400, close: 16750, volume: 5600000, value: 16750 },
  { time: 1672617600, open: 16750, high: 17100, low: 16700, close: 17050, volume: 6100000, value: 17050 },
  { time: 1672704000, open: 17050, high: 17200, low: 16900, close: 17150, volume: 5800000, value: 17150 },
  { time: 1672790400, open: 17150, high: 17300, low: 16800, close: 16900, volume: 6500000, value: 16900 },
  { time: 1672876800, open: 16900, high: 17000, low: 16600, close: 16800, volume: 5900000, value: 16800 },
  { time: 1672963200, open: 16800, high: 17200, low: 16750, close: 17100, volume: 6300000, value: 17100 },
  { time: 1673049600, open: 17100, high: 17400, low: 17000, close: 17300, volume: 6700000, value: 17300 },
  { time: 1673136000, open: 17300, high: 17500, low: 17200, close: 17450, volume: 7200000, value: 17450 },
  { time: 1673222400, open: 17450, high: 17600, low: 17300, close: 17550, volume: 6800000, value: 17550 },
  { time: 1673308800, open: 17550, high: 17800, low: 17500, close: 17750, volume: 7500000, value: 17750 },
  { time: 1673395200, open: 17750, high: 18000, low: 17700, close: 17900, volume: 8100000, value: 17900 },
  { time: 1673481600, open: 17900, high: 18200, low: 17800, close: 18100, volume: 8600000, value: 18100 },
  { time: 1673568000, open: 18100, high: 18300, low: 18000, close: 18250, volume: 9200000, value: 18250 },
  { time: 1673654400, open: 18250, high: 18400, low: 18100, close: 18350, volume: 8900000, value: 18350 },
  { time: 1673740800, open: 18350, high: 18500, low: 18200, close: 18400, volume: 9500000, value: 18400 },
  { time: 1673827200, open: 18400, high: 18600, low: 18300, close: 18500, volume: 9800000, value: 18500 },
];
