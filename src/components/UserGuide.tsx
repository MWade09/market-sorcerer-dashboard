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
  DollarSign as DollarSignIcon
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
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Setting Up Your Bot
              </CardTitle>
              <CardDescription>
                Follow these steps to set up and configure your trading bot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-medium text-lg">Step 1: Connect an Exchange</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Click on the "Settings" button in the top navigation</li>
                <li>Select an exchange (Binance, Coinbase, Kraken) to connect</li>
                <li>Create API keys from your exchange account (with trading permissions but <strong>without</strong> withdrawal permissions)</li>
                <li>Enter your API Key and Secret</li>
                <li>Enable test mode to ensure no real trades are executed while testing</li>
                <li>Click "Connect Exchange" to finalize the connection</li>
              </ol>

              <Separator className="my-4" />

              <h3 className="font-medium text-lg">Step 2: Select or Create a Strategy</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Trading Strategies" section</li>
                <li>Choose one of the pre-built strategies or create a new one</li>
                <li>Configure the strategy parameters according to your preferences</li>
                <li>Save the strategy settings</li>
              </ol>

              <Separator className="my-4" />

              <h3 className="font-medium text-lg">Step 3: Start the Bot</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Ensure you have an active exchange connection</li>
                <li>At least one trading strategy is activated</li>
                <li>Click the "Start Bot" button in the top right corner of the dashboard</li>
                <li>Monitor the bot's performance in the dashboard</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dashboard Overview
              </CardTitle>
              <CardDescription>
                Understanding the main dashboard elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Market Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time price charts and market information to track asset performance
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Performance Metrics</h4>
                  <p className="text-sm text-muted-foreground">
                    Key statistics showing your bot's trading performance
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Market Signals</h4>
                  <p className="text-sm text-muted-foreground">
                    Technical indicators that help inform trading decisions
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Active Trades</h4>
                  <p className="text-sm text-muted-foreground">
                    Current open positions and their performance
                  </p>
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
