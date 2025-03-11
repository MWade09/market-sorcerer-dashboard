
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  ArrowRight, 
  GraduationCap, 
  BarChart3, 
  TrendingUp, 
  Settings,

  Zap,
  DollarSign,
  Shield,
  Lightbulb,
  AlertCircle,
  Clock,
  Percent
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const LearningPath = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const markAsCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      toast.success("Lesson marked as completed!", {
        description: "Your progress has been saved"
      });
    }
  };

  const calculateProgress = (section: string) => {
    const sectionLessons = {
      'getting-started': 4,
      'understanding-markets': 5,
      'strategy-basics': 6,
      'risk-management': 4
    };
    
    const sectionPrefix = section + '-';
    const completedInSection = completedLessons.filter(id => id.startsWith(sectionPrefix)).length;
    
    return (completedInSection / sectionLessons[section as keyof typeof sectionLessons]) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4 mb-4">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Your Learning Journey
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Follow this step-by-step learning path to understand how to use the trading bot effectively and make informed decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {['getting-started', 'understanding-markets', 'strategy-basics', 'risk-management'].map((section) => (
            <div key={section} className="flex flex-col">
              <div className="text-xs text-muted-foreground mb-1">
                {section === 'getting-started' && 'Getting Started'}
                {section === 'understanding-markets' && 'Market Analysis'}
                {section === 'strategy-basics' && 'Trading Strategies'}
                {section === 'risk-management' && 'Risk Management'}
              </div>
              <Progress value={calculateProgress(section)} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="getting-started" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Getting Started</span>
            <span className="inline md:hidden">Start</span>
          </TabsTrigger>
          <TabsTrigger value="understanding-markets" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden md:inline">Market Analysis</span>
            <span className="inline md:hidden">Markets</span>
          </TabsTrigger>
          <TabsTrigger value="strategy-basics" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span className="hidden md:inline">Trading Strategies</span>
            <span className="inline md:hidden">Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="risk-management" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Risk Management</span>
            <span className="inline md:hidden">Risk</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Getting Started with Market Sorcerer</h2>
          <p className="text-muted-foreground mb-4">Learn the basics of setting up your trading bot and navigating the dashboard</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="setup-guide" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('getting-started-1') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 1
                  </Badge>
                  First-Time Setup Guide
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <div className="space-y-4">
                  <p>Setting up your trading bot correctly is crucial for successful automated trading. Follow these steps to get started:</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">1. Connecting Your Exchange</h4>
                    <p className="text-sm text-muted-foreground">
                      Click the Settings button in the top right corner and navigate to the "Exchanges" tab. Here you can connect to popular cryptocurrency exchanges like Binance, Coinbase, or Kraken.
                    </p>
                    <div className="border rounded-md p-3 bg-accent/30 text-sm">
                      <strong>Important:</strong> When creating API keys on your exchange, only enable reading and trading permissions. Never enable withdrawals for security reasons.
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">2. Selecting a Trading Strategy</h4>
                    <p className="text-sm text-muted-foreground">
                      Navigate to the "Strategies" tab in settings. Start with a simple strategy like "Moving Average Crossover" which is beginner-friendly.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">3. Setting Risk Parameters</h4>
                    <p className="text-sm text-muted-foreground">
                      In the "Risk Management" tab, configure your stop-loss and take-profit levels. For beginners, we recommend setting stop-losses at 2-5% and take-profits at 5-10%.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">4. Start with Paper Trading</h4>
                    <p className="text-sm text-muted-foreground">
                      Always begin with paper trading (simulation) to test your strategy without risking real money. Toggle "Enable test mode" when connecting your exchange.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => markAsCompleted('getting-started-1')} 
                    className="w-full mt-2"
                    variant={completedLessons.includes('getting-started-1') ? "outline" : "default"}
                  >
                    {completedLessons.includes('getting-started-1') ? "Completed ✓" : "Mark as Completed"}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="dashboard-overview" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('getting-started-2') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 2
                  </Badge>
                  Dashboard Navigation
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <div className="space-y-4">
                  <p>Understanding the dashboard elements is essential for monitoring your trading bot's performance:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Price Chart</h4>
                      <p className="text-sm text-muted-foreground">
                        The main price chart shows real-time market data. Learn to recognize patterns like support/resistance levels.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Performance Metrics</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor your bot's performance through metrics like Win Rate, Profit Factor, and Maximum Drawdown.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Trade Controls</h4>
                      <p className="text-sm text-muted-foreground">
                        Switch between automated and manual trading modes. In automated mode, the bot executes trades based on your strategy.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Market Signals</h4>
                      <p className="text-sm text-muted-foreground">
                        Technical indicators that help predict market movements. Green signals are bullish (buy), red are bearish (sell).
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-accent/30 text-sm">
                    <strong>Pro Tip:</strong> Focus on the "Active Trades" section to monitor your current positions. The "Stop Bot" button immediately halts all automated trading.
                  </div>
                  
                  <Button 
                    onClick={() => markAsCompleted('getting-started-2')} 
                    className="w-full mt-2"
                    variant={completedLessons.includes('getting-started-2') ? "outline" : "default"}
                  >
                    {completedLessons.includes('getting-started-2') ? "Completed ✓" : "Mark as Completed"}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="first-trade" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('getting-started-3') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 3
                  </Badge>
                  Your First Trade
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <div className="space-y-4">
                  <p>Ready to place your first trade? Follow this step-by-step guide:</p>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-medium">1. Select Manual Trading Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        In the Trade Controls section, switch to "Manual" mode for your first trade.
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium">2. Choose a Low-Risk Asset</h4>
                      <p className="text-sm text-muted-foreground">
                        For your first trade, select a major cryptocurrency like Bitcoin or Ethereum which typically have lower volatility.
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium">3. Start with a Small Amount</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the position size slider to select a small amount (0.001-0.01 BTC or equivalent) for your first trade.
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium">4. Choose Market or Limit Order</h4>
                      <p className="text-sm text-muted-foreground">
                        Market orders execute immediately at the current price. Limit orders let you specify a price.
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium">5. Set Stop-Loss and Take-Profit</h4>
                      <p className="text-sm text-muted-foreground">
                        Always set these risk parameters before placing your trade.
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium">6. Execute and Monitor</h4>
                      <p className="text-sm text-muted-foreground">
                        Click "Buy/Long" or "Sell/Short" to execute your trade, then monitor it in the Active Trades section.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-accent/30 text-sm">
                    <strong>Beginner Tip:</strong> For your first few trades, use the paper trading mode to practice without risking real funds.
                  </div>
                  
                  <Button 
                    onClick={() => markAsCompleted('getting-started-3')} 
                    className="w-full mt-2"
                    variant={completedLessons.includes('getting-started-3') ? "outline" : "default"}
                  >
                    {completedLessons.includes('getting-started-3') ? "Completed ✓" : "Mark as Completed"}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="results-analysis" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('getting-started-4') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 4
                  </Badge>
                  Reviewing Trade Results
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <div className="space-y-4">
                  <p>After your first trades, it's crucial to analyze your results and learn from them:</p>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-medium">Reviewing Trade History</h4>
                      <p className="text-sm text-muted-foreground">
                        Navigate to the "History" tab to see all your past trades. Look for patterns in winning and losing trades.
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium">Understanding Key Metrics</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Win Rate:</strong> Percentage of profitable trades<br />
                        <strong>Profit Factor:</strong> Ratio of gross profits to gross losses<br />
                        <strong>Average Trade:</strong> Your average profit or loss per trade<br />
                        <strong>Maximum Drawdown:</strong> Largest peak-to-trough decline in your account
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium">Journal Your Trades</h4>
                      <p className="text-sm text-muted-foreground">
                        Keep notes on why you entered trades and what you learned. This helps identify your strengths and areas for improvement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-accent/30 text-sm">
                    <strong>Learning Opportunity:</strong> Don't be discouraged by losing trades—they provide valuable lessons. Focus on your overall performance rather than individual trades.
                  </div>
                  
                  <Button 
                    onClick={() => markAsCompleted('getting-started-4')} 
                    className="w-full mt-2"
                    variant={completedLessons.includes('getting-started-4') ? "outline" : "default"}
                  >
                    {completedLessons.includes('getting-started-4') ? "Completed ✓" : "Mark as Completed"}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-end mt-4">
            <Button onClick={() => setActiveSection('understanding-markets')} className="gap-2">
              Next Section: Market Analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="understanding-markets" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Understanding Market Analysis</h2>
          <p className="text-muted-foreground mb-4">Learn how to analyze cryptocurrency markets and make informed trading decisions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Price Action Basics
                </CardTitle>
                <CardDescription>Lesson 1</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Learn to identify key patterns like support/resistance levels, trends, and candlestick formations.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => markAsCompleted('understanding-markets-1')}
                >
                  {completedLessons.includes('understanding-markets-1') ? "Completed ✓" : "Start Lesson"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Technical Indicators
                </CardTitle>
                <CardDescription>Lesson 2</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Understand how to use RSI, MACD, Bollinger Bands and other indicators for trade decisions.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => markAsCompleted('understanding-markets-2')}
                >
                  {completedLessons.includes('understanding-markets-2') ? "Completed ✓" : "Start Lesson"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timeframe Selection
                </CardTitle>
                <CardDescription>Lesson 3</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>How to choose the right timeframe for your analysis based on your trading style.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => markAsCompleted('understanding-markets-3')}
                >
                  {completedLessons.includes('understanding-markets-3') ? "Completed ✓" : "Start Lesson"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Market Sentiment
                </CardTitle>
                <CardDescription>Lesson 4</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>How market sentiment affects prices and ways to gauge the overall market mood.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => markAsCompleted('understanding-markets-4')}
                >
                  {completedLessons.includes('understanding-markets-4') ? "Completed ✓" : "Start Lesson"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Market Conditions & Parameter Settings
                </CardTitle>
                <CardDescription>Lesson 5</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="mb-3">Learn how to adjust bot parameters based on different market conditions:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-1">Trending Markets</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Use trend-following strategies</li>
                      <li>Increase position size</li>
                      <li>Set wider stop-losses</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-1">Ranging Markets</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Use oscillator strategies (RSI)</li>
                      <li>Decrease position size</li>
                      <li>Set tighter ranges for entries</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium mb-1">Volatile Markets</h4>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Reduce overall exposure</li>
                      <li>Use tighter stop-losses</li>
                      <li>Consider waiting for stability</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => markAsCompleted('understanding-markets-5')}
                >
                  {completedLessons.includes('understanding-markets-5') ? "Completed ✓" : "Start Lesson"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setActiveSection('getting-started')} className="gap-2">
              Previous Section
            </Button>
            <Button onClick={() => setActiveSection('strategy-basics')} className="gap-2">
              Next Section: Trading Strategies
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="strategy-basics" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Trading Strategy Fundamentals</h2>
          <p className="text-muted-foreground mb-4">Understand different trading strategies and when to use them</p>
          
          <div className="border rounded-md p-4 mb-4 bg-accent/30">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Parameter Guidelines by Strategy Type
            </h3>
            <p className="text-sm mb-3">
              Use these recommended settings when configuring your strategies in the bot settings:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Momentum RSI Strategy</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>RSI Period:</span>
                    <span className="font-medium">14</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overbought Level:</span>
                    <span className="font-medium">70-80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oversold Level:</span>
                    <span className="font-medium">20-30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Timeframe:</span>
                    <span className="font-medium">1h or 4h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Condition:</span>
                    <span className="font-medium">Range-bound markets</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Moving Average Crossover</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Fast MA:</span>
                    <span className="font-medium">9-12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slow MA:</span>
                    <span className="font-medium">21-50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Timeframe:</span>
                    <span className="font-medium">4h or 1d</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Condition:</span>
                    <span className="font-medium">Trending markets</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Bollinger Band Strategy</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Period:</span>
                    <span className="font-medium">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deviations:</span>
                    <span className="font-medium">2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Timeframe:</span>
                    <span className="font-medium">1h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Condition:</span>
                    <span className="font-medium">Volatile, range-bound</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Dollar Cost Averaging (DCA)</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Interval:</span>
                    <span className="font-medium">Weekly</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">Fixed USD amount</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best For:</span>
                    <span className="font-medium">Long-term holding</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Condition:</span>
                    <span className="font-medium">All market conditions</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => markAsCompleted('strategy-basics-1')}
            >
              {completedLessons.includes('strategy-basics-1') ? "Reference Guide Reviewed ✓" : "Mark as Reviewed"}
            </Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="trend-following" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('strategy-basics-2') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 2
                  </Badge>
                  Trend Following Strategies
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <Button 
                  onClick={() => markAsCompleted('strategy-basics-2')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('strategy-basics-2') ? "outline" : "default"}
                >
                  {completedLessons.includes('strategy-basics-2') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="mean-reversion" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('strategy-basics-3') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 3
                  </Badge>
                  Mean Reversion Strategies
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <Button 
                  onClick={() => markAsCompleted('strategy-basics-3')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('strategy-basics-3') ? "outline" : "default"}
                >
                  {completedLessons.includes('strategy-basics-3') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="breakout" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('strategy-basics-4') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 4
                  </Badge>
                  Breakout Strategies
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <Button 
                  onClick={() => markAsCompleted('strategy-basics-4')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('strategy-basics-4') ? "outline" : "default"}
                >
                  {completedLessons.includes('strategy-basics-4') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="scalping" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('strategy-basics-5') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 5
                  </Badge>
                  Scalping Strategies
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <Button 
                  onClick={() => markAsCompleted('strategy-basics-5')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('strategy-basics-5') ? "outline" : "default"}
                >
                  {completedLessons.includes('strategy-basics-5') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="market-conditions" className="border rounded-md mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-2 hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Badge className={cn(
                    completedLessons.includes('strategy-basics-6') ? "bg-green-500" : "bg-blue-500"
                  )}>
                    Lesson 6
                  </Badge>
                  Adapting to Market Conditions
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2">
                <Button 
                  onClick={() => markAsCompleted('strategy-basics-6')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('strategy-basics-6') ? "outline" : "default"}
                >
                  {completedLessons.includes('strategy-basics-6') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setActiveSection('understanding-markets')} className="gap-2">
              Previous Section
            </Button>
            <Button onClick={() => setActiveSection('risk-management')} className="gap-2">
              Next Section: Risk Management
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="risk-management" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Risk Management Essentials</h2>
          <p className="text-muted-foreground mb-4">Learn how to protect your capital and manage risk effectively</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Percent className="h-5 w-5 text-blue-500" />
                Position Sizing Guidelines
              </h3>
              
              <div className="space-y-3 text-sm">
                <p>Position sizing is critical for risk management. Here's a guide by experience level:</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium">Experience Level</span>
                    <span className="font-medium">Max % of Portfolio per Trade</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Beginner</span>
                    <span>1-2%</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Intermediate</span>
                    <span>2-5%</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Advanced</span>
                    <span>5-10%</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground italic">
                  Note: These are maximum recommendations. Consider reducing position size in volatile markets.
                </p>
                
                <Button 
                  onClick={() => markAsCompleted('risk-management-1')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('risk-management-1') ? "outline" : "default"}
                  size="sm"
                >
                  {completedLessons.includes('risk-management-1') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Stop-Loss Strategies
              </h3>
              
              <div className="space-y-3 text-sm">
                <p>Stop-losses are essential for protecting your capital. Here's how to set them:</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium">Strategy Type</span>
                    <span className="font-medium">Stop-Loss Distance</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Trend Following</span>
                    <span>5-10%</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Mean Reversion</span>
                    <span>2-5%</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Breakout</span>
                    <span>3-7%</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground italic">
                  Advanced: Consider using trailing stops for trend-following strategies to protect profits.
                </p>
                
                <Button 
                  onClick={() => markAsCompleted('risk-management-2')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('risk-management-2') ? "outline" : "default"}
                  size="sm"
                >
                  {completedLessons.includes('risk-management-2') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md p-4 md:col-span-2">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                Risk Parameter Settings for Different Market Conditions
              </h3>
              
              <div className="space-y-4 text-sm">
                <p>Adjust these settings in the Risk Management tab based on current market conditions:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-3 bg-green-50/30">
                    <h4 className="font-medium mb-2">Bullish Market</h4>
                    <ul className="space-y-1 list-disc list-inside text-xs text-muted-foreground">
                      <li>Position Size: Up to your max limit</li>
                      <li>Stop-Loss: 5-10% from entry</li>
                      <li>Take-Profit: 15-20% from entry</li>
                      <li>Leverage: Up to 2x (if experienced)</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-red-50/30">
                    <h4 className="font-medium mb-2">Bearish Market</h4>
                    <ul className="space-y-1 list-disc list-inside text-xs text-muted-foreground">
                      <li>Position Size: 50% of your normal size</li>
                      <li>Stop-Loss: 3-5% from entry</li>
                      <li>Take-Profit: 10-15% from entry</li>
                      <li>Leverage: Avoid or max 1.5x</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3 bg-yellow-50/30">
                    <h4 className="font-medium mb-2">Volatile/Uncertain Market</h4>
                    <ul className="space-y-1 list-disc list-inside text-xs text-muted-foreground">
                      <li>Position Size: 25-50% of normal</li>
                      <li>Stop-Loss: 2-3% from entry</li>
                      <li>Take-Profit: Multiple targets (8%, 15%)</li>
                      <li>Leverage: Avoid completely</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-md p-3 bg-accent/30">
                  <p className="font-medium">Real-world Example:</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    In May 2021, Bitcoin crashed over 50%. Traders who had used tight stop-losses (3-5%) 
                    preserved most of their capital, while those with no stop-losses or wide ones suffered 
                    significant losses. This demonstrates why adapting your risk parameters to changing 
                    market conditions is crucial.
                  </p>
                </div>
                
                <Button 
                  onClick={() => markAsCompleted('risk-management-3')} 
                  className="w-full mt-2"
                  variant={completedLessons.includes('risk-management-3') ? "outline" : "default"}
                  size="sm"
                >
                  {completedLessons.includes('risk-management-3') ? "Completed ✓" : "Mark as Completed"}
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md p-4 md:col-span-2">
              <h3 className="font-medium mb-3">Risk Management Exercises</h3>
              
              <div className="space-y-4 text-sm">
                <p>Complete these exercises to better understand risk management:</p>
                
                <div className="space-y-2">
                  <p className="font-medium">Exercise 1: Maximum Loss Calculation</p>
                  <p className="text-xs text-muted-foreground">
                    If you have a $10,000 portfolio and want to risk no more than 2% per trade,
                    calculate your maximum loss per trade and determine your position size for 
                    a Bitcoin trade with a 5% stop-loss.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Exercise 2: Risk-Reward Scenarios</p>
                  <p className="text-xs text-muted-foreground">
                    Practice setting up trades with different risk-reward ratios (1:2, 1:3, 1:4)
                    and calculate the win rate needed to be profitable for each scenario.
                  </p>
                </div>
                
                <Button 
                  onClick={() => markAsCompleted('risk-management-4')} 
                  className="w-full mt-4"
                  variant={completedLessons.includes('risk-management-4') ? "outline" : "default"}
                >
                  {completedLessons.includes('risk-management-4') ? "Exercises Completed ✓" : "Mark Exercises as Completed"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setActiveSection('strategy-basics')} className="gap-2">
              Previous Section
            </Button>
            <Button variant="default" onClick={() => setActiveSection('getting-started')} className="gap-2">
              Return to Beginning
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningPath;
