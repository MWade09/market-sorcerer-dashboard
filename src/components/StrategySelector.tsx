
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  Shuffle, 
  DollarSign, 
  Plus,
  PlayCircle,
  PauseCircle,
  Settings,
  ArrowRight,
  AlertTriangle,
  Save,
  Brain,
  BarChart4,
  LineChart,
  LucideIcon,
  TrendingDown,
  Layers,
  GitBranch
} from 'lucide-react';
import { TradingStrategy, TradingStrategyType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMarketData } from '@/hooks/useMarketData';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface StrategyCardProps {
  strategy: TradingStrategy;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onEdit: (id: string) => void;
  onBacktest?: (id: string) => void;
  metrics?: {
    winRate: number;
    profitFactor: number;
    sharpeRatio: number;
  };
}

const StrategyCard: React.FC<StrategyCardProps> = ({ 
  strategy, 
  onActivate,
  onDeactivate,
  onEdit,
  onBacktest,
  metrics
}) => {
  const getStrategyIcon = (type: TradingStrategyType) => {
    switch (type) {
      case 'momentum':
        return <BarChart3 className="h-5 w-5" />;
      case 'trend_following':
        return <TrendingUp className="h-5 w-5" />;
      case 'arbitrage':
        return <Shuffle className="h-5 w-5" />;
      case 'dca':
        return <DollarSign className="h-5 w-5" />;
      case 'machine_learning':
        return <Brain className="h-5 w-5" />;
      case 'mean_reversion':
        return <TrendingDown className="h-5 w-5" />
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'bg-green-500/10 text-green-600';
      case 'medium':
        return 'bg-orange-500/10 text-orange-600';
      case 'high':
        return 'bg-red-500/10 text-red-600';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <div className={cn(
      "content-panel transition-all duration-200 hover:shadow-medium border p-4 rounded-md",
      strategy.isActive ? "border-primary/50" : "border-border"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center",
            "bg-accent text-accent-foreground"
          )}>
            {getStrategyIcon(strategy.type)}
          </div>
          <div>
            <h3 className="text-sm font-medium">{strategy.name}</h3>
            <p className="text-xs text-muted-foreground">{strategy.description}</p>
          </div>
        </div>
        <div>
          <Badge variant="outline" className={cn(
            "text-xs", getRiskColor(strategy.riskLevel)
          )}>
            {strategy.riskLevel.charAt(0).toUpperCase() + strategy.riskLevel.slice(1)} Risk
          </Badge>
        </div>
      </div>
      
      {metrics && (
        <div className="grid grid-cols-3 gap-2 mt-3 p-2 bg-muted/40 rounded-md">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Win Rate</p>
            <p className={cn("text-sm font-medium", metrics.winRate >= 50 ? "text-green-600" : "text-red-600")}>
              {metrics.winRate}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Profit Factor</p>
            <p className={cn("text-sm font-medium", metrics.profitFactor >= 1.5 ? "text-green-600" : metrics.profitFactor >= 1 ? "text-yellow-600" : "text-red-600")}>
              {metrics.profitFactor.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Sharpe</p>
            <p className={cn("text-sm font-medium", metrics.sharpeRatio >= 1 ? "text-green-600" : "text-red-600")}>
              {metrics.sharpeRatio.toFixed(2)}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={() => onEdit(strategy.id)}
          >
            <Settings className="h-3.5 w-3.5 mr-1" />
            Settings
          </Button>
          
          {onBacktest && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={() => onBacktest(strategy.id)}
            >
              <LineChart className="h-3.5 w-3.5 mr-1" />
              Backtest
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {strategy.isActive ? (
            <Button 
              className="h-8"
              variant="destructive" 
              size="sm" 
              onClick={() => onDeactivate(strategy.id)}
            >
              <PauseCircle className="h-3.5 w-3.5 mr-1" />
              Deactivate
            </Button>
          ) : (
            <Button 
              className="h-8"
              size="sm" 
              onClick={() => onActivate(strategy.id)}
            >
              <PlayCircle className="h-3.5 w-3.5 mr-1" />
              Activate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Advanced Strategy Settings component
const AdvancedStrategySettingsForm = ({ 
  strategy, 
  onSave, 
  onCancel,
  onBacktest 
}: { 
  strategy: TradingStrategy; 
  onSave: (strategy: TradingStrategy) => void;
  onCancel: () => void;
  onBacktest?: (strategy: TradingStrategy) => void;
}) => {
  const [editedStrategy, setEditedStrategy] = useState<TradingStrategy>({...strategy});
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [isBacktesting, setIsBacktesting] = useState(false);
  const { marketData } = useMarketData();
  
  const availableAssets = marketData.length > 0 
    ? marketData.map(crypto => crypto.symbol) 
    : ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT"];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditedStrategy({
        ...editedStrategy,
        [parent]: {
          ...editedStrategy[parent as keyof TradingStrategy] as object,
          [child]: value
        }
      });
    } else {
      setEditedStrategy({
        ...editedStrategy,
        [field]: value
      });
    }
  };
  
  const handleAdvancedParamChange = (paramName: string, value: any) => {
    if (!editedStrategy.advancedParams) {
      editedStrategy.advancedParams = {};
    }
    
    setEditedStrategy({
      ...editedStrategy,
      advancedParams: {
        ...editedStrategy.advancedParams,
        [paramName]: value
      }
    });
  };
  
  const handleBacktest = async () => {
    if (onBacktest) {
      setIsBacktesting(true);
      await onBacktest(editedStrategy);
      setIsBacktesting(false);
    }
  };

  return (
    <div className="space-y-4 py-2">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Configuration</TabsTrigger>
          {editedStrategy.type === 'machine_learning' && (
            <TabsTrigger value="ml">ML Parameters</TabsTrigger>
          )}
        </TabsList>
        
        {/* Basic Settings Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Strategy Name</label>
              <Input
                value={editedStrategy.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mb-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Input
                value={editedStrategy.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mb-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Risk Level</label>
              <Select 
                value={editedStrategy.riskLevel} 
                onValueChange={(value: 'low' | 'medium' | 'high') => handleInputChange('riskLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Trading Pair</label>
              <Select 
                value={editedStrategy.config.asset || availableAssets[0]} 
                onValueChange={(value) => handleInputChange('config.asset', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trading pair" />
                </SelectTrigger>
                <SelectContent>
                  {availableAssets.map(asset => (
                    <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Strategy-specific basic settings */}
            {renderBasicStrategySettings(editedStrategy, handleInputChange)}
          </div>
        )}
        
        {/* Advanced Settings Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Position Sizing (%)</label>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[editedStrategy.advancedParams?.positionSize || 5]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(val) => handleAdvancedParamChange('positionSize', val[0])}
                  className="flex-1"
                />
                <span className="w-10 text-right">{editedStrategy.advancedParams?.positionSize || 5}%</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pyramiding" 
                checked={editedStrategy.advancedParams?.allowPyramiding || false}
                onCheckedChange={(checked) => handleAdvancedParamChange('allowPyramiding', checked)}
              />
              <label htmlFor="pyramiding" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Allow Pyramiding
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="useStopLoss" 
                checked={editedStrategy.advancedParams?.useStopLoss || false}
                onCheckedChange={(checked) => handleAdvancedParamChange('useStopLoss', checked)}
              />
              <label htmlFor="useStopLoss" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Use Stop Loss
              </label>
            </div>
            
            {editedStrategy.advancedParams?.useStopLoss && (
              <div>
                <label className="text-sm font-medium mb-1 block">Stop Loss (%)</label>
                <div className="flex gap-2 items-center">
                  <Slider
                    value={[editedStrategy.advancedParams?.stopLossPercentage || 5]}
                    min={0.5}
                    max={20}
                    step={0.5}
                    onValueChange={(val) => handleAdvancedParamChange('stopLossPercentage', val[0])}
                    className="flex-1"
                  />
                  <span className="w-10 text-right">{editedStrategy.advancedParams?.stopLossPercentage || 5}%</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="useTakeProfit" 
                checked={editedStrategy.advancedParams?.useTakeProfit || false}
                onCheckedChange={(checked) => handleAdvancedParamChange('useTakeProfit', checked)}
              />
              <label htmlFor="useTakeProfit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Use Take Profit
              </label>
            </div>
            
            {editedStrategy.advancedParams?.useTakeProfit && (
              <div>
                <label className="text-sm font-medium mb-1 block">Take Profit (%)</label>
                <div className="flex gap-2 items-center">
                  <Slider
                    value={[editedStrategy.advancedParams?.takeProfitPercentage || 10]}
                    min={1}
                    max={50}
                    step={0.5}
                    onValueChange={(val) => handleAdvancedParamChange('takeProfitPercentage', val[0])}
                    className="flex-1"
                  />
                  <span className="w-10 text-right">{editedStrategy.advancedParams?.takeProfitPercentage || 10}%</span>
                </div>
              </div>
            )}
            
            {/* Strategy-specific advanced settings */}
            {renderAdvancedStrategySettings(editedStrategy, handleAdvancedParamChange)}
          </div>
        )}
        
        {/* ML Parameters Tab */}
        {activeTab === 'ml' && editedStrategy.type === 'machine_learning' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Model Type</label>
              <Select 
                value={editedStrategy.advancedParams?.modelType || 'regression'} 
                onValueChange={(value) => handleAdvancedParamChange('modelType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regression">Regression</SelectItem>
                  <SelectItem value="classification">Classification</SelectItem>
                  <SelectItem value="reinforcement">Reinforcement Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Feature Selection</label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="usePrice" 
                    checked={editedStrategy.advancedParams?.features?.price || true}
                    onCheckedChange={(checked) => {
                      const currentFeatures = editedStrategy.advancedParams?.features || {};
                      handleAdvancedParamChange('features', { ...currentFeatures, price: checked });
                    }}
                  />
                  <label htmlFor="usePrice" className="text-sm">Price</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="useVolume" 
                    checked={editedStrategy.advancedParams?.features?.volume || true}
                    onCheckedChange={(checked) => {
                      const currentFeatures = editedStrategy.advancedParams?.features || {};
                      handleAdvancedParamChange('features', { ...currentFeatures, volume: checked });
                    }}
                  />
                  <label htmlFor="useVolume" className="text-sm">Volume</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="useIndicators" 
                    checked={editedStrategy.advancedParams?.features?.indicators || true}
                    onCheckedChange={(checked) => {
                      const currentFeatures = editedStrategy.advancedParams?.features || {};
                      handleAdvancedParamChange('features', { ...currentFeatures, indicators: checked });
                    }}
                  />
                  <label htmlFor="useIndicators" className="text-sm">Technical Indicators</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="useSentiment" 
                    checked={editedStrategy.advancedParams?.features?.sentiment || false}
                    onCheckedChange={(checked) => {
                      const currentFeatures = editedStrategy.advancedParams?.features || {};
                      handleAdvancedParamChange('features', { ...currentFeatures, sentiment: checked });
                    }}
                  />
                  <label htmlFor="useSentiment" className="text-sm">Market Sentiment</label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Training Frequency</label>
              <Select 
                value={editedStrategy.advancedParams?.trainingFrequency || 'daily'} 
                onValueChange={(value) => handleAdvancedParamChange('trainingFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select training frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Lookback Period (days)</label>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[editedStrategy.advancedParams?.lookbackPeriod || 30]}
                  min={5}
                  max={365}
                  step={1}
                  onValueChange={(val) => handleAdvancedParamChange('lookbackPeriod', val[0])}
                  className="flex-1"
                />
                <span className="w-10 text-right">{editedStrategy.advancedParams?.lookbackPeriod || 30}</span>
              </div>
            </div>
          </div>
        )}
      </Tabs>
      
      <Separator className="my-2" />
      
      <div className="flex justify-between gap-2">
        {onBacktest && (
          <Button 
            variant="outline" 
            onClick={handleBacktest}
            disabled={isBacktesting}
            className="gap-1"
          >
            <LineChart className="h-4 w-4 mr-1" />
            {isBacktesting ? 'Running...' : 'Run Backtest'}
          </Button>
        )}
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(editedStrategy)}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

// Render basic settings based on strategy type
const renderBasicStrategySettings = (strategy: TradingStrategy, handleInputChange: (field: string, value: any) => void) => {
  switch (strategy.type) {
    case 'momentum':
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-1 block">RSI Period</label>
            <Input 
              type="number" 
              value={strategy.config.rsiPeriod}
              onChange={(e) => handleInputChange('config.rsiPeriod', parseInt(e.target.value))}
              min={1}
              max={50}
            />
            <p className="text-xs text-muted-foreground mt-1">Number of periods used to calculate RSI</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Overbought Level</label>
              <Input 
                type="number" 
                value={strategy.config.overbought}
                onChange={(e) => handleInputChange('config.overbought', parseInt(e.target.value))}
                min={50}
                max={100}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Oversold Level</label>
              <Input 
                type="number" 
                value={strategy.config.oversold}
                onChange={(e) => handleInputChange('config.oversold', parseInt(e.target.value))}
                min={0}
                max={50}
              />
            </div>
          </div>
        </>
      );
    case 'trend_following':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Fast MA Period</label>
              <Input 
                type="number" 
                value={strategy.config.fastMA}
                onChange={(e) => handleInputChange('config.fastMA', parseInt(e.target.value))}
                min={1}
                max={50}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Slow MA Period</label>
              <Input 
                type="number" 
                value={strategy.config.slowMA}
                onChange={(e) => handleInputChange('config.slowMA', parseInt(e.target.value))}
                min={2}
                max={200}
              />
            </div>
          </div>
        </>
      );
    case 'mean_reversion':
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-1 block">Bollinger Band Period</label>
            <Input 
              type="number" 
              value={strategy.config.period || 20}
              onChange={(e) => handleInputChange('config.period', parseInt(e.target.value))}
              min={5}
              max={50}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Standard Deviations</label>
            <Input 
              type="number" 
              value={strategy.config.deviations || 2}
              onChange={(e) => handleInputChange('config.deviations', parseFloat(e.target.value))}
              min={1}
              max={4}
              step={0.1}
            />
          </div>
        </>
      );
    case 'dca':
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-1 block">Interval</label>
            <Select 
              value={strategy.config.interval} 
              onValueChange={(value) => handleInputChange('config.interval', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Investment Amount ($)</label>
            <Input 
              type="number" 
              value={strategy.config.amount}
              onChange={(e) => handleInputChange('config.amount', parseFloat(e.target.value))}
              min={1}
            />
          </div>
        </>
      );
    case 'machine_learning':
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-1 block">Prediction Horizon</label>
            <Select 
              value={strategy.config.horizon || '24h'} 
              onValueChange={(value) => handleInputChange('config.horizon', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select prediction horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="4h">4 Hours</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Confidence Threshold (%)</label>
            <div className="flex gap-2 items-center">
              <Slider
                value={[strategy.config.confidenceThreshold || 75]}
                min={50}
                max={95}
                step={5}
                onValueChange={(val) => handleInputChange('config.confidenceThreshold', val[0])}
                className="flex-1"
              />
              <span className="w-10 text-right">{strategy.config.confidenceThreshold || 75}%</span>
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
};

// Render advanced settings based on strategy type
const renderAdvancedStrategySettings = (strategy: TradingStrategy, handleAdvancedParamChange: (field: string, value: any) => void) => {
  switch (strategy.type) {
    case 'momentum':
      return (
        <>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="useVolume" 
              checked={strategy.advancedParams?.useVolume || false}
              onCheckedChange={(checked) => handleAdvancedParamChange('useVolume', checked)}
            />
            <label htmlFor="useVolume" className="text-sm font-medium">
              Filter with Volume
            </label>
          </div>
          {strategy.advancedParams?.useVolume && (
            <div>
              <label className="text-sm font-medium mb-1 block">Volume Threshold (% of avg)</label>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[strategy.advancedParams?.volumeThreshold || 120]}
                  min={100}
                  max={300}
                  step={10}
                  onValueChange={(val) => handleAdvancedParamChange('volumeThreshold', val[0])}
                  className="flex-1"
                />
                <span className="w-12 text-right">{strategy.advancedParams?.volumeThreshold || 120}%</span>
              </div>
            </div>
          )}
        </>
      );
    case 'trend_following':
      return (
        <>
          <div>
            <label className="text-sm font-medium mb-1 block">Additional Indicator</label>
            <Select 
              value={strategy.advancedParams?.additionalIndicator || 'none'} 
              onValueChange={(value) => handleAdvancedParamChange('additionalIndicator', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select additional indicator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="rsi">RSI</SelectItem>
                <SelectItem value="macd">MACD</SelectItem>
                <SelectItem value="adx">ADX</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="useTrailingStop" 
              checked={strategy.advancedParams?.useTrailingStop || false}
              onCheckedChange={(checked) => handleAdvancedParamChange('useTrailingStop', checked)}
            />
            <label htmlFor="useTrailingStop" className="text-sm font-medium">
              Use Trailing Stop
            </label>
          </div>
          {strategy.advancedParams?.useTrailingStop && (
            <div>
              <label className="text-sm font-medium mb-1 block">Trailing Stop (%)</label>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[strategy.advancedParams?.trailingStopPercentage || 3]}
                  min={0.5}
                  max={10}
                  step={0.5}
                  onValueChange={(val) => handleAdvancedParamChange('trailingStopPercentage', val[0])}
                  className="flex-1"
                />
                <span className="w-10 text-right">{strategy.advancedParams?.trailingStopPercentage || 3}%</span>
              </div>
            </div>
          )}
        </>
      );
    default:
      return null;
  }
};

// Strategy template card component
const StrategyTemplateCard = ({
  templateName,
  description,
  icon,
  type,
  onClick
}: {
  templateName: string;
  description: string;
  icon: React.ReactNode;
  type: TradingStrategyType;
  onClick: () => void;
}) => {
  return (
    <div 
      className="flex flex-col p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10">
            {icon}
          </div>
          <h3 className="font-medium">{templateName}</h3>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

// Backtest results dialog
const BacktestResultsDialog = ({
  open,
  onOpenChange,
  results
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: any;
}) => {
  if (!results) return null;
  
  const performanceRating = results.profitFactor > 1.5 ? "Excellent" : 
                            results.profitFactor > 1.2 ? "Good" : 
                            results.profitFactor > 1 ? "Fair" : "Poor";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Backtest Results
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-3 bg-primary/10 rounded-md">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Performance Rating</p>
              <Badge variant={
                performanceRating === "Excellent" ? "default" :
                performanceRating === "Good" ? "secondary" :
                performanceRating === "Fair" ? "outline" : "destructive"
              }>
                {performanceRating}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Return</p>
              <p className={cn(
                "text-base font-medium",
                results.totalReturn >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {results.totalReturn}%
              </p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Win Rate</p>
              <p className="text-base font-medium">{results.winRate}%</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Profit Factor</p>
              <p className="text-base font-medium">{results.profitFactor.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
              <p className="text-base font-medium">{results.sharpeRatio.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Max Drawdown</p>
              <p className="text-base font-medium text-red-600">{results.maxDrawdown}%</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Total Trades</p>
              <p className="text-base font-medium">{results.trades}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recommendations</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• {results.profitFactor < 1 ? 'Consider adjusting or abandoning this strategy' : 'Strategy is profitable and can be deployed'}</p>
              {results.maxDrawdown > 25 && <p>• High drawdown detected - consider reducing position size</p>}
              {results.winRate < 40 && <p>• Low win rate - review entry criteria</p>}
              {results.winRate > 60 && results.profitFactor < 1.2 && <p>• High win rate but low profit factor - consider adjusting take profit levels</p>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface StrategySelectorProps {
  strategies: TradingStrategy[];
}

const StrategySelector: React.FC<StrategySelectorProps> = ({ strategies }) => {
  const [activeStrategies, setActiveStrategies] = useState<TradingStrategy[]>(
    strategies.filter(s => s.isActive)
  );
  const [inactiveStrategies, setInactiveStrategies] = useState<TradingStrategy[]>(
    strategies.filter(s => !s.isActive)
  );
  const [selectedStrategy, setSelectedStrategy] = useState<TradingStrategy | null>(null);
  const [tab, setTab] = useState<string>('active');
  const [isNewStrategyDialogOpen, setIsNewStrategyDialogOpen] = useState(false);
  const [showBacktestResults, setShowBacktestResults] = useState(false);
  const [backtestResults, setBacktestResults] = useState<any>(null);
  
  // Mock strategy metrics for demo
  const strategyMetrics = {
    'strategy-1': { winRate: 62, profitFactor: 1.8, sharpeRatio: 1.2 },
    'strategy-2': { winRate: 58, profitFactor: 1.5, sharpeRatio: 0.9 },
    'strategy-3': { winRate: 45, profitFactor: 2.1, sharpeRatio: 1.4 },
  };

  const handleActivate = (id: string) => {
    const strategy = inactiveStrategies.find(s => s.id === id);
    if (strategy) {
      const updatedStrategy = { ...strategy, isActive: true };
      setActiveStrategies([...activeStrategies, updatedStrategy]);
      setInactiveStrategies(inactiveStrategies.filter(s => s.id !== id));
      toast.success(`Strategy "${strategy.name}" activated`, {
        description: "The strategy is now running and will execute trades based on its rules."
      });
    }
  };

  const handleDeactivate = (id: string) => {
    const strategy = activeStrategies.find(s => s.id === id);
    if (strategy) {
      const updatedStrategy = { ...strategy, isActive: false };
      setInactiveStrategies([...inactiveStrategies, updatedStrategy]);
      setActiveStrategies(activeStrategies.filter(s => s.id !== id));
      toast.info(`Strategy "${strategy.name}" deactivated`, {
        description: "The strategy has been paused and will not execute any new trades."
      });
    }
  };

  const handleEdit = (id: string) => {
    const strategy = [...activeStrategies, ...inactiveStrategies].find(s => s.id === id);
    if (strategy) {
      setSelectedStrategy(strategy);
    }
  };
  
  const handleBacktest = (id: string) => {
    const strategy = [...activeStrategies, ...inactiveStrategies].find(s => s.id === id);
    if (strategy) {
      setSelectedStrategy(strategy);
    }
  };
  
  const runBacktest = async (strategy: TradingStrategy) => {
    // Mock backtest function
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    // Generate plausible backtest results
    const mockResults = {
      strategyId: strategy.id,
      symbol: strategy.config.asset || 'BTC/USDT',
      timeframe: strategy.config.timeframe || '1h',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      trades: Math.floor(Math.random() * 50) + 20,
      winRate: Math.floor(Math.random() * 30) + 40, // 40-70%
      profitFactor: (Math.random() * 1.5) + 0.5, // 0.5-2.0
      totalReturn: Math.floor(Math.random() * 40) - 10, // -10% to +30%
      maxDrawdown: Math.floor(Math.random() * 20) + 5, // 5-25%
      sharpeRatio: (Math.random() * 2), // 0-2.0
    };
    
    setBacktestResults(mockResults);
    setShowBacktestResults(true);
    
    return mockResults;
  };
  
  const handleSaveSettings = (updatedStrategy: TradingStrategy) => {
    const isActive = updatedStrategy.isActive;
    
    if (isActive) {
      setActiveStrategies(activeStrategies.map(s => 
        s.id === updatedStrategy.id ? updatedStrategy : s
      ));
    } else {
      setInactiveStrategies(inactiveStrategies.map(s => 
        s.id === updatedStrategy.id ? updatedStrategy : s
      ));
    }
    
    setSelectedStrategy(null);
    toast.success(`Strategy "${updatedStrategy.name}" settings updated`, {
      description: "The changes will take effect immediately."
    });
  };
  
  const handleCreateStrategy = (templateName: string) => {
    setIsNewStrategyDialogOpen(false);
    
    // Create a new strategy based on the template
    const newId = `strategy-${Date.now()}`;
    let newStrategy: TradingStrategy;
    
    switch(templateName) {
      case 'Momentum RSI':
        newStrategy = {
          id: newId,
          name: 'My RSI Strategy',
          type: 'momentum',
          description: 'Uses RSI indicator to identify overbought and oversold conditions',
          config: {
            rsiPeriod: 14,
            overbought: 70,
            oversold: 30,
            timeframe: '1h',
            asset: 'BTC/USDT'
          },
          isActive: false,
          riskLevel: 'medium',
          advancedParams: {
            positionSize: 5,
            useStopLoss: true,
            stopLossPercentage: 5,
            useTakeProfit: true,
            takeProfitPercentage: 10
          }
        };
        break;
      case 'Moving Average Crossover':
        newStrategy = {
          id: newId,
          name: 'My MA Crossover Strategy',
          type: 'trend_following',
          description: 'Identifies trends using moving average crossovers',
          config: {
            fastMA: 9,
            slowMA: 21,
            timeframe: '4h',
            asset: 'BTC/USDT'
          },
          isActive: false,
          riskLevel: 'low',
          advancedParams: {
            positionSize: 3,
            useTrailingStop: true,
            trailingStopPercentage: 2
          }
        };
        break;
      case 'Bollinger Band':
        newStrategy = {
          id: newId,
          name: 'My Bollinger Band Strategy',
          type: 'mean_reversion',
          description: 'Trades reversals at Bollinger Band extremes',
          config: {
            period: 20,
            deviations: 2,
            timeframe: '1h',
            asset: 'ETH/USDT'
          },
          isActive: false,
          riskLevel: 'medium',
          advancedParams: {
            positionSize: 5
          }
        };
        break;
      case 'ML Strategy':
        newStrategy = {
          id: newId,
          name: 'My ML Strategy',
          type: 'machine_learning',
          description: 'Uses machine learning to predict price movements',
          config: {
            horizon: '24h',
            confidenceThreshold: 75,
            timeframe: '1h',
            asset: 'BTC/USDT'
          },
          isActive: false,
          riskLevel: 'high',
          advancedParams: {
            positionSize: 2,
            modelType: 'classification',
            features: {
              price: true,
              volume: true,
              indicators: true,
              sentiment: false
            },
            trainingFrequency: 'daily',
            lookbackPeriod: 30
          }
        };
        break;
      case 'DCA':
      default:
        newStrategy = {
          id: newId,
          name: 'My DCA Strategy',
          type: 'dca',
          description: 'Dollar-cost average into an asset at regular intervals',
          config: {
            interval: 'weekly',
            amount: 100,
            asset: 'BTC/USDT'
          },
          isActive: false,
          riskLevel: 'low',
          advancedParams: {
            positionSize: 2
          }
        };
    }
    
    setInactiveStrategies([...inactiveStrategies, newStrategy]);
    setSelectedStrategy(newStrategy);
    
    toast.success(`New strategy created`, {
      description: "Update the settings and activate when ready."
    });
  };

  return (
    <div className="content-panel">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Trading Strategies</h2>
          <p className="text-sm text-muted-foreground">Manage and monitor your automated trading strategies</p>
        </div>
        
        <Button className="h-9" onClick={() => setIsNewStrategyDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Strategy
        </Button>
      </div>

      <Tabs defaultValue="active" className="mb-4" onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="active" className="flex gap-2">
            Active 
            <Badge className="ml-1">{activeStrategies.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex gap-2">
            Inactive
            <Badge variant="outline" className="ml-1">{inactiveStrategies.length}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {tab === 'active' && activeStrategies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 border border-dashed rounded-md bg-accent/50">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-sm text-center text-muted-foreground max-w-md">
            You don't have any active strategies. Activate an existing strategy or create a new one to start trading.
          </p>
          <Button className="mt-4" onClick={() => setTab('inactive')}>
            View Inactive Strategies
          </Button>
        </div>
      )}
      
      {tab === 'active' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeStrategies.map(strategy => (
            <StrategyCard 
              key={strategy.id}
              strategy={strategy}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
              onEdit={handleEdit}
              onBacktest={() => handleBacktest(strategy.id)}
              metrics={strategyMetrics[strategy.id as keyof typeof strategyMetrics]}
            />
          ))}
        </div>
      )}
      
      {tab === 'inactive' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inactiveStrategies.map(strategy => (
            <StrategyCard 
              key={strategy.id}
              strategy={strategy}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
              onEdit={handleEdit}
              onBacktest={() => handleBacktest(strategy.id)}
            />
          ))}
        </div>
      )}

      {/* Strategy settings dialog */}
      <Dialog open={!!selectedStrategy} onOpenChange={(open) => !open && setSelectedStrategy(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Strategy Settings</DialogTitle>
          </DialogHeader>
          {selectedStrategy && (
            <AdvancedStrategySettingsForm 
              strategy={selectedStrategy}
              onSave={handleSaveSettings}
              onCancel={() => setSelectedStrategy(null)}
              onBacktest={runBacktest}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* New strategy template dialog */}
      <Dialog open={isNewStrategyDialogOpen} onOpenChange={setIsNewStrategyDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create New Strategy</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Choose a strategy template to start with. You'll be able to customize all parameters.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StrategyTemplateCard
                templateName="Momentum RSI"
                description="Uses RSI indicator to identify overbought and oversold conditions"
                icon={<BarChart3 className="h-4 w-4 text-primary" />}
                type="momentum"
                onClick={() => handleCreateStrategy('Momentum RSI')}
              />
              
              <StrategyTemplateCard
                templateName="Moving Average Crossover"
                description="Identifies trends using moving average crossovers"
                icon={<TrendingUp className="h-4 w-4 text-primary" />}
                type="trend_following"
                onClick={() => handleCreateStrategy('Moving Average Crossover')}
              />
              
              <StrategyTemplateCard
                templateName="Bollinger Band"
                description="Trades reversals at Bollinger Band extremes"
                icon={<TrendingDown className="h-4 w-4 text-primary" />}
                type="mean_reversion"
                onClick={() => handleCreateStrategy('Bollinger Band')}
              />
              
              <StrategyTemplateCard
                templateName="ML Strategy"
                description="Uses machine learning to predict price movements"
                icon={<Brain className="h-4 w-4 text-primary" />}
                type="machine_learning"
                onClick={() => handleCreateStrategy('ML Strategy')}
              />
              
              <StrategyTemplateCard
                templateName="DCA"
                description="Dollar-cost average into an asset at regular intervals"
                icon={<DollarSign className="h-4 w-4 text-primary" />}
                type="dca"
                onClick={() => handleCreateStrategy('DCA')}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Backtest results dialog */}
      <BacktestResultsDialog
        open={showBacktestResults}
        onOpenChange={setShowBacktestResults}
        results={backtestResults}
      />
    </div>
  );
};

export default StrategySelector;
