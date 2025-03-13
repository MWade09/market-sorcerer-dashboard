
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
  Bar
} from 'recharts';
import { TradingStrategy, BacktestResult, TradeHistory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Play, 
  Pause, 
  BarChart as BarChartIcon, 
  Settings, 
  Save, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import BacktestSettings from "./BacktestSettings";
import StrategyBacktestResults from "./StrategyBacktestResults";

interface StrategyDetailProps {
  strategy: TradingStrategy;
  backtestData?: BacktestResult;
  tradeHistory?: TradeHistory[];
  onBack?: () => void;
  onSave?: (strategy: TradingStrategy) => void;
  onRunBacktest?: (strategy: TradingStrategy, settings: any) => Promise<BacktestResult>;
}

const StrategyDetail: React.FC<StrategyDetailProps> = ({
  strategy,
  backtestData,
  tradeHistory,
  onBack,
  onSave,
  onRunBacktest
}) => {
  const [currentStrategy, setCurrentStrategy] = useState<TradingStrategy>({...strategy});
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [backtestResults, setBacktestResults] = useState<BacktestResult | undefined>(backtestData);
  const [activeTab, setActiveTab] = useState('overview');
  const [backtestSettings, setBacktestSettings] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
    initialCapital: 10000,
    useStopLoss: currentStrategy.advancedParams?.useStopLoss || false,
    stopLossPercentage: currentStrategy.advancedParams?.stopLossPercentage || 5,
    useTakeProfit: currentStrategy.advancedParams?.useTakeProfit || false,
    takeProfitPercentage: currentStrategy.advancedParams?.takeProfitPercentage || 10,
  });
  
  // Generate mock equity curve data for visualization
  const generateEquityCurveData = () => {
    if (!backtestResults) return [];
    
    const days = 30;
    const startValue = 10000;
    const endValue = startValue * (1 + backtestResults.totalReturn / 100);
    
    // Generate a somewhat realistic equity curve
    const data = [];
    let currentValue = startValue;
    for (let i = 0; i <= days; i++) {
      // Add some randomness to make it look realistic
      const randomFactor = 1 + (Math.random() * 0.02 - 0.01);
      
      // Gradually move towards the end value
      const progressFactor = i / days;
      const targetValue = startValue + (endValue - startValue) * progressFactor;
      
      // Apply some mean reversion to the random walk
      currentValue = currentValue * 0.9 + targetValue * 0.1 * randomFactor;
      
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: currentValue.toFixed(2),
      });
    }
    
    return data;
  };
  
  const equityCurveData = generateEquityCurveData();
  
  // Generate mock monthly returns data
  const generateMonthlyReturnsData = () => {
    if (!backtestResults) return [];
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map(month => {
      // Generate realistic looking returns based on overall performance
      const baseReturn = backtestResults.totalReturn / 12;
      const randomFactor = Math.random() * 2 - 1; // Between -1 and 1
      const monthReturn = baseReturn + randomFactor * (Math.abs(baseReturn) / 2);
      
      return {
        month,
        return: monthReturn.toFixed(2)
      };
    });
  };
  
  const monthlyReturnsData = generateMonthlyReturnsData();
  
  // Handle running a backtest
  const handleRunBacktest = async () => {
    if (!onRunBacktest) return;
    
    setIsBacktesting(true);
    try {
      const results = await onRunBacktest(currentStrategy, backtestSettings);
      setBacktestResults(results);
      setActiveTab('results');
      toast.success("Backtest completed successfully");
    } catch (error) {
      console.error("Backtest error:", error);
      toast.error("Failed to run backtest");
    } finally {
      setIsBacktesting(false);
    }
  };
  
  // Handle saving strategy changes
  const handleSaveStrategy = () => {
    if (onSave) {
      onSave(currentStrategy);
      toast.success("Strategy saved successfully");
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <h2 className="text-2xl font-bold">{strategy.name}</h2>
          <Badge variant={strategy.isActive ? "default" : "outline"}>
            {strategy.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveStrategy}
            className="gap-1"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          {!isBacktesting ? (
            <Button 
              onClick={handleRunBacktest}
              className="gap-1"
            >
              <Play className="h-4 w-4" />
              Run Backtest
            </Button>
          ) : (
            <Button disabled className="gap-1">
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Running...
            </Button>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="backtest">Backtest</TabsTrigger>
          <TabsTrigger value="results" disabled={!backtestResults}>Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Strategy Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold capitalize">
                  {strategy.type.replace('_', ' ')}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{strategy.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "text-2xl font-semibold capitalize",
                  strategy.riskLevel === "low" ? "text-green-500" :
                  strategy.riskLevel === "medium" ? "text-amber-500" : 
                  "text-red-500"
                )}>
                  {strategy.riskLevel}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {strategy.riskLevel === "low" ? "Conservative approach with minimal drawdowns" :
                  strategy.riskLevel === "medium" ? "Balanced risk-reward profile" : 
                  "Aggressive approach for maximum returns"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Trading Pair</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  {strategy.config.asset || "BTC/USDT"}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Timeframe: {strategy.timeframe || strategy.config.timeframe || "1h"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {backtestResults && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Equity curve based on backtest results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={equityCurveData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Returns</CardTitle>
                    <CardDescription>Performance breakdown by month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyReturnsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="return" 
                            fill={(entry) => parseFloat(entry.return) >= 0 ? "#4ade80" : "#f87171"}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                    <CardDescription>Performance statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Return</p>
                          <p className={cn(
                            "text-2xl font-medium",
                            backtestResults.totalReturn >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {backtestResults.totalReturn}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Win Rate</p>
                          <p className="text-2xl font-medium">{backtestResults.winRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profit Factor</p>
                          <p className="text-2xl font-medium">{backtestResults.profitFactor.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                          <p className="text-2xl font-medium">{backtestResults.sharpeRatio.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Max Drawdown</p>
                          <p className="text-2xl font-medium text-red-500">{backtestResults.maxDrawdown}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Trades</p>
                          <p className="text-2xl font-medium">{backtestResults.trades}</p>
                        </div>
                      </div>
                      
                      {backtestResults.maxDrawdown > 20 && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                          <AlertCircle className="h-5 w-5" />
                          <p className="text-sm">High drawdown detected. Consider adjusting risk parameters.</p>
                        </div>
                      )}
                      
                      {backtestResults.profitFactor < 1.2 && backtestResults.profitFactor > 0 && (
                        <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-700 rounded-md">
                          <AlertCircle className="h-5 w-5" />
                          <p className="text-sm">Low profit factor. Strategy may not be robust enough.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Settings</CardTitle>
              <CardDescription>Configure the core parameters for this strategy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="strategy-name">Strategy Name</Label>
                <Input 
                  id="strategy-name" 
                  value={currentStrategy.name}
                  onChange={(e) => setCurrentStrategy({...currentStrategy, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="strategy-description">Description</Label>
                <Input 
                  id="strategy-description" 
                  value={currentStrategy.description}
                  onChange={(e) => setCurrentStrategy({...currentStrategy, description: e.target.value})}
                />
              </div>
              
              {/* Render strategy-specific settings based on type */}
              {currentStrategy.type === "momentum" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rsi-period">RSI Period</Label>
                      <Input 
                        id="rsi-period" 
                        type="number"
                        value={currentStrategy.config.rsiPeriod}
                        onChange={(e) => setCurrentStrategy({
                          ...currentStrategy, 
                          config: {...currentStrategy.config, rsiPeriod: parseInt(e.target.value)}
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rsi-overbought">Overbought Level</Label>
                      <Input 
                        id="rsi-overbought" 
                        type="number"
                        value={currentStrategy.config.overbought}
                        onChange={(e) => setCurrentStrategy({
                          ...currentStrategy, 
                          config: {...currentStrategy.config, overbought: parseInt(e.target.value)}
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rsi-oversold">Oversold Level</Label>
                      <Input 
                        id="rsi-oversold" 
                        type="number"
                        value={currentStrategy.config.oversold}
                        onChange={(e) => setCurrentStrategy({
                          ...currentStrategy, 
                          config: {...currentStrategy.config, oversold: parseInt(e.target.value)}
                        })}
                      />
                    </div>
                  </div>
                </>
              )}
              
              {currentStrategy.type === "trend_following" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fast-ma">Fast MA Period</Label>
                      <Input 
                        id="fast-ma" 
                        type="number"
                        value={currentStrategy.config.fastMA}
                        onChange={(e) => setCurrentStrategy({
                          ...currentStrategy, 
                          config: {...currentStrategy.config, fastMA: parseInt(e.target.value)}
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="slow-ma">Slow MA Period</Label>
                      <Input 
                        id="slow-ma" 
                        type="number"
                        value={currentStrategy.config.slowMA}
                        onChange={(e) => setCurrentStrategy({
                          ...currentStrategy, 
                          config: {...currentStrategy.config, slowMA: parseInt(e.target.value)}
                        })}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure risk management and execution parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* The advanced parameters would be rendered here based on the strategy type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position-size">Position Size (%)</Label>
                  <Input 
                    id="position-size" 
                    type="number"
                    value={currentStrategy.advancedParams?.positionSize || 5}
                    onChange={(e) => {
                      const positionSize = parseInt(e.target.value);
                      setCurrentStrategy({
                        ...currentStrategy,
                        advancedParams: {
                          ...currentStrategy.advancedParams,
                          positionSize
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backtest" className="mt-4">
          <BacktestSettings 
            settings={backtestSettings}
            onChange={setBacktestSettings}
            onRun={handleRunBacktest}
            isRunning={isBacktesting}
          />
        </TabsContent>
        
        <TabsContent value="results" className="mt-4">
          {backtestResults ? (
            <StrategyBacktestResults results={backtestResults} />
          ) : (
            <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg text-center">
              <BarChartIcon className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Backtest Results</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Run a backtest to see detailed performance metrics and analysis for your strategy.
              </p>
              <Button 
                className="mt-4" 
                onClick={() => setActiveTab('backtest')}
              >
                Go to Backtest
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategyDetail;
