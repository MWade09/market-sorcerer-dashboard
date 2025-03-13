
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
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
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  ReferenceLine
} from 'recharts';
import { BacktestResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowDown, ArrowUp, Download, LineChart as LineChartIcon } from "lucide-react";

interface StrategyBacktestResultsProps {
  results: BacktestResult;
}

const StrategyBacktestResults: React.FC<StrategyBacktestResultsProps> = ({ results }) => {
  // Generate equity curve data
  const generateEquityCurveData = () => {
    const startDate = new Date(results.startDate);
    const endDate = new Date(results.endDate);
    const dayDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const data = [];
    let currentEquity = 10000; // Assuming a $10,000 starting point
    const finalEquity = currentEquity * (1 + results.totalReturn / 100);
    
    for (let i = 0; i <= dayDiff; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Generate a somewhat realistic equity curve with some randomness
      const progress = i / dayDiff;
      const targetEquity = currentEquity + (finalEquity - currentEquity) * progress;
      const randomFactor = 1 + (Math.random() * 0.04 - 0.02); // Add some random noise
      
      currentEquity = targetEquity * randomFactor;
      
      // Add occasional drawdowns
      if (i % 7 === 0 && i > 0 && i < dayDiff - 5) {
        currentEquity = currentEquity * (1 - Math.random() * 0.03);
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        equity: parseFloat(currentEquity.toFixed(2))
      });
    }
    
    return data;
  };
  
  // Generate trade distribution data
  const generateTradeDistributionData = () => {
    const winningTrades = Math.round(results.trades * (results.winRate / 100));
    const losingTrades = results.trades - winningTrades;
    
    return [
      { name: 'Winning Trades', value: winningTrades },
      { name: 'Losing Trades', value: losingTrades }
    ];
  };
  
  // Generate monthly returns data
  const generateMonthlyReturnsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map(month => {
      // Generate a return that trends towards the overall return, but with variation
      const baseReturn = results.totalReturn / 12;
      const randomVariation = Math.random() * baseReturn - (baseReturn / 2);
      let monthReturn = baseReturn + randomVariation;
      
      // Ensure we have some negative months for realism
      if (month === 'Mar' || month === 'Sep') {
        monthReturn = -Math.abs(monthReturn * 0.8);
      }
      
      return {
        name: month,
        return: parseFloat(monthReturn.toFixed(2))
      };
    });
  };
  
  // Generate drawdown data
  const generateDrawdownData = () => {
    const equityCurveData = generateEquityCurveData();
    let peak = 0;
    
    return equityCurveData.map(point => {
      peak = Math.max(peak, point.equity);
      const drawdown = ((peak - point.equity) / peak) * 100;
      
      return {
        date: point.date,
        equity: point.equity,
        drawdown: parseFloat(drawdown.toFixed(2))
      };
    });
  };
  
  const equityCurveData = generateEquityCurveData();
  const tradeDistributionData = generateTradeDistributionData();
  const monthlyReturnsData = generateMonthlyReturnsData();
  const drawdownData = generateDrawdownData();
  
  // Add custom colors for positive and negative returns
  const positiveColor = "#4CAF50";
  const negativeColor = "#F44336";
  
  // Add a color array for each data point in monthlyReturnsData
  const barColors = monthlyReturnsData.map(entry => 
    entry.return >= 0 ? positiveColor : negativeColor
  );
  
  const COLORS = ['#4CAF50', '#F44336'];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const getPerformanceRating = () => {
    const profitFactor = results.profitFactor;
    const sharpeRatio = results.sharpeRatio;
    
    if (profitFactor > 1.8 && sharpeRatio > 1.5) return { label: 'Excellent', color: 'bg-green-500' };
    if (profitFactor > 1.5 && sharpeRatio > 1) return { label: 'Good', color: 'bg-blue-500' };
    if (profitFactor > 1.2 && sharpeRatio > 0.8) return { label: 'Fair', color: 'bg-yellow-500' };
    if (profitFactor > 1) return { label: 'Marginal', color: 'bg-orange-500' };
    return { label: 'Poor', color: 'bg-red-500' };
  };
  
  const performanceRating = getPerformanceRating();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Backtest Results</CardTitle>
              <CardDescription>
                {new Date(results.startDate).toLocaleDateString()} - {new Date(results.endDate).toLocaleDateString()}
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={cn("px-3 py-1", performanceRating.color)}>
                {performanceRating.label}
              </Badge>
              
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Return</h4>
              <p className={cn(
                "text-2xl font-bold",
                results.totalReturn >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {results.totalReturn >= 0 ? "+" : ""}{results.totalReturn}%
              </p>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Win Rate</h4>
              <p className="text-2xl font-bold">{results.winRate}%</p>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Max Drawdown</h4>
              <p className="text-2xl font-bold text-red-600">-{results.maxDrawdown}%</p>
            </div>
          </div>
          
          <Tabs defaultValue="equity">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="equity">Equity Curve</TabsTrigger>
              <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Returns</TabsTrigger>
              <TabsTrigger value="trades">Trades</TabsTrigger>
            </TabsList>
            
            <TabsContent value="equity" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityCurveData}>
                  <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
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
                    dataKey="equity" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorEquity)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="drawdown" className="h-[400px]">
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
                    stroke="#ff5252" 
                    fillOpacity={1} 
                    fill="url(#colorDrawdown)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="monthly" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturnsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value}%`, 'Return']} />
                  <Bar 
                    dataKey="return" 
                    name="Monthly Return"
                    fill={positiveColor} // Set a default color
                  >
                    {monthlyReturnsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.return >= 0 ? positiveColor : negativeColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="trades" className="grid grid-cols-2 gap-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tradeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {tradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value} trades`, '']} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Total Trades</h4>
                  <p className="text-3xl font-bold">{results.trades}</p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Winning Trades</h4>
                    <p className="text-xl font-medium text-green-600">
                      {Math.round(results.trades * (results.winRate / 100))}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Losing Trades</h4>
                    <p className="text-xl font-medium text-red-600">
                      {Math.round(results.trades * (1 - results.winRate / 100))}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Profit Factor</h4>
                  <p className={cn(
                    "text-xl font-medium",
                    results.profitFactor >= 1.5 ? "text-green-600" : 
                    results.profitFactor >= 1 ? "text-amber-600" : "text-red-600"
                  )}>
                    {results.profitFactor.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Gross profit divided by gross loss
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                <p className="text-lg font-medium">{results.sharpeRatio.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Drawdown</p>
                <p className="text-lg font-medium text-red-600">{results.maxDrawdown}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recovery Factor</p>
                <p className="text-lg font-medium">
                  {(Math.abs(results.totalReturn) / results.maxDrawdown).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Win/Loss Ratio</p>
                <p className="text-lg font-medium">
                  {(results.profitFactor * (1 - results.winRate/100) / (results.winRate/100)).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Analysis & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              {results.profitFactor > 1.5 ? 
                "This strategy shows strong profitability and good risk-adjusted returns." :
                results.profitFactor > 1.2 ?
                "This strategy is profitable but may need optimization to improve performance." :
                results.profitFactor > 1 ?
                "This strategy is marginally profitable. Consider adjusting parameters." :
                "This strategy is not profitable in the tested period. Significant adjustments are needed."
              }
            </p>
            
            <h4 className="text-sm font-medium">Recommendations:</h4>
            <ul className="text-sm space-y-2">
              {results.maxDrawdown > 20 && (
                <li className="flex items-start gap-2">
                  <ArrowDown className="h-4 w-4 text-red-500 mt-0.5" />
                  <span>Reduce position size to limit the maximum drawdown</span>
                </li>
              )}
              
              {results.profitFactor < 1.2 && results.profitFactor > 1 && (
                <li className="flex items-start gap-2">
                  <ArrowUp className="h-4 w-4 text-amber-500 mt-0.5" />
                  <span>Consider increasing take profit levels to improve profit factor</span>
                </li>
              )}
              
              {results.winRate < 40 && (
                <li className="flex items-start gap-2">
                  <ArrowUp className="h-4 w-4 text-amber-500 mt-0.5" />
                  <span>Fine-tune entry criteria to improve win rate</span>
                </li>
              )}
              
              {results.winRate > 60 && results.profitFactor < 1.5 && (
                <li className="flex items-start gap-2">
                  <LineChartIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>High win rate but low profit factor - adjust position sizing to let winners run longer</span>
                </li>
              )}
              
              {results.sharpeRatio < 1 && (
                <li className="flex items-start gap-2">
                  <LineChartIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Risk-adjusted returns are low - consider reducing volatility or increasing returns</span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrategyBacktestResults;
