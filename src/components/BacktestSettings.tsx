
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Play, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";

interface BacktestSettingsProps {
  settings: {
    startDate: Date;
    endDate: Date;
    initialCapital: number;
    useStopLoss: boolean;
    stopLossPercentage: number;
    useTakeProfit: boolean;
    takeProfitPercentage: number;
  };
  onChange: (settings: any) => void;
  onRun: () => void;
  isRunning: boolean;
}

const BacktestSettings: React.FC<BacktestSettingsProps> = ({
  settings,
  onChange,
  onRun,
  isRunning
}) => {
  const handleChange = (key: string, value: any) => {
    onChange({
      ...settings,
      [key]: value
    });
  };
  
  // Format date to YYYY-MM-DD for input
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backtest Settings</CardTitle>
          <CardDescription>Configure parameters for your strategy backtest</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Time Period</h3>
              
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input 
                  id="start-date" 
                  type="date" 
                  value={formatDateForInput(settings.startDate)}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleChange('startDate', new Date(e.target.value));
                    }
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input 
                  id="end-date" 
                  type="date" 
                  value={formatDateForInput(settings.endDate)}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleChange('endDate', new Date(e.target.value));
                    }
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="market-conditions">Market Conditions</Label>
                <Select 
                  value="all"
                  onValueChange={(value) => {
                    // This would adjust the date range based on known market conditions
                    const now = new Date();
                    if (value === "bull") {
                      // Example bull market period
                      handleChange('startDate', new Date(2020, 11, 1));
                      handleChange('endDate', new Date(2021, 3, 30));
                    } else if (value === "bear") {
                      // Example bear market period
                      handleChange('startDate', new Date(2022, 0, 1));
                      handleChange('endDate', new Date(2022, 5, 30));
                    } else if (value === "sideways") {
                      // Example sideways market
                      handleChange('startDate', new Date(2019, 3, 1));
                      handleChange('endDate', new Date(2019, 8, 30));
                    } else if (value === "volatile") {
                      // Example volatile period
                      handleChange('startDate', new Date(2020, 2, 1));
                      handleChange('endDate', new Date(2020, 4, 30));
                    }
                  }}
                >
                  <SelectTrigger id="market-conditions">
                    <SelectValue placeholder="Select market conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="bull">Bull Market</SelectItem>
                    <SelectItem value="bear">Bear Market</SelectItem>
                    <SelectItem value="sideways">Sideways Market</SelectItem>
                    <SelectItem value="volatile">Highly Volatile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-medium">Capital & Risk Management</h3>
              
              <div>
                <Label htmlFor="initial-capital">Initial Capital ($)</Label>
                <Input 
                  id="initial-capital" 
                  type="number" 
                  value={settings.initialCapital}
                  onChange={(e) => handleChange('initialCapital', Number(e.target.value))}
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="use-stop-loss" 
                  checked={settings.useStopLoss}
                  onCheckedChange={(checked) => handleChange('useStopLoss', !!checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="use-stop-loss"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Use Stop Loss
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically close losing positions at a specified threshold
                  </p>
                </div>
              </div>
              
              {settings.useStopLoss && (
                <div>
                  <Label htmlFor="stop-loss-percentage">Stop Loss Percentage</Label>
                  <Input 
                    id="stop-loss-percentage" 
                    type="number" 
                    value={settings.stopLossPercentage}
                    onChange={(e) => handleChange('stopLossPercentage', Number(e.target.value))}
                  />
                </div>
              )}
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="use-take-profit" 
                  checked={settings.useTakeProfit}
                  onCheckedChange={(checked) => handleChange('useTakeProfit', !!checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="use-take-profit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Use Take Profit
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically close winning positions at a specified threshold
                  </p>
                </div>
              </div>
              
              {settings.useTakeProfit && (
                <div>
                  <Label htmlFor="take-profit-percentage">Take Profit Percentage</Label>
                  <Input 
                    id="take-profit-percentage" 
                    type="number" 
                    value={settings.takeProfitPercentage}
                    onChange={(e) => handleChange('takeProfitPercentage', Number(e.target.value))}
                  />
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Backtesting uses historical data to simulate strategy performance. Past performance is not indicative of future results.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-end">
            <Button 
              onClick={onRun}
              disabled={isRunning}
              className="gap-2"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Running Backtest...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Backtest
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BacktestSettings;
