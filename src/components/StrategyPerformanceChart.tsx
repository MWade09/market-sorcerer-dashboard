
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  ReferenceLine
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ChevronDown, Download, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StrategyPerformanceChartProps {
  data: any[];
  metrics?: {
    totalReturn: number;
    maxDrawdown: number;
    sharpeRatio: number;
    winRate: number;
    profitFactor: number;
  };
  title?: string;
  description?: string;
}

const StrategyPerformanceChart: React.FC<StrategyPerformanceChartProps> = ({
  data,
  metrics,
  title = "Strategy Performance",
  description = "Visualize performance metrics and equity curve"
}) => {
  const [chartType, setChartType] = useState<'equity' | 'drawdown' | 'returns' | 'combined'>('equity');
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y' | 'all'>('all');
  const [showBenchmark, setShowBenchmark] = useState(false);
  
  // Filter data based on time range
  const filteredData = (() => {
    if (timeRange === 'all' || !data.length) return data;
    
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (timeRange) {
      case '1m':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  })();
  
  // Mock benchmark data (e.g., Bitcoin or S&P 500)
  const benchmarkData = filteredData.map(item => {
    const random = Math.random() * 0.04 - 0.02; // Random fluctuation between -2% and 2%
    const benchmark = item.value * (1 + random);
    return {
      ...item,
      benchmark
    };
  });
  
  // Generate monthly return data from the equity curve
  const generateMonthlyReturns = () => {
    if (!filteredData.length) return [];
    
    const monthlyReturns = [];
    const months = {};
    
    // Group data points by month
    filteredData.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!months[monthKey]) {
        months[monthKey] = {
          first: item.value,
          last: item.value,
          date: monthKey
        };
      } else {
        months[monthKey].last = item.value;
      }
    });
    
    // Calculate monthly returns
    Object.keys(months).forEach(month => {
      const { first, last, date } = months[month];
      const [year, monthNum] = date.split('-');
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[parseInt(monthNum) - 1];
      
      const returnValue = ((last - first) / first) * 100;
      
      monthlyReturns.push({
        month: `${monthName} ${year}`,
        return: parseFloat(returnValue.toFixed(2))
      });
    });
    
    return monthlyReturns;
  };
  
  const monthlyReturnsData = generateMonthlyReturns();
  
  // Calculate drawdown data
  const calculateDrawdown = () => {
    if (!filteredData.length) return [];
    
    let peak = 0;
    return filteredData.map(item => {
      peak = Math.max(peak, item.value);
      const drawdown = ((peak - item.value) / peak) * 100;
      
      return {
        ...item,
        drawdown: parseFloat(drawdown.toFixed(2))
      };
    });
  };
  
  const drawdownData = calculateDrawdown();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
              <SelectTrigger className="w-[100px] h-8">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <Tabs value={chartType} onValueChange={(value: any) => setChartType(value)} className="w-auto">
            <TabsList>
              <TabsTrigger value="equity">Equity</TabsTrigger>
              <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="combined">Combined</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="showBenchmark" 
              checked={showBenchmark}
              onCheckedChange={(checked) => setShowBenchmark(!!checked)}
            />
            <Label htmlFor="showBenchmark" className="text-sm">Show Benchmark</Label>
          </div>
        </div>
        
        {metrics && (
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Return</p>
              <p className={cn(
                "text-xl font-medium",
                metrics.totalReturn >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {metrics.totalReturn >= 0 ? "+" : ""}{metrics.totalReturn}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-xl font-medium">{metrics.winRate}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Profit Factor</p>
              <p className="text-xl font-medium">{metrics.profitFactor.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
              <p className="text-xl font-medium">{metrics.sharpeRatio.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <p className="text-xl font-medium text-red-600">-{metrics.maxDrawdown}%</p>
            </div>
          </div>
        )}
        
        <div className="h-[400px]">
          {chartType === 'equity' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  {showBenchmark && (
                    <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  )}
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  minTickGap={30}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(value), 'Equity']}
                  labelFormatter={formatDate}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="Strategy"
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
                {showBenchmark && (
                  <Area 
                    type="monotone" 
                    dataKey="benchmark" 
                    name="Benchmark"
                    stroke="#82ca9d" 
                    fillOpacity={0.3} 
                    fill="url(#colorBenchmark)" 
                  />
                )}
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'drawdown' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={drawdownData}>
                <defs>
                  <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5252" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff5252" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  minTickGap={30}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'Drawdown']}
                  labelFormatter={formatDate}
                />
                <Area 
                  type="monotone" 
                  dataKey="drawdown" 
                  name="Drawdown"
                  stroke="#ff5252" 
                  fillOpacity={1} 
                  fill="url(#colorDrawdown)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'returns' && (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyReturnsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}%`, 'Return']} />
                <ReferenceLine y={0} stroke="#000" />
                <Bar 
                  dataKey="return" 
                  name="Monthly Return"
                  fill={(entry) => entry.return >= 0 ? "#4CAF50" : "#F44336"}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'combined' && (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={drawdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  minTickGap={30}
                />
                <YAxis 
                  yAxisId="left"
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === 'Equity') return [formatCurrency(value), name];
                    if (name === 'Drawdown') return [`${value}%`, name];
                    return [value, name];
                  }}
                  labelFormatter={formatDate}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="value" 
                  name="Equity"
                  stroke="#8884d8" 
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="drawdown" 
                  name="Drawdown"
                  stroke="#ff5252" 
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyPerformanceChart;
