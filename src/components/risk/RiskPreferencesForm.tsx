
import React, { useState } from 'react';
import { RiskPreference } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Save, RefreshCcw } from 'lucide-react';

interface RiskPreferencesFormProps {
  preferences: RiskPreference;
  onUpdate: (preferences: RiskPreference) => void;
}

export const RiskPreferencesForm: React.FC<RiskPreferencesFormProps> = ({ 
  preferences, 
  onUpdate 
}) => {
  const [editedPreferences, setEditedPreferences] = useState<RiskPreference>({...preferences});
  const [isAutoStopLoss, setIsAutoStopLoss] = useState(true);
  const [isAutoHedging, setIsAutoHedging] = useState(false);

  const handleRiskToleranceChange = (value: any) => {
    let newPreferences = { ...editedPreferences, riskToleranceLevel: value };
    
    // Adjust other settings based on risk tolerance
    if (value === 'conservative') {
      newPreferences = {
        ...newPreferences,
        maxDrawdown: 10,
        maxDailyLoss: 3,
        maxPositionSize: 5,
        maxLeverage: 1,
        maxConcentration: 20
      };
    } else if (value === 'moderate') {
      newPreferences = {
        ...newPreferences,
        maxDrawdown: 15,
        maxDailyLoss: 5,
        maxPositionSize: 10,
        maxLeverage: 2,
        maxConcentration: 30
      };
    } else if (value === 'aggressive') {
      newPreferences = {
        ...newPreferences,
        maxDrawdown: 25,
        maxDailyLoss: 8,
        maxPositionSize: 20,
        maxLeverage: 3,
        maxConcentration: 40
      };
    }
    
    setEditedPreferences(newPreferences);
  };

  const handleParameterChange = (param: keyof RiskPreference, value: any) => {
    setEditedPreferences(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleSave = () => {
    onUpdate(editedPreferences);
    toast.success('Risk preferences updated', {
      description: 'Your risk management settings have been saved.'
    });
  };

  const handleReset = () => {
    // Reset to defaults based on current risk tolerance
    handleRiskToleranceChange(editedPreferences.riskToleranceLevel);
    toast.info('Settings reset to defaults', {
      description: `Default values for ${editedPreferences.riskToleranceLevel} risk profile applied.`
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Risk Management Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your risk tolerance and automated risk management features
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Risk Tolerance Profile</CardTitle>
          <CardDescription>
            Select your overall risk tolerance level. This will adjust default settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={editedPreferences.riskToleranceLevel} 
            onValueChange={handleRiskToleranceChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="conservative" id="conservative" />
              <Label htmlFor="conservative" className="font-normal">Conservative</Label>
              <span className="text-xs text-muted-foreground ml-2">
                (Lower returns, minimal risk)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate" className="font-normal">Moderate</Label>
              <span className="text-xs text-muted-foreground ml-2">
                (Balanced risk and return)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="aggressive" id="aggressive" />
              <Label htmlFor="aggressive" className="font-normal">Aggressive</Label>
              <span className="text-xs text-muted-foreground ml-2">
                (Higher returns, significant risk)
              </span>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Risk Parameters</CardTitle>
          <CardDescription>
            Set specific risk limits for your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="max-drawdown">Maximum Drawdown</Label>
              <span className="text-sm">{editedPreferences.maxDrawdown}%</span>
            </div>
            <Slider
              id="max-drawdown"
              min={5}
              max={50}
              step={1}
              value={[editedPreferences.maxDrawdown]}
              onValueChange={([value]) => handleParameterChange('maxDrawdown', value)}
            />
            <p className="text-xs text-muted-foreground">
              Maximum portfolio drawdown before automated risk controls activate
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="max-daily-loss">Maximum Daily Loss</Label>
              <span className="text-sm">{editedPreferences.maxDailyLoss}%</span>
            </div>
            <Slider
              id="max-daily-loss"
              min={1}
              max={15}
              step={0.5}
              value={[editedPreferences.maxDailyLoss]}
              onValueChange={([value]) => handleParameterChange('maxDailyLoss', value)}
            />
            <p className="text-xs text-muted-foreground">
              Maximum allowed daily loss as a percentage of portfolio value
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="max-position-size">Maximum Position Size</Label>
              <span className="text-sm">{editedPreferences.maxPositionSize}%</span>
            </div>
            <Slider
              id="max-position-size"
              min={1}
              max={50}
              step={1}
              value={[editedPreferences.maxPositionSize]}
              onValueChange={([value]) => handleParameterChange('maxPositionSize', value)}
            />
            <p className="text-xs text-muted-foreground">
              Maximum size for any single position as a percentage of portfolio
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="max-leverage">Maximum Leverage</Label>
              <span className="text-sm">{editedPreferences.maxLeverage}x</span>
            </div>
            <Slider
              id="max-leverage"
              min={1}
              max={10}
              step={0.5}
              value={[editedPreferences.maxLeverage]}
              onValueChange={([value]) => handleParameterChange('maxLeverage', value)}
            />
            <p className="text-xs text-muted-foreground">
              Maximum allowed leverage across all positions
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="max-concentration">Maximum Concentration</Label>
              <span className="text-sm">{editedPreferences.maxConcentration}%</span>
            </div>
            <Slider
              id="max-concentration"
              min={5}
              max={50}
              step={1}
              value={[editedPreferences.maxConcentration]}
              onValueChange={([value]) => handleParameterChange('maxConcentration', value)}
            />
            <p className="text-xs text-muted-foreground">
              Maximum concentration in any single asset
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Automated Risk Controls</CardTitle>
          <CardDescription>
            Configure automated risk management features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-stop-loss">Automatic Stop Loss</Label>
              <p className="text-xs text-muted-foreground">
                Automatically set stop losses for all positions
              </p>
            </div>
            <Switch
              id="auto-stop-loss"
              checked={isAutoStopLoss}
              onCheckedChange={setIsAutoStopLoss}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-hedging">Automatic Hedging</Label>
              <p className="text-xs text-muted-foreground">
                Automatically hedge positions when market volatility increases
              </p>
            </div>
            <Switch
              id="auto-hedging"
              checked={isAutoHedging}
              onCheckedChange={setIsAutoHedging}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};
