
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Brain, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface BotLearningInsightsProps {
  isRunning: boolean;
}

const BotLearningInsights: React.FC<BotLearningInsightsProps> = ({ isRunning }) => {
  // Mock data for the component
  const learningProgress = 68;
  const recommendations = [
    {
      symbol: "BTCUSDT",
      strategy: "Mean Reversion",
      confidence: 87,
      marketCondition: {
        volatility: "high",
        trend: "sideways"
      }
    },
    {
      symbol: "ETHUSDT",
      strategy: "Trend Following",
      confidence: 72,
      marketCondition: {
        volatility: "medium",
        trend: "bullish"
      }
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          Bot Learning Insights
        </CardTitle>
        <CardDescription>
          AI learning progress and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Learning Progress</span>
            <span className="text-sm text-muted-foreground">{learningProgress}%</span>
          </div>
          <Progress value={learningProgress} className="h-2" />
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center">
            <Zap className="mr-1 h-4 w-4" /> Strategy Recommendations
          </h4>
          
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-md">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{rec.symbol}</span>
                  <Badge variant={rec.confidence > 80 ? "default" : "secondary"}>
                    {rec.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{rec.strategy}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {rec.marketCondition.volatility} volatility
                  </Badge>
                  <Badge variant="outline" className="text-xs flex items-center">
                    {rec.marketCondition.trend === "bullish" && <TrendingUp className="mr-1 h-3 w-3" />}
                    {rec.marketCondition.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="text-xs text-muted-foreground">
          <p>Bot is {isRunning ? "currently collecting and analyzing market data" : "inactive"}</p>
          <p className="mt-1">Learning from {isRunning ? "live" : "historical"} data</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotLearningInsights;
