
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
  Activity
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

      <Tabs defaultValue="learn" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="learn">
            <GraduationCap className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Learning Path</span>
            <span className="md:hidden">Learn</span>
          </TabsTrigger>
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="learn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Trading Fundamentals Learning Path
              </CardTitle>
              <CardDescription>
                Start here if you're new to trading or need guidance on parameter settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* First-time setup section */}
              <div className="bg-accent/50 rounded-lg p-4 border border-accent">
                <h3 className="font-medium text-lg flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5" />
                  First-Time Setup Walkthrough
                </h3>
                <p className="mb-4 text-sm">
                  Follow this step-by-step guide to get started with paper trading (practice mode with no real money)
                </p>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="pb-2">
                    <strong>Connect to paper trading account:</strong>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      <li>Click "Settings" in the top navigation</li>
                      <li>Select "Exchanges" tab and choose any exchange</li>
                      <li>Check "Enable Test Mode" to use paper trading</li>
                      <li>Enter API keys (follow exchange-specific instructions)</li>
                    </ul>
                  </li>
                  <li className="pb-2">
                    <strong>Start with the simplest strategy:</strong>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      <li>Select "Moving Average Crossover" from the strategies list</li>
                      <li>Use the recommended default settings</li>
                      <li>Focus on BTC/USDT or ETH/USDT pairs at first</li>
                    </ul>
                  </li>
                  <li className="pb-2">
                    <strong>Set conservative risk parameters:</strong>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      <li>Set stop-loss at 2-3% (lower is safer for beginners)</li>
                      <li>Set take-profit at 5-6% (modest but achievable)</li>
                      <li>Limit position size to 5-10% of your paper funds</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Run in paper mode for at least 30 days</strong> before considering real trading
                  </li>
                </ol>
              </div>
              
              <Separator />
              
              {/* Market conditions and parameters section */}
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5" />
                  Understanding Market Conditions & Parameters
                </h3>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="trending-market">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <TrendingUpIcon className="h-4 w-4" />
                        <span>Trading in Trending Markets</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pl-4">
                        <h4 className="font-medium">How to identify:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Price consistently making higher highs and higher lows (uptrend)</li>
                          <li>Price consistently making lower highs and lower lows (downtrend)</li>
                          <li>Moving averages aligned in direction (shorter above longer in uptrend)</li>
                          <li>Higher trading volumes supporting the trend direction</li>
                        </ul>
                        
                        <h4 className="font-medium mt-3">Recommended strategy settings:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="border rounded-md p-3">
                            <h5 className="text-sm font-medium mb-2">Moving Average Strategy</h5>
                            <ul className="list-disc pl-5 text-sm">
                              <li><strong>Fast MA:</strong> 20-50 periods</li>
                              <li><strong>Slow MA:</strong> 100-200 periods</li>
                              <li><strong>Take profit:</strong> 8-15%</li>
                              <li><strong>Stop loss:</strong> 5-8%</li>
                            </ul>
                          </div>
                          <div className="border rounded-md p-3">
                            <h5 className="text-sm font-medium mb-2">Momentum Strategy</h5>
                            <ul className="list-disc pl-5 text-sm">
                              <li><strong>RSI period:</strong> 14</li>
                              <li><strong>RSI threshold:</strong> 40/60 instead of 30/70</li>
                              <li><strong>Stop loss:</strong> Wider (5-7%)</li>
                              <li><strong>Position size:</strong> Can be increased</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="ranging-market">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4" />
                        <span>Trading in Range-Bound Markets</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pl-4">
                        <h4 className="font-medium">How to identify:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Price oscillating between clear support and resistance levels</li>
                          <li>Moving averages trending horizontally</li>
                          <li>RSI regularly cycling between overbought and oversold</li>
                          <li>Lower trading volumes compared to trending periods</li>
                        </ul>
                        
                        <h4 className="font-medium mt-3">Recommended strategy settings:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="border rounded-md p-3">
                            <h5 className="text-sm font-medium mb-2">RSI Strategy</h5>
                            <ul className="list-disc pl-5 text-sm">
                              <li><strong>RSI period:</strong> 14</li>
                              <li><strong>Overbought:</strong> 70</li>
                              <li><strong>Oversold:</strong> 30</li>
                              <li><strong>Take profit:</strong> Narrower (3-5%)</li>
                              <li><strong>Stop loss:</strong> Tighter (2-3%)</li>
                            </ul>
                          </div>
                          <div className="border rounded-md p-3">
                            <h5 className="text-sm font-medium mb-2">Bollinger Bands Strategy</h5>
                            <ul className="list-disc pl-5 text-sm">
                              <li><strong>Period:</strong> 20</li>
                              <li><strong>Standard Deviation:</strong> 2</li>
                              <li><strong>Take profit:</strong> Set to middle band</li>
                              <li><strong>Position size:</strong> Smaller (3-5%)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="volatile-market">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>Trading in Highly Volatile Markets</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pl-4">
                        <h4 className="font-medium">How to identify:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Large price swings in short time periods</li>
                          <li>Widening Bollinger Bands</li>
                          <li>High trading volumes with price spikes</li>
                          <li>Frequent news events and market uncertainty</li>
                        </ul>
                        
                        <Alert className="my-3">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Beginner Warning</AlertTitle>
                          <AlertDescription>
                            Consider reducing trading activity or sitting out during extremely volatile markets
                            until you gain more experience.
                          </AlertDescription>
                        </Alert>
                        
                        <h4 className="font-medium mt-2">If you must trade, adjust your parameters:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li><strong>Reduce position size</strong> by 50% or more from your normal amount</li>
                          <li><strong>Widen stop losses</strong> to avoid being stopped out by volatility</li>
                          <li><strong>Take profits quicker</strong> when they appear</li>
                          <li><strong>Avoid using leverage</strong> during these periods</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <Separator />
              
              {/* Parameter guide section */}
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5" />
                  Parameter Settings Guide
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-muted rounded-md p-4">
                    <h4 className="font-medium mb-2">Stop Loss Settings</h4>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center border-r pr-2">
                        <div className="text-sm font-medium text-red-500">Tight (1-3%)</div>
                        <div className="text-xs text-muted-foreground">Conservative</div>
                      </div>
                      <div className="text-center border-r pr-2">
                        <div className="text-sm font-medium text-amber-500">Medium (3-7%)</div>
                        <div className="text-xs text-muted-foreground">Balanced</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-blue-500">Wide (7-15%)</div>
                        <div className="text-xs text-muted-foreground">Aggressive</div>
                      </div>
                    </div>
                    <p className="text-sm mb-2">
                      <strong>When to use tight stops (1-3%):</strong>
                    </p>
                    <ul className="list-disc pl-5 text-xs space-y-1 mb-2">
                      <li>Trading in stable, range-bound markets</li>
                      <li>When you have high confidence in entry points</li>
                      <li>When protecting profits on winning trades</li>
                      <li>For beginners wanting to minimize losses</li>
                    </ul>
                    <p className="text-sm mb-2">
                      <strong>When to use wider stops (7-15%):</strong>
                    </p>
                    <ul className="list-disc pl-5 text-xs space-y-1">
                      <li>During higher volatility periods</li>
                      <li>When trading longer timeframes</li>
                      <li>For trend-following strategies in strong trends</li>
                      <li>When trading less liquid markets</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-md p-4">
                    <h4 className="font-medium mb-2">Position Size Settings</h4>
                    <p className="text-sm mb-3">
                      Proper position sizing is one of the most important skills in trading:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-1">For Beginners (1-5% per trade)</h5>
                        <ul className="list-disc pl-5 text-xs space-y-1">
                          <li>Minimizes impact of early mistakes</li>
                          <li>Allows time to learn without large drawdowns</li>
                          <li>Recommended for first 3-6 months</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-1">For Intermediate (5-10% per trade)</h5>
                        <ul className="list-disc pl-5 text-xs space-y-1">
                          <li>Balance between risk and potential returns</li>
                          <li>Suitable after establishing consistent results</li>
                          <li>Consider reducing during uncertain markets</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-1">Adjusting for Market Conditions:</h5>
                      <ul className="list-disc pl-5 text-xs space-y-1">
                        <li><strong>Trending Market:</strong> Can increase position size slightly if trend is clear</li>
                        <li><strong>Ranging Market:</strong> Standard position sizing works well</li>
                        <li><strong>Volatile Market:</strong> Reduce position size by 50% or more</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Real examples section */}
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2 mb-3">
                  <Play className="h-5 w-5" />
                  Learning Through Examples
                </h3>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Example 1: Bitcoin Bull Run</h4>
                    <p className="text-sm mb-2">
                      <strong>Market condition:</strong> Strong upward trend with higher highs and higher lows
                    </p>
                    <div className="text-sm mb-3">
                      <strong className="block mb-1">Optimal Parameter Settings:</strong>
                      <ul className="list-disc pl-5 text-xs space-y-1">
                        <li><strong>Strategy:</strong> Trend following (Moving Average Crossover)</li>
                        <li><strong>Fast MA / Slow MA:</strong> 20/100</li>
                        <li><strong>Stop Loss:</strong> 8% (wider to avoid getting stopped out during normal pullbacks)</li>
                        <li><strong>Take Profit:</strong> 15% or trailing stop</li>
                        <li><strong>Position Size:</strong> 7-10% of capital (can be more aggressive in clear trend)</li>
                      </ul>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      During strong trends, the bot will catch major moves while wider stops prevent being shaken out during normal retracements.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Example 2: Range-Bound Ethereum</h4>
                    <p className="text-sm mb-2">
                      <strong>Market condition:</strong> ETH trading between $1,800-$2,200 for several weeks
                    </p>
                    <div className="text-sm mb-3">
                      <strong className="block mb-1">Optimal Parameter Settings:</strong>
                      <ul className="list-disc pl-5 text-xs space-y-1">
                        <li><strong>Strategy:</strong> RSI or Bollinger Band mean reversion</li>
                        <li><strong>RSI Settings:</strong> 14 period, Buy below 30, Sell above 70</li>
                        <li><strong>Stop Loss:</strong> 3% (tighter as price shouldn't move far from range)</li>
                        <li><strong>Take Profit:</strong> 5% (or near resistance levels)</li>
                        <li><strong>Position Size:</strong> 5% of capital (moderate approach)</li>
                      </ul>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Range-bound markets are ideal for mean-reversion strategies that buy near support and sell near resistance.
                    </p>
                  </div>
                </div>
              </div>
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
