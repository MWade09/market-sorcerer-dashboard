
import { Badge } from "@/components/ui/badge";
import { ProgressWithIndicator } from "@/components/ui/progress-with-indicator";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MarketSignals = () => {
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);
  
  const toggleSignalInfo = (signalName: string) => {
    if (expandedSignal === signalName) {
      setExpandedSignal(null);
    } else {
      setExpandedSignal(signalName);
    }
  };

  const signals = [
    { 
      name: "RSI (14)", 
      value: 62, 
      interpretation: "neutral", 
      min: 0, 
      max: 100, 
      overBought: 70, 
      overSold: 30,
      description: "Relative Strength Index measures the speed and change of price movements on a scale of 0-100.",
      howToUse: "Values above 70 indicate overbought conditions (potential sell), while values below 30 indicate oversold conditions (potential buy).",
      tradingTips: "RSI works best in ranging markets. In strong trends, RSI can remain overbought/oversold for extended periods."
    },
    { 
      name: "MACD", 
      value: 0.0025, 
      interpretation: "bullish", 
      signal: 0.0010, 
      histogram: 0.0015,
      description: "Moving Average Convergence Divergence shows the relationship between two moving averages of a security's price.",
      howToUse: "A bullish signal occurs when the MACD line crosses above the signal line, bearish when it crosses below.",
      tradingTips: "The histogram represents momentum - widening bars suggest strengthening trend, narrowing bars indicate weakening trend."
    },
    { 
      name: "Bollinger Bands", 
      value: "Middle", 
      interpretation: "neutral", 
      width: 2.5,
      description: "Three lines showing price volatility - a middle band (20-period MA) with upper and lower bands at 2 standard deviations.",
      howToUse: "Price reaching upper band may indicate overbought conditions, while touching lower band may signal oversold conditions.",
      tradingTips: "Band squeezes (narrowing) often precede significant price breakouts. Direction is unpredictable until confirmed."
    },
    { 
      name: "Moving Avg (50/200)", 
      value: "Above", 
      interpretation: "bullish", 
      ma50: 36400, 
      ma200: 35800,
      description: "Shows the relationship between short and long-term moving averages, indicating market trends.",
      howToUse: "When the 50-day MA crosses above the 200-day MA (golden cross), it signals a potential bullish trend. The opposite (death cross) signals bearish sentiment.",
      tradingTips: "MA crossovers work best in trending markets and may generate false signals in sideways/ranging markets."
    },
    { 
      name: "Stochastic (14,3,3)", 
      value: 75, 
      interpretation: "bullish", 
      k: 75, 
      d: 65,
      description: "Stochastic oscillator compares a security's closing price to its price range over a specific period, shown as %K and %D lines.",
      howToUse: "Values above 80 indicate overbought conditions, while values below 20 indicate oversold conditions. When %K crosses above %D, it's a bullish signal.",
      tradingTips: "Like RSI, stochastics can remain overbought/oversold during strong trends. Best used with trend confirmation tools."
    },
  ];

  const getSignalColor = (interpretation: string) => {
    switch (interpretation) {
      case "bullish": return "bg-green-100 text-green-800 border-green-200";
      case "bearish": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRsiIndicatorClass = (value: number) => {
    if (value >= 70) return "bg-red-500";
    if (value <= 30) return "bg-green-500";
    return "bg-yellow-500";
  };

  return (
    <div className="space-y-4">
      {signals.map((signal, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="font-medium flex items-center">
              {signal.name}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 p-0">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p className="text-sm">{signal.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getSignalColor(signal.interpretation)}>
                {signal.interpretation}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={() => toggleSignalInfo(signal.name)}
              >
                {expandedSignal === signal.name ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {signal.name === "RSI (14)" && (
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground flex justify-between">
                <span>Oversold</span>
                <span>{signal.value}</span>
                <span>Overbought</span>
              </div>
              <ProgressWithIndicator 
                value={typeof signal.value === 'string' ? parseFloat(signal.value) : signal.value} 
                max={signal.max}
                className="h-2" 
                indicatorClassName={getRsiIndicatorClass(
                  typeof signal.value === 'string' ? parseFloat(signal.value) : signal.value
                )}
              />
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>{signal.min}</span>
                <span>{signal.max}</span>
              </div>
            </div>
          )}
          
          {signal.name !== "RSI (14)" && (
            <div className="text-sm">
              {signal.name === "MACD" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>Signal: {signal.signal}</div>
                  <div>Histogram: {signal.histogram}</div>
                </div>
              )}
              
              {signal.name === "Bollinger Bands" && (
                <div>Width: {signal.width} (Current: {signal.value})</div>
              )}
              
              {signal.name === "Moving Avg (50/200)" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>MA50: ${signal.ma50}</div>
                  <div>MA200: ${signal.ma200}</div>
                </div>
              )}
              
              {signal.name === "Stochastic (14,3,3)" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>%K: {signal.k}</div>
                  <div>%D: {signal.d}</div>
                </div>
              )}
            </div>
          )}
          
          {expandedSignal === signal.name && (
            <div className="mt-2 bg-muted p-3 rounded-md text-sm space-y-2">
              <div>
                <h4 className="font-semibold mb-1">How to Use:</h4>
                <p className="text-xs">{signal.howToUse}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Trading Tips:</h4>
                <p className="text-xs">{signal.tradingTips}</p>
              </div>
            </div>
          )}
          
          {index < signals.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
    </div>
  );
};

export default MarketSignals;
