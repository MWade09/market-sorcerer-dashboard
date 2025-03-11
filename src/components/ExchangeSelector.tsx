
import React, { useState } from 'react';
import { 
  Key, 
  Lock, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  CircleDashed,
  Plus,
  Link,
  ExternalLink
} from 'lucide-react';
import { ExchangeAccount } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

interface ExchangeSelectorProps {
  exchanges: ExchangeAccount[];
}

const ExchangeSelector: React.FC<ExchangeSelectorProps> = ({ exchanges }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [configValues, setConfigValues] = useState({
    apiKey: '',
    apiSecret: '',
    testMode: true,
  });

  const handleConnectExchange = () => {
    if (!selectedExchange) return;
    
    if (!configValues.apiKey || !configValues.apiSecret) {
      toast.error('API key and secret are required');
      return;
    }

    // In a real app, this would send the API credentials to the backend
    toast.success(`Connected to ${selectedExchange}`, {
      description: 'API credentials have been securely stored',
    });
    
    setOpenDialog(false);
    setSelectedExchange(null);
    setConfigValues({
      apiKey: '',
      apiSecret: '',
      testMode: true,
    });
  };

  return (
    <div className="content-panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Exchanges</h2>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Connect Exchange
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Exchange</DialogTitle>
            </DialogHeader>
            
            {!selectedExchange ? (
              <div className="grid grid-cols-1 gap-2 py-4">
                <button 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                  onClick={() => setSelectedExchange('binance')}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-md">
                      <span className="text-xl font-bold">B</span>
                    </div>
                    <span>Binance</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                  onClick={() => setSelectedExchange('coinbase')}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-md">
                      <span className="text-xl font-bold">C</span>
                    </div>
                    <span>Coinbase</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                  onClick={() => setSelectedExchange('kraken')}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-md">
                      <span className="text-xl font-bold">K</span>
                    </div>
                    <span>Kraken</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <div className="py-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-md">
                    <span className="text-xl font-bold">
                      {selectedExchange === 'binance' ? 'B' : selectedExchange === 'coinbase' ? 'C' : 'K'}
                    </span>
                  </div>
                  <h3 className="font-medium capitalize">{selectedExchange}</h3>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Enter your API keys from {selectedExchange}. The bot only needs read and trade permissions, 
                    <span className="font-medium"> do not enable withdrawal permissions.</span>
                  </p>
                  
                  <a 
                    href="#" 
                    className="text-sm flex items-center text-primary mt-1 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How to create API keys on {selectedExchange}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="apiKey"
                        placeholder="Enter your API key" 
                        className="pl-9"
                        value={configValues.apiKey}
                        onChange={(e) => setConfigValues({...configValues, apiKey: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="apiSecret">API Secret</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="apiSecret"
                        type="password"
                        placeholder="Enter your API secret" 
                        className="pl-9"
                        value={configValues.apiSecret}
                        onChange={(e) => setConfigValues({...configValues, apiSecret: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="testMode" 
                      checked={configValues.testMode}
                      onCheckedChange={(checked) => setConfigValues({...configValues, testMode: checked})}
                    />
                    <Label htmlFor="testMode">Enable test mode (no real trading)</Label>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedExchange(null)}
                    >
                      Back
                    </Button>
                    <Button onClick={handleConnectExchange}>
                      <Link className="h-4 w-4 mr-2" />
                      Connect {selectedExchange}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exchanges.map((exchange) => (
          <div 
            key={exchange.exchange}
            className={cn(
              "border rounded-md p-4 transition-all",
              exchange.isActive 
                ? "border-primary/50" 
                : "border-border",
              exchange.apiKeyConfigured 
                ? "hover:shadow-soft cursor-pointer" 
                : "opacity-60"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-md">
                  <span className="text-xl font-bold">
                    {exchange.exchange === 'binance' ? 'B' : exchange.exchange === 'coinbase' ? 'C' : 'K'}
                  </span>
                </div>
                <span className="font-medium">{exchange.name}</span>
              </div>
              
              <div>
                {exchange.apiKeyConfigured ? (
                  exchange.isActive ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <CircleDashed className="h-5 w-5 text-muted-foreground" />
                  )
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Balance</span>
                <span className="text-sm font-medium">
                  {exchange.apiKeyConfigured 
                    ? `$${exchange.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
                    : 'Not connected'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm">
                  {exchange.apiKeyConfigured 
                    ? (exchange.isActive ? 'Active' : 'Connected') 
                    : 'Not configured'}
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              {exchange.apiKeyConfigured ? (
                <Button 
                  variant={exchange.isActive ? "outline" : "default"} 
                  size="sm" 
                  className="w-full"
                >
                  {exchange.isActive ? 'Manage Exchange' : 'Activate Exchange'}
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setSelectedExchange(exchange.exchange);
                    setOpenDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Connect {exchange.name}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeSelector;
