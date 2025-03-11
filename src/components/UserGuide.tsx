
import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  AlertCircle, 
  Terminal, 
  Sparkles, 
  Wrench, 
  Code, 
  PenTool, 
  Play, 
  FileText,
  BarChart2,
  TrendingUp as TrendingUpIcon,
  RefreshCw,
  DollarSign as DollarSignIcon,
  BookOpen,
  GraduationCap,
  LineChart,
  Activity,
  Rocket,
  Key,
  Compass,
  Flag,
  CheckCircle,
  Info,
  HelpCircle,
  Lightbulb,
  List
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const UserGuide = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Market Sorcerer User Guide</h1>
        <p className="text-muted-foreground">
          A comprehensive guide to setting up, testing, and customizing your automated trading bot.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Always use test mode when starting with a new strategy. Never trade with funds you cannot afford to lose.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="getting-started">
            <Rocket className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Getting Started</span>
            <span className="md:hidden">Start</span>
          </TabsTrigger>
          <TabsTrigger value="learn">
            <GraduationCap className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Learning Path</span>
            <span className="md:hidden">Learn</span>
          </TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Setup Guide
              </CardTitle>
              <CardDescription>
                Follow these steps to set up your automated trading bot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                  <h3 className="font-medium text-lg flex items-center gap-2 mb-4">
                    <Flag className="h-5 w-5" />
                    Step 1: Connect Exchange Account
                  </h3>
                  <ol className="list-decimal pl-5 space-y-3 text-sm">
                    <li className="mb-3">
                      <span className="font-medium">Create API Keys on your Exchange</span>
                      <p className="text-muted-foreground mt-1">
                        Log in to your exchange account and navigate to the API management section to create a new API key pair.
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Set Proper Permissions</span>
                      <p className="text-muted-foreground mt-1">
                        For testing, enable "Read" permissions only. When ready for live trading, add "Trading" permissions but never enable "Withdrawal" permissions.
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Add IP Restrictions</span>
                      <p className="text-muted-foreground mt-1">
                        For enhanced security, restrict API access to your specific IP address if available.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Add API Keys to Market Sorcerer</span>
                      <p className="text-muted-foreground mt-1">
                        In the application, click the "Settings" button and navigate to the "Exchanges" tab. Add your API key pair and label it appropriately.
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                  <h3 className="font-medium text-lg flex items-center gap-2 mb-4">
                    <Compass className="h-5 w-5" />
                    Step 2: Select Trading Strategy
                  </h3>
                  <ol className="list-decimal pl-5 space-y-3 text-sm">
                    <li className="mb-3">
                      <span className="font-medium">Choose a Strategy Type</span>
                      <p className="text-muted-foreground mt-1">
                        In the Settings panel, go to the "Strategies" tab. Browse through available strategies and select one that matches your trading style and risk tolerance.
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Configure Strategy Parameters</span>
                      <p className="text-muted-foreground mt-1">
                        Adjust the default settings as needed. Parameters may include indicator periods, signal thresholds, and timeframes.
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Select Trading Pairs</span>
                      <p className="text-muted-foreground mt-1">
                        Choose which cryptocurrency pairs your strategy will trade (e.g., BTC/USDT, ETH/USDT).
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Save Your Configuration</span>
                      <p className="text-muted-foreground mt-1">
                        Don't forget to save your strategy settings before proceeding to the next step.
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                  <h3 className="font-medium text-lg flex items-center gap-2 mb-4">
                    <Key className="h-5 w-5" />
                    Step 3: Configure Risk Parameters
                  </h3>
                  <ol className="list-decimal pl-5 space-y-3 text-sm">
                    <li className="mb-3">
                      <span className="font-medium">Set Position Size</span>
                      <p className="text-muted-foreground mt-1">
                        In the Settings panel, navigate to the "Risk Management" tab. Define how much capital to allocate per trade (fixed amount or percentage).
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Configure Stop-Loss Settings</span>
                      <p className="text-muted-foreground mt-1">
                        Set up automatic stop-losses to limit potential losses. This can be a fixed percentage, dollar amount, or based on technical levels.
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Set Take-Profit Levels</span>
                      <p className="text-muted-foreground mt-1">
                        Configure when the bot should lock in profits. Consider using multiple take-profit levels to maximize returns.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Set Maximum Positions</span>
                      <p className="text-muted-foreground mt-1">
                        Limit the number of concurrent open positions to manage overall portfolio risk.
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                  <h3 className="font-medium text-lg flex items-center gap-2 mb-4">
                    <Play className="h-5 w-5" />
                    Step 4: Start Trading
                  </h3>
                  <ol className="list-decimal pl-5 space-y-3 text-sm">
                    <li className="mb-3">
                      <span className="font-medium">Verify Settings</span>
                      <p className="text-muted-foreground mt-1">
                        Double-check all your configurations before starting the bot.
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Start in Test Mode First</span>
                      <p className="text-muted-foreground mt-1">
                        Always begin with paper trading or a small amount to verify the strategy works as expected.
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="font-medium">Activate the Bot</span>
                      <p className="text-muted-foreground mt-1">
                        Click the "Start Bot" button in the main dashboard to begin automated trading.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Monitor Performance</span>
                      <p className="text-muted-foreground mt-1">
                        Regularly check the dashboard and active trades to monitor performance. Adjust strategy parameters if needed.
                      </p>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Quick Start Checklist
                </h3>
                <ul className="pl-5 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Create and connect exchange API keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Select and configure a trading strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Set up risk management parameters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Start with test mode or small position sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Activate the bot and monitor performance</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <Alert className="bg-muted border-muted-foreground/20">
                  <HelpCircle className="h-4 w-4" />
                  <AlertTitle>Need Help?</AlertTitle>
                  <AlertDescription className="flex flex-col gap-2">
                    <p>If you encounter any issues during setup, check the following resources:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Detailed documentation for each exchange in the "Advanced" tab</li>
                      <li>Troubleshooting guide for common connection problems</li>
                      <li>Community forums for peer assistance and strategy sharing</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Understanding the Dashboard
              </CardTitle>
              <CardDescription>
                Navigate the Market Sorcerer interface effectively
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Dashboard Components</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Market Overview</p>
                      <p className="text-muted-foreground">Displays current market data for selected trading pairs, including price, 24h change, and volume.</p>
                    </li>
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Performance Metrics</p>
                      <p className="text-muted-foreground">Shows bot trading performance including profit/loss, win rate, and number of trades.</p>
                    </li>
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Price Chart</p>
                      <p className="text-muted-foreground">Interactive chart displaying price history and technical indicators for selected assets.</p>
                    </li>
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Active Trades</p>
                      <p className="text-muted-foreground">Lists all currently open positions with entry price, current price, and profit/loss.</p>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Key Controls & Navigation</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Start/Stop Button</p>
                      <p className="text-muted-foreground">Toggles the bot's active trading status. Green when inactive, red when actively trading.</p>
                    </li>
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Settings Button</p>
                      <p className="text-muted-foreground">Opens the configuration panel for exchanges, strategies, and risk management.</p>
                    </li>
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Tab Navigation</p>
                      <p className="text-muted-foreground">Switch between Dashboard, Trades, History, and Guide sections using the tabs at the top.</p>
                    </li>
                    <li className="border-l-2 border-primary pl-3 py-1">
                      <p className="font-medium">Timeframe Selector</p>
                      <p className="text-muted-foreground">Change the chart timeframe (1m, 5m, 15m, 1h, 4h, 1d) to view different trading intervals.</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Interpreting Signals & Alerts</h3>
                <p className="text-sm mb-3">The Dashboard displays various signals to help you understand the bot's decision-making:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      Trading Signals
                    </h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span><strong>Green:</strong> Buy signal detected</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span><strong>Red:</strong> Sell signal detected</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span><strong>Yellow:</strong> Potential setup forming</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span><strong>Blue:</strong> Market condition filter active</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <List className="h-4 w-4 text-blue-500" />
                      Status Indicators
                    </h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span><strong>Green Badge:</strong> Connection active</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span><strong>Red Badge:</strong> Connection error</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span><strong>Yellow Badge:</strong> Warning or limited functionality</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                        <span><strong>Gray Badge:</strong> Inactive or disabled</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Trading Fundamentals Learning Path
              </CardTitle>
              <CardDescription>
                Master the basics of trading with our structured learning path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level 1: Basics */}
              <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                <h3 className="font-medium text-lg flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5" />
                  Level 1: Trading Fundamentals
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">1. Understanding Market Basics</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>What moves cryptocurrency prices?
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Supply and demand dynamics</li>
                          <li>Market sentiment and news impact</li>
                          <li>Technical vs fundamental analysis</li>
                        </ul>
                      </li>
                      <li>Different types of orders
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Market orders vs limit orders</li>
                          <li>Stop-loss and take-profit orders</li>
                          <li>OCO (One Cancels Other) orders</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">2. Risk Management Fundamentals</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Position sizing principles
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Never risk more than 1-2% per trade</li>
                          <li>Calculate position size based on stop loss</li>
                          <li>Account for market volatility</li>
                        </ul>
                      </li>
                      <li>Setting stop losses
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Technical levels for stop placement</li>
                          <li>Using ATR for stop loss calculation</li>
                          <li>Trailing stops vs fixed stops</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Level 2: Technical Analysis */}
              <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                <h3 className="font-medium text-lg flex items-center gap-2 mb-2">
                  <LineChart className="h-5 w-5" />
                  Level 2: Technical Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">1. Chart Patterns & Price Action</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Support and Resistance
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Identifying key price levels</li>
                          <li>Multiple timeframe analysis</li>
                          <li>Dynamic vs static levels</li>
                        </ul>
                      </li>
                      <li>Common chart patterns
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Head and shoulders patterns</li>
                          <li>Double tops and bottoms</li>
                          <li>Triangle patterns and wedges</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">2. Technical Indicators</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Trend indicators
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Moving averages and crossovers</li>
                          <li>MACD for trend confirmation</li>
                          <li>ADX for trend strength</li>
                        </ul>
                      </li>
                      <li>Momentum indicators
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>RSI and stochastic oscillators</li>
                          <li>Combining momentum with trend</li>
                          <li>Divergence patterns</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Level 3: Advanced Topics */}
              <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                <h3 className="font-medium text-lg flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5" />
                  Level 3: Advanced Trading
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">1. Market Psychology</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Understanding market cycles
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Fear and greed cycles</li>
                          <li>Market sentiment indicators</li>
                          <li>Volume analysis and trends</li>
                        </ul>
                      </li>
                      <li>Trading psychology
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Emotional control in trading</li>
                          <li>Building and following a plan</li>
                          <li>Handling wins and losses</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">2. Strategy Development</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Creating a trading plan
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Defining entry and exit rules</li>
                          <li>Position sizing strategy</li>
                          <li>Risk management rules</li>
                        </ul>
                      </li>
                      <li>Backtesting and optimization
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                          <li>Historical performance analysis</li>
                          <li>Parameter optimization</li>
                          <li>Forward testing methods</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Learning Path Progression</AlertTitle>
                <AlertDescription>
                  Complete each level before moving to the next. Practice concepts in a paper trading environment until you consistently achieve positive results.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Trading Strategy Types
              </CardTitle>
              <CardDescription>
                Learn about different strategy types available in Market Sorcerer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4" />
                      <span>Momentum Strategies</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-6">
                      <p>
                        Momentum strategies use technical indicators to identify overbought and oversold conditions
                        in the market. The bot will buy when the market is oversold and sell when it's overbought.
                      </p>
                      <h4 className="font-medium mt-2">Key Parameters:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>RSI Period:</strong> Number of periods used to calculate RSI (typically 14)</li>
                        <li><strong>Overbought Level:</strong> RSI level above which the market is considered overbought (typically 70)</li>
                        <li><strong>Oversold Level:</strong> RSI level below which the market is considered oversold (typically 30)</li>
                        <li><strong>Timeframe:</strong> The candlestick interval used for calculations</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <span>Trend Following Strategies</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-6">
                      <p>
                        These strategies aim to capture gains by following market trends. Using moving average
                        crossovers, the bot buys when a shorter period MA crosses above a longer period MA
                        (bullish) and sells when it crosses below (bearish).
                      </p>
                      <h4 className="font-medium mt-2">Key Parameters:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Fast MA Period:</strong> Period for the shorter moving average (e.g., 50)</li>
                        <li><strong>Slow MA Period:</strong> Period for the longer moving average (e.g., 200)</li>
                        <li><strong>MA Type:</strong> Type of moving average (Simple, Exponential, etc.)</li>
                        <li><strong>Timeframe:</strong> The candlestick interval used for calculations</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Mean Reversion & Volatility Strategies</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-6">
                      <p>
                        These strategies use Bollinger Bands and other volatility indicators to identify
                        price extremes and trade on the expectation that prices will revert to the mean.
                      </p>
                      <h4 className="font-medium mt-2">Key Parameters:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>BB Period:</strong> Number of periods for Bollinger Band calculation (typically 20)</li>
                        <li><strong>Standard Deviation:</strong> Multiplier for standard deviation (typically 2)</li>
                        <li><strong>Entry Threshold:</strong> How close to the bands price must be to trigger entry</li>
                        <li><strong>Exit at Middle Band:</strong> Whether to exit when price reaches the middle band</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <DollarSignIcon className="h-4 w-4" />
                      <span>Dollar Cost Averaging (DCA)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-6">
                      <p>
                        DCA is a passive investment strategy that buys a fixed dollar amount of an asset
                        at regular intervals, regardless of price. This reduces the impact of volatility.
                      </p>
                      <h4 className="font-medium mt-2">Key Parameters:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Interval:</strong> How often to make purchases (daily, weekly, monthly)</li>
                        <li><strong>Investment Amount:</strong> Fixed amount to invest each time</li>
                        <li><strong>Target Asset:</strong> Cryptocurrency to purchase</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Configuring Strategy Parameters
              </CardTitle>
              <CardDescription>
                How to optimize your strategy parameters for better performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Strategy parameters should be adjusted based on the asset's volatility, market conditions,
                and your risk tolerance. Here are some guidelines for each strategy type:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">For Momentum (RSI) Strategies:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Higher volatility assets:</strong> Use wider RSI bands (e.g., 20/80 instead of 30/70)</li>
                    <li><strong>Lower timeframes:</strong> Generally more noisy, may need adjusted thresholds</li>
                    <li><strong>Trending markets:</strong> RSI can remain overbought/oversold for extended periods</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">For Moving Average Strategies:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Adjust MA periods:</strong> Shorter for faster signals, longer for fewer false signals</li>
                    <li><strong>Consider using EMA:</strong> Reacts faster to recent price changes than SMA</li>
                    <li><strong>Add confirmation indicators:</strong> Volume, MACD, or other trend confirmation tools</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="bg-accent">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Best Practice</AlertTitle>
                <AlertDescription>
                  Always backtest your parameter changes before trading with real funds. Small changes can significantly impact performance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Backtesting Your Strategy
              </CardTitle>
              <CardDescription>
                Test your strategy against historical data before trading live
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal pl-5 space-y-2">
                <li>Select the strategy you wish to test from the Strategies tab</li>
                <li>Click on the "Backtest" button in the strategy card</li>
                <li>Set the testing parameters:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Date Range:</strong> Historical period to test against</li>
                    <li><strong>Initial Capital:</strong> Starting amount for the test</li>
                    <li><strong>Position Size:</strong> Amount or percentage per trade</li>
                    <li><strong>Fees:</strong> Trading fees to simulate real conditions</li>
                  </ul>
                </li>
                <li>Click "Run Backtest" and wait for the results</li>
                <li>Analyze the performance metrics:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Total Return:</strong> Overall performance</li>
                    <li><strong>Sharpe Ratio:</strong> Risk-adjusted performance</li>
                    <li><strong>Maximum Drawdown:</strong> Largest peak-to-trough decline</li>
                    <li><strong>Win Rate:</strong> Percentage of profitable trades</li>
                  </ul>
                </li>
              </ol>
              
              <div className="bg-muted p-4 rounded-md text-sm">
                <h4 className="font-medium mb-2">Interpreting Backtest Results:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Good Sharpe Ratio:</strong> Above 1.0 is acceptable, above 2.0 is excellent</li>
                  <li><strong>Manageable Drawdown:</strong> Maximum drawdown should align with your risk tolerance</li>
                  <li><strong>Consistent Performance:</strong> Check if the strategy performs well across different market conditions</li>
                  <li><strong>Trade Frequency:</strong> More trades means more fees, but potentially more opportunities</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Paper Trading
              </CardTitle>
              <CardDescription>
                Trading with simulated money in real-time market conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Paper trading allows you to test your strategy in real-time market conditions without risking real money.
                It's the final step before live trading.
              </p>
              
              <h4 className="font-medium mb-2">How to Paper Trade:</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Connect your exchange with API keys as described in "Getting Started"</li>
                <li>Make sure "Test Mode" is enabled when configuring your API keys</li>
                <li>Activate your chosen strategy</li>
                <li>Start the bot by clicking the "Start Bot" button</li>
                <li>Monitor performance in the dashboard and active trades tab</li>
              </ol>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Paper trade for at least 2-4 weeks before considering live trading. This ensures your strategy is tested in various market conditions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
              <CardDescription>
                Fine-tuning your trading bot for optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Risk Management Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-4">
                      <p>
                        Proper risk management is crucial for long-term success. Configure these settings in the Risk Management panel:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Position Sizing:</strong> Never risk more than 1-2% of your portfolio on a single trade.
                          You can set this as a fixed amount or a percentage of your total capital.
                        </li>
                        <li>
                          <strong>Stop Loss:</strong> Always use stop losses to limit potential losses. Recommended
                          setting is 2-3x the average true range (ATR) of the asset.
                        </li>
                        <li>
                          <strong>Take Profit:</strong> Set target levels for profit-taking. Consider using multiple
                          targets to secure partial profits while letting winners run.
                        </li>
                        <li>
                          <strong>Maximum Open Positions:</strong> Limit the number of simultaneous trades to
                          manage overall portfolio risk.
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Multi-Strategy Implementation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-4">
                      <p>
                        Running multiple strategies simultaneously can improve overall performance by diversifying your approach:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Complementary Strategies:</strong> Combine trend-following with counter-trend strategies
                          to perform well in different market conditions.
                        </li>
                        <li>
                          <strong>Asset Allocation:</strong> Assign different portions of your capital to different strategies
                          based on their historical performance and risk.
                        </li>
                        <li>
                          <strong>Correlation Analysis:</strong> Ensure your strategies aren't highly correlated to
                          prevent simultaneous drawdowns.
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Market Condition Filters</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pl-4">
                      <p>
                        Add filters to your strategies to only trade in favorable market conditions:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Volatility Filter:</strong> Avoid trading during extreme volatility by using ATR or 
                          Bollinger Band Width thresholds.
                        </li>
                        <li>
                          <strong>Volume Filter:</strong> Ensure sufficient market liquidity by setting minimum volume requirements.
                        </li>
                        <li>
                          <strong>Trend Filter:</strong> Use higher timeframe trend detection to only trade in the direction
                          of the major trend.
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5" />
                Troubleshooting Common Issues
              </CardTitle>
              <CardDescription>
                Solutions to common problems you might encounter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Bot Not Executing Trades</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Verify API keys have proper trading permissions</li>
                    <li>Check if your strategy conditions are too restrictive</li>
                    <li>Ensure you have sufficient balance in your account</li>
                    <li>Confirm the strategy is activated</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Strategy Performing Poorly</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Review market conditions - strategy may not suit current market</li>
                    <li>Adjust parameters based on recent backtest results</li>
                    <li>Check for any correlation between multiple active strategies</li>
                    <li>Consider implementing additional filters for trade quality</li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Connection Issues</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Ensure stable internet connection</li>
                    <li>Verify exchange API is operational (check exchange status page)</li>
                    <li>Try reconnecting the exchange</li>
                    <li>Check API rate limits haven't been exceeded</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserGuide;
