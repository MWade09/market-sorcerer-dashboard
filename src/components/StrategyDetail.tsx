import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MoreVertical, ArrowLeft, CircleDollarSign, LineChart as LineChartIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
} from "./ui/command"
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  Cell
} from 'recharts';

interface StrategyDetailProps {
  strategyId: string;
  onBack: () => void;
}

const StrategyDetail: React.FC<StrategyDetailProps> = ({ strategyId, onBack }) => {
  const [loading, setLoading] = React.useState(true);
  const [strategy, setStrategy] = React.useState<any>(null);
  const [tradingPair, setTradingPair] = React.useState('BTC/USD');
  const [isStrategyActive, setIsStrategyActive] = React.useState(true);

  React.useEffect(() => {
    // Mock API call to fetch strategy details
    setTimeout(() => {
      const mockStrategy = {
        id: strategyId,
        name: "Momentum Master",
        description: "A strategy that capitalizes on short-term price momentum.",
        riskLevel: "medium",
        timeframe: "15m",
        indicators: ["RSI", "MACD"],
        type: "momentum",
        isActive: true,
        config: {
          RSI_Overbought: 70,
          RSI_Oversold: 30,
          MACD_FastLength: 12,
          MACD_SlowLength: 26,
        },
        advancedParams: {
          positionSize: 0.02,
          allowPyramiding: false,
          useStopLoss: true,
          stopLossPercentage: 2,
          useTakeProfit: true,
          takeProfitPercentage: 5,
        },
        backtestResults: {
          totalReturn: 35.2,
          maxDrawdown: -12.5,
          sharpeRatio: 1.8,
          winRate: 62.5,
          profitFactor: 2.1,
        },
      };

      setStrategy(mockStrategy);
      setLoading(false);
    }, 500);
  }, [strategyId]);

  // Performance metrics data
  const performanceMetrics = [
    { label: "Total Return", value: "35.2%", change: 1.2, info: "Total percentage gain" },
    { label: "Max Drawdown", value: "-12.5%", change: -0.5, info: "Maximum loss from peak to trough" },
    { label: "Sharpe Ratio", value: "1.8", change: 0.1, info: "Risk-adjusted return" },
    { label: "Win Rate", value: "62.5%", change: 0.8, info: "Percentage of winning trades" },
    { label: "Profit Factor", value: "2.1", change: 0.2, info: "Ratio of gross profit to gross loss" },
  ];

  // Strategy parameters data
  const strategyParameters = [
    { label: "Risk Level", value: strategy?.riskLevel || "Medium" },
    { label: "Timeframe", value: strategy?.timeframe || "15m" },
    { label: "Indicators", value: strategy?.indicators?.join(", ") || "RSI, MACD" },
    { label: "Position Size", value: strategy?.advancedParams?.positionSize || "0.02" },
    { label: "Stop Loss", value: strategy?.advancedParams?.stopLossPercentage ? `${strategy?.advancedParams?.stopLossPercentage}%` : "Disabled" },
    { label: "Take Profit", value: strategy?.advancedParams?.takeProfitPercentage ? `${strategy?.advancedParams?.takeProfitPercentage}%` : "Disabled" },
  ];

  // Performance data with random returns
  const performanceData = React.useMemo(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Go back 30 days

    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const baseValue = 10000; // Starting equity
      const dailyReturn = Math.random() * 0.02 - 0.01; // Random return between -1% and 1%
      const value = baseValue * (1 + dailyReturn * (i + 1));

      return {
        date: date.toISOString().split('T')[0],
        value: parseFloat(value.toFixed(2)),
      };
    });
  }, []);

  // Monthly returns data
  const monthlyReturnsData = React.useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months.map(month => {
      const returnValue = Math.random() * 8 - 4; // Random return between -4% and 4%
      return {
        month,
        return: parseFloat(returnValue.toFixed(2)),
      };
    });
  }, []);

  // Monthly returns colors for custom rendering
  const positiveColor = "#4ade80"; // green-400
  const negativeColor = "#f87171"; // red-400

  const getTradingPair = () => {
    // Mock function to fetch trading pair
    return `${Math.random() > 0.5 ? 'BTC/USD' : 'ETH/USD'}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleStrategyActionToggle = () => {
    setIsStrategyActive(!isStrategyActive);
  };

  if (loading) {
    return <div>Loading strategy details...</div>;
  }

  if (!strategy) {
    return <div>Strategy not found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <CardTitle>{strategy.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleStrategyActionToggle}>
              {isStrategyActive ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Strategy Overview Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Strategy overview and objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{strategy.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Potential risks and drawdowns</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">{strategy.riskLevel}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading Pair</CardTitle>
            <CardDescription>Currently active pair</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <CircleDollarSign className="h-4 w-4 text-green-500" />
              <div>{getTradingPair()}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="backtests">Backtests</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for this strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <p className="text-sm font-medium">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.info}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Equity Curve & Drawdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Equity Curve */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Equity Curve</CardTitle>
                <CardDescription>Strategy performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Equity']} labelFormatter={formatDate} />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Returns */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Monthly Returns</CardTitle>
                <CardDescription>Performance breakdown by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyReturnsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                      <ReferenceLine y={0} stroke="#888888" />
                      <Bar
                        dataKey="return"
                        name="Monthly Return"
                        fill={positiveColor} // Default color, will be overridden by Cell components
                      >
                        {monthlyReturnsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.return >= 0 ? positiveColor : negativeColor} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Analysis</CardTitle>
              <CardDescription>Further insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Based on the current performance metrics, this strategy shows a
                promising total return with a manageable max drawdown. The Sharpe
                Ratio indicates good risk-adjusted returns.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parameters Tab */}
        <TabsContent value="parameters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Parameters</CardTitle>
              <CardDescription>Configuration settings for this strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strategyParameters.map((param) => (
                  <div key={param.label} className="space-y-1">
                    <p className="text-sm font-medium">{param.label}</p>
                    <p className="text-lg">{param.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backtests Tab */}
        <TabsContent value="backtests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Backtests</CardTitle>
              <CardDescription>Historical performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Backtesting results will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trades Tab */}
        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trades</CardTitle>
              <CardDescription>List of executed trades</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Trade history will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional UI elements */}
    </div>
  );
};

export default StrategyDetail;
