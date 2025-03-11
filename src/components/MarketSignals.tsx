
import { Badge } from "@/components/ui/badge";
import { ProgressWithIndicator } from "@/components/ui/progress-with-indicator";
import { Separator } from "@/components/ui/separator";

const MarketSignals = () => {
  const signals = [
    { name: "RSI (14)", value: 62, interpretation: "neutral", min: 0, max: 100, overBought: 70, overSold: 30 },
    { name: "MACD", value: 0.0025, interpretation: "bullish", signal: 0.0010, histogram: 0.0015 },
    { name: "Bollinger Bands", value: "Middle", interpretation: "neutral", width: 2.5 },
    { name: "Moving Avg (50/200)", value: "Above", interpretation: "bullish", ma50: 36400, ma200: 35800 },
    { name: "Stochastic (14,3,3)", value: 75, interpretation: "bullish", k: 75, d: 65 },
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
            <div className="font-medium">{signal.name}</div>
            <Badge variant="outline" className={getSignalColor(signal.interpretation)}>
              {signal.interpretation}
            </Badge>
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
          
          {index < signals.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
    </div>
  );
};

export default MarketSignals;
