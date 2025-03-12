
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Trending, AlertTriangle, Trash2, BarChart4, LineChart } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";
import { botMemoryService } from "@/services/botMemoryService";
import { LearningRecommendation, StrategyPerformance } from "@/lib/types/memoryTypes";
import { tradingStrategies } from "@/utils/mockData";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BotLearningInsights: React.FC<{ isRunning?: boolean }> = ({ isRunning = false }) => {
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([]);
  const [performanceData, setPerformanceData] = useState<StrategyPerformance[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTC/USDT");
  const { marketData, getChartData } = useMarketData();
  const [showClearDialog, setShowClearDialog] = useState(false);
  
  const symbols = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT"];
  
  useEffect(() => {
    // Load performance data
    const performance = botMemoryService.getAllPerformanceMetrics();
    setPerformanceData(performance);
    
    // Generate recommendations if we have market data
    const generateRecommendations = async () => {
      try {
        const newRecommendations: LearningRecommendation[] = [];
        
        for (const symbol of symbols) {
          // Get chart data for each symbol to analyze market conditions
          const chartData = await getChartData(symbol);
          if (!chartData || chartData.length === 0) continue;
          
          // Analyze current market conditions
          const currentCondition = botMemoryService.analyzeMarketCondition(symbol, chartData);
          
          // Get recommendation for this symbol and condition
          const recommendation = botMemoryService.getRecommendation(
            symbol,
            currentCondition,
            tradingStrategies
          );
          
          if (recommendation) {
            newRecommendations.push(recommendation);
          }
        }
        
        setRecommendations(newRecommendations);
      } catch (error) {
        console.error('Failed to generate recommendations:', error);
      }
    };
    
    generateRecommendations();
    
    // Refresh periodically if bot is running
    const interval = isRunning ? setInterval(generateRecommendations, 60000) : null;
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, getChartData]);
  
  const clearMemory = () => {
    botMemoryService.clearMemory();
    setPerformanceData([]);
    setRecommendations([]);
    setShowClearDialog(false);
  };
  
  const getStrategyById = (id: string) => {
    return tradingStrategies.find(s => s.id === id) || null;
  };
  
  const getStrategyName = (id: string) => {
    const strategy = getStrategyById(id);
    return strategy ? strategy.name : 'Unknown Strategy';
  };
  
  const getConfidenceBadge = (confidence: number) => {
    if (confidence < 40) {
      return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">Low Confidence</Badge>;
    } else if (confidence < 70) {
      return <Badge variant="outline" className="bg-blue-500/10 text-blue-600">Medium Confidence</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-500/10 text-green-600">High Confidence</Badge>;
    }
  };
  
  const getConditionDescription = (rec: LearningRecommendation) => {
    const { marketCondition } = rec;
    return `${marketCondition.trend.charAt(0).toUpperCase() + marketCondition.trend.slice(1)} trend with ${marketCondition.volatility} volatility and ${marketCondition.volume} volume`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Bot Learning & Insights
        </CardTitle>
        <CardDescription>
          Market Sorcerer's adaptive memory system and strategy recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {performanceData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mb-4 opacity-50" />
            <p className="font-medium">No trading history available</p>
            <p className="text-sm max-w-md mt-1">
              The bot needs to complete trades to build memory and start providing recommendations.
            </p>
          </div>
        ) : (
          <>
            <div>
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <Trending className="h-4 w-4" />
                Strategy Recommendations
              </h3>
              
              {recommendations.length === 0 ? (
                <div className="text-sm text-muted-foreground border rounded-md p-4 bg-accent/50">
                  <p>Not enough data to generate reliable recommendations yet.</p>
                  <p className="mt-1">Continue trading to build the bot's knowledge base.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div key={rec.symbol} className="border rounded-md p-3 hover:border-primary/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{rec.symbol}</div>
                        {getConfidenceBadge(rec.confidence)}
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {getConditionDescription(rec)}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Recommended strategy: </span>
                          <span className="font-medium">{getStrategyName(rec.recommendedStrategy)}</span>
                        </div>
                        
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <BarChart4 className="h-4 w-4" />
                Strategy Performance
              </h3>
              
              <div className="space-y-3">
                {performanceData.slice(0, 3).map((perf) => (
                  <div key={perf.strategyId} className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <div className="font-medium">{getStrategyName(perf.strategyId)}</div>
                      <div className="text-xs text-muted-foreground">
                        {perf.totalTrades} trades, {(perf.profitableTrades / perf.totalTrades * 100).toFixed(1)}% profitable
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="font-medium">
                        {perf.avgProfitPercentage > 0 ? '+' : ''}{perf.avgProfitPercentage.toFixed(2)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg. return per trade
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setShowClearDialog(true)}>
          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
          Reset Memory
        </Button>
        
        <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear Bot Memory</DialogTitle>
              <DialogDescription>
                This will erase all trading history and learned patterns. 
                The bot will need to start learning from scratch.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowClearDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={clearMemory}>
                Clear Memory
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default BotLearningInsights;
