
import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, 
  CandlestickChart, 
  ChevronDown, 
  Clock, 
  Maximize2, 
  Minimize2,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeFrame, ChartData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TradingViewChartProps {
  symbol: string;
  data: ChartData[];
  className?: string;
}

const formatPrice = (price: number) => {
  if (price >= 1000) {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border p-2 rounded-md shadow-sm text-xs">
        <p className="text-muted-foreground">{formatDate(data.time)} {formatTime(data.time)}</p>
        <p className="font-medium">Open: {formatPrice(data.open)}</p>
        <p className="font-medium">High: {formatPrice(data.high)}</p>
        <p className="font-medium">Low: {formatPrice(data.low)}</p>
        <p className="font-medium">Close: {formatPrice(data.close)}</p>
        <p className="text-muted-foreground mt-1">Volume: {data.volume.toLocaleString('en-US')}</p>
      </div>
    );
  }
  return null;
};

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol, data, className }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1h');
  const [chartType, setChartType] = useState<'candle' | 'area'>('area');
  const [fullscreen, setFullscreen] = useState(false);
  const [priceScale, setPriceScale] = useState<'linear' | 'log'>('linear');
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Format chart data for area chart
  const chartData = data.map(item => ({
    ...item,
    value: item.close,
  }));

  const currentPrice = data.length > 0 ? data[data.length - 1].close : 0;
  const openPrice = data.length > 0 ? data[0].open : 0;
  const priceChange = currentPrice - openPrice;
  const priceChangePercent = openPrice !== 0 ? (priceChange / openPrice) * 100 : 0;
  const isPriceUp = priceChange >= 0;

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "content-panel transition-all duration-300",
        fullscreen && "fixed inset-0 z-50 p-4 bg-background",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">{symbol}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl font-medium">{formatPrice(currentPrice)}</span>
            <span className={cn(
              "text-sm font-medium",
              isPriceUp ? "text-green-500" : "text-red-500"
            )}>
              {isPriceUp ? "+" : ""}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tabs defaultValue="1h" className="h-8">
            <TabsList className="h-8">
              <TabsTrigger 
                value="1m" 
                className="text-xs px-2 h-6" 
                onClick={() => setTimeframe('1m')}
              >
                1m
              </TabsTrigger>
              <TabsTrigger 
                value="5m" 
                className="text-xs px-2 h-6" 
                onClick={() => setTimeframe('5m')}
              >
                5m
              </TabsTrigger>
              <TabsTrigger 
                value="15m" 
                className="text-xs px-2 h-6" 
                onClick={() => setTimeframe('15m')}
              >
                15m
              </TabsTrigger>
              <TabsTrigger 
                value="1h" 
                className="text-xs px-2 h-6" 
                onClick={() => setTimeframe('1h')}
              >
                1H
              </TabsTrigger>
              <TabsTrigger 
                value="4h" 
                className="text-xs px-2 h-6" 
                onClick={() => setTimeframe('4h')}
              >
                4H
              </TabsTrigger>
              <TabsTrigger 
                value="1d" 
                className="text-xs px-2 h-6" 
                onClick={() => setTimeframe('1d')}
              >
                1D
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex border rounded-md h-8 overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-8 w-8 rounded-none border-r",
                chartType === 'candle' && "bg-accent"
              )}
              onClick={() => setChartType('candle')}
            >
              <CandlestickChart className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-8 w-8 rounded-none",
                chartType === 'area' && "bg-accent"
              )}
              onClick={() => setChartType('area')}
            >
              <BarChart className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={toggleFullscreen}
          >
            {fullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="mt-4" style={{ height: fullscreen ? 'calc(100vh - 140px)' : '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={isPriceUp ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                  stopOpacity={0.3}
                />
                <stop 
                  offset="95%" 
                  stopColor={isPriceUp ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              minTickGap={50}
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            />
            <YAxis 
              scale={priceScale}
              domain={['auto', 'auto']}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              tickFormatter={(value) => formatPrice(value).replace('$', '')}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPriceUp ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradingViewChart;
