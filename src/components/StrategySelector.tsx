
import React, { useState } from 'react';
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
  Save
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

interface StrategyCardProps {
  strategy: TradingStrategy;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onEdit: (id: string) => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ 
  strategy, 
  onActivate,
  onDeactivate,
  onEdit
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
      
      <div className="flex items-center justify-between mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={() => onEdit(strategy.id)}
        >
          <Settings className="h-3.5 w-3.5 mr-1" />
          Settings
        </Button>
        
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

// Create a new component for strategy settings to better separate functionality
const StrategySettingsForm = ({ 
  strategy, 
  onSave, 
  onCancel 
}: { 
  strategy: TradingStrategy; 
  onSave: (strategy: TradingStrategy) => void;
  onCancel: () => void;
}) => {
  const [editedStrategy, setEditedStrategy] = useState<TradingStrategy>({...strategy});

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      // Handle nested fields like 'config.rsiPeriod'
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

  return (
    <div className="space-y-4 py-2">
      <p className="text-sm font-medium mb-1">{strategy.name}</p>
      <p className="text-sm text-muted-foreground mb-2">{strategy.description}</p>
      
      <div className="space-y-4">
        {strategy.type === 'momentum' && (
          <>
            <div>
              <label className="text-sm font-medium mb-1 block">RSI Period</label>
              <Input 
                type="number" 
                value={editedStrategy.config.rsiPeriod}
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
                  value={editedStrategy.config.overbought}
                  onChange={(e) => handleInputChange('config.overbought', parseInt(e.target.value))}
                  min={50}
                  max={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Oversold Level</label>
                <Input 
                  type="number" 
                  value={editedStrategy.config.oversold}
                  onChange={(e) => handleInputChange('config.oversold', parseInt(e.target.value))}
                  min={0}
                  max={50}
                />
              </div>
            </div>
          </>
        )}
        
        {strategy.type === 'trend_following' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Fast MA Period</label>
                <Input 
                  type="number" 
                  value={editedStrategy.config.fastMA}
                  onChange={(e) => handleInputChange('config.fastMA', parseInt(e.target.value))}
                  min={1}
                  max={50}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Slow MA Period</label>
                <Input 
                  type="number" 
                  value={editedStrategy.config.slowMA}
                  onChange={(e) => handleInputChange('config.slowMA', parseInt(e.target.value))}
                  min={2}
                  max={200}
                />
              </div>
            </div>
          </>
        )}
        
        <div>
          <label className="text-sm font-medium mb-1 block">Timeframe</label>
          <Select 
            value={editedStrategy.config.timeframe} 
            onValueChange={(value) => handleInputChange('config.timeframe', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 minute</SelectItem>
              <SelectItem value="5m">5 minutes</SelectItem>
              <SelectItem value="15m">15 minutes</SelectItem>
              <SelectItem value="1h">1 hour</SelectItem>
              <SelectItem value="4h">4 hours</SelectItem>
              <SelectItem value="1d">1 day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator className="my-2" />
      
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
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

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
    setSelectedTemplate(null);
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
            timeframe: '1h'
          },
          isActive: false,
          riskLevel: 'medium'
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
            timeframe: '4h'
          },
          isActive: false,
          riskLevel: 'low'
        };
        break;
      case 'Bollinger Band':
        newStrategy = {
          id: newId,
          name: 'My Bollinger Band Strategy',
          type: 'momentum',
          description: 'Trades reversals at Bollinger Band extremes',
          config: {
            period: 20,
            deviations: 2,
            timeframe: '1h'
          },
          isActive: false,
          riskLevel: 'medium'
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
          riskLevel: 'low'
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
            />
          ))}
        </div>
      )}

      {/* Strategy settings dialog */}
      <Dialog open={!!selectedStrategy} onOpenChange={(open) => !open && setSelectedStrategy(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Strategy Settings</DialogTitle>
          </DialogHeader>
          {selectedStrategy && (
            <StrategySettingsForm 
              strategy={selectedStrategy}
              onSave={handleSaveSettings}
              onCancel={() => setSelectedStrategy(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* New strategy template dialog */}
      <Dialog open={isNewStrategyDialogOpen} onOpenChange={setIsNewStrategyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Strategy</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Choose a strategy template to start with. You'll be able to customize all parameters.
            </p>
            <div className="space-y-2">
              {['Momentum RSI', 'Moving Average Crossover', 'Bollinger Band', 'DCA'].map((strategyName) => (
                <div 
                  key={strategyName} 
                  className="flex items-center justify-between p-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                  onClick={() => handleCreateStrategy(strategyName)}
                >
                  <div>
                    <p className="font-medium">{strategyName}</p>
                    <p className="text-xs text-muted-foreground">
                      {strategyName === 'Momentum RSI' && 'Uses RSI indicator to identify overbought and oversold conditions'}
                      {strategyName === 'Moving Average Crossover' && 'Identifies trends using moving average crossovers'}
                      {strategyName === 'Bollinger Band' && 'Trades reversals at Bollinger Band extremes'}
                      {strategyName === 'DCA' && 'Dollar-cost average into an asset at regular intervals'}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StrategySelector;
