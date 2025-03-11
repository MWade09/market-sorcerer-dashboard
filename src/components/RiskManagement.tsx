
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, TrendingUp } from "lucide-react";

const RiskManagement = () => {
  const [stopLoss, setStopLoss] = useState(5);
  const [takeProfit, setTakeProfit] = useState(10);
  const [trailingStop, setTrailingStop] = useState(2);
  const [useTrailingStop, setUseTrailingStop] = useState(true);
  const [maxPosition, setMaxPosition] = useState(10);
  
  const entryPrice = 36789.45;
  const calculatedStopLoss = entryPrice * (1 - stopLoss / 100);
  const calculatedTakeProfit = entryPrice * (1 + takeProfit / 100);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="stop-loss">Stop Loss</Label>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="mr-1 h-3 w-3" /> -{stopLoss}%
          </Badge>
        </div>
        <Slider
          id="stop-loss"
          min={1}
          max={15}
          step={0.5}
          value={[stopLoss]}
          onValueChange={(value) => setStopLoss(value[0])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>-1%</span>
          <span>-15%</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          ${calculatedStopLoss.toFixed(2)}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="take-profit">Take Profit</Label>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <TrendingUp className="mr-1 h-3 w-3" /> +{takeProfit}%
          </Badge>
        </div>
        <Slider
          id="take-profit"
          min={2}
          max={30}
          step={0.5}
          value={[takeProfit]}
          onValueChange={(value) => setTakeProfit(value[0])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>+2%</span>
          <span>+30%</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          ${calculatedTakeProfit.toFixed(2)}
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="trailing-stop" className="cursor-pointer">Trailing Stop</Label>
          <div className="text-sm text-muted-foreground">Adjusts as price moves in your favor</div>
        </div>
        <Switch
          id="trailing-stop"
          checked={useTrailingStop}
          onCheckedChange={setUseTrailingStop}
        />
      </div>

      {useTrailingStop && (
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <Label htmlFor="trailing-value">Trailing Value</Label>
            <span className="text-sm">{trailingStop}%</span>
          </div>
          <Slider
            id="trailing-value"
            min={0.5}
            max={5}
            step={0.1}
            value={[trailingStop]}
            onValueChange={(value) => setTrailingStop(value[0])}
            disabled={!useTrailingStop}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5%</span>
            <span>5%</span>
          </div>
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="max-position">Max Position Size (% of capital)</Label>
        <div className="flex gap-2">
          <Slider
            id="max-position"
            min={1}
            max={50}
            step={1}
            value={[maxPosition]}
            onValueChange={(value) => setMaxPosition(value[0])}
            className="flex-1"
          />
          <Input 
            type="number" 
            value={maxPosition}
            onChange={(e) => setMaxPosition(Number(e.target.value))}
            className="w-16"
            min={1}
            max={50}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="outline" className="w-full">Update Risk Settings</Button>
      </div>
    </div>
  );
};

export default RiskManagement;
