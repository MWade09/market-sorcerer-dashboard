
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
  AlertTriangle
} from 'lucide-react';
import { TradingStrategy, TradingStrategyType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

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
      "content-panel transition-all duration-200 hover:shadow-medium border",
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

  return (
    <div className="content-panel">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Trading Strategies</h2>
          <p className="text-sm text-muted-foreground">Manage and monitor your automated trading strategies</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              New Strategy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Strategy</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Choose a strategy template to start with. You'll be able to customize all parameters.
              </p>
              <div className="space-y-2">
                {['Momentum RSI', 'Moving Average Crossover', 'Bollinger Band', 'DCA'].map((strategy) => (
                  <div key={strategy} className="flex items-center justify-between p-3 hover:bg-accent rounded-md cursor-pointer transition-colors">
                    <div>
                      <p className="font-medium">{strategy}</p>
                      <p className="text-xs text-muted-foreground">
                        {strategy === 'Momentum RSI' && 'Uses RSI indicator to identify overbought and oversold conditions'}
                        {strategy === 'Moving Average Crossover' && 'Identifies trends using moving average crossovers'}
                        {strategy === 'Bollinger Band' && 'Trades reversals at Bollinger Band extremes'}
                        {strategy === 'DCA' && 'Dollar-cost average into an asset at regular intervals'}
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

      {/* Strategy Edit Dialog */}
      <Dialog open={!!selectedStrategy} onOpenChange={(open) => !open && setSelectedStrategy(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Strategy Settings</DialogTitle>
          </DialogHeader>
          {selectedStrategy && (
            <div>
              <p className="text-sm font-medium mb-1">{selectedStrategy.name}</p>
              <p className="text-sm text-muted-foreground mb-4">{selectedStrategy.description}</p>
              
              <div className="space-y-4">
                {selectedStrategy.type === 'momentum' && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-1 block">RSI Period</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded-md"
                        value={selectedStrategy.config.rsiPeriod}
                        onChange={() => {}}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Number of periods used to calculate RSI</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Overbought Level</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-md"
                          value={selectedStrategy.config.overbought}
                          onChange={() => {}}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Oversold Level</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-md"
                          value={selectedStrategy.config.oversold}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {selectedStrategy.type === 'trend_following' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Fast MA Period</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-md"
                          value={selectedStrategy.config.fastMA}
                          onChange={() => {}}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Slow MA Period</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-md"
                          value={selectedStrategy.config.slowMA}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Timeframe</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="1m">1 minute</option>
                    <option value="5m">5 minutes</option>
                    <option value="15m">15 minutes</option>
                    <option value="1h">1 hour</option>
                    <option value="4h">4 hours</option>
                    <option value="1d">1 day</option>
                  </select>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedStrategy(null)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setSelectedStrategy(null);
                  toast.success("Strategy settings updated");
                }}>
                  Save Settings
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StrategySelector;
