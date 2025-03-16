
import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Lock, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  CircleDashed,
  Plus,
  Link,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { ExchangeAccount } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { exchangeService, SupportedExchange, ExchangeCredentials } from '@/services/api/exchangeService';

interface ExchangeSelectorProps {
  exchanges: ExchangeAccount[];
}

const ExchangeSelector: React.FC<ExchangeSelectorProps> = ({ exchanges: initialExchanges }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [exchanges, setExchanges] = useState<ExchangeAccount[]>(initialExchanges);
  const [configValues, setConfigValues] = useState<ExchangeCredentials>({
    apiKey: '',
    apiSecret: '',
    passphrase: '',
    testMode: true,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Load configured exchanges on component mount
  useEffect(() => {
    const configuredExchanges = exchangeService.getConfiguredExchanges();
    const activeExchange = exchangeService.getActiveExchange();
    
    // Update the exchange list based on configured exchanges
    if (configuredExchanges.length > 0) {
      const updatedExchanges = [...initialExchanges];
      
      configuredExchanges.forEach(exchangeId => {
        const index = updatedExchanges.findIndex(ex => ex.exchange === exchangeId);
        if (index !== -1) {
          updatedExchanges[index] = {
            ...updatedExchanges[index],
            apiKeyConfigured: true,
            isActive: exchangeId === activeExchange
          };
        }
      });
      
      setExchanges(updatedExchanges);
    }
  }, [initialExchanges]);

  const handleConnectExchange = async () => {
    if (!selectedExchange) return;
    
    if (!configValues.apiKey || !configValues.apiSecret) {
      toast.error('API key and secret are required');
      return;
    }

    setLoading(true);

    try {
      // Store credentials
      exchangeService.setCredentials(selectedExchange as SupportedExchange, configValues);
      
      // Test connection
      const isConnected = await exchangeService.testConnection(selectedExchange as SupportedExchange);
      
      if (isConnected) {
        toast.success(`Connected to ${selectedExchange}`, {
          description: 'API credentials have been securely stored',
        });
        
        // Update state to reflect the change
        const updatedExchanges = [...exchanges];
        const index = updatedExchanges.findIndex(ex => ex.exchange === selectedExchange);
        
        if (index !== -1) {
          updatedExchanges[index] = {
            ...updatedExchanges[index],
            apiKeyConfigured: true,
            // Set as active if this is the first exchange configured
            isActive: !updatedExchanges.some(e => e.isActive)
          };
          
          // If this is the first active exchange, set it as active in the service
          if (updatedExchanges[index].isActive) {
            exchangeService.setActiveExchange(selectedExchange as SupportedExchange);
          }
          
          setExchanges(updatedExchanges);
        }
      } else {
        toast.error('Could not connect to exchange', {
          description: 'Please verify your API credentials',
        });
      }
    } catch (error) {
      console.error('Error connecting to exchange:', error);
      toast.error('Failed to connect to exchange', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
      setOpenDialog(false);
      setSelectedExchange(null);
      setConfigValues({
        apiKey: '',
        apiSecret: '',
        passphrase: '',
        testMode: true,
      });
    }
  };

  const handleActivateExchange = async (exchange: string) => {
    try {
      exchangeService.setActiveExchange(exchange as SupportedExchange);
      
      // Update state to reflect the change
      const updatedExchanges = exchanges.map(ex => ({
        ...ex,
        isActive: ex.exchange === exchange
      }));
      
      setExchanges(updatedExchanges);
      
      toast.success(`${exchange} activated as primary exchange`);
    } catch (error) {
      console.error('Error activating exchange:', error);
      toast.error('Failed to activate exchange', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const getExchangeBalance = async (exchange: SupportedExchange) => {
    const updatedExchanges = [...exchanges];
    const index = updatedExchanges.findIndex(ex => ex.exchange === exchange);
    
    if (index === -1) return;
    
    try {
      setLoading(true);
      updatedExchanges[index] = {
        ...updatedExchanges[index],
        isLoading: true
      };
      setExchanges(updatedExchanges);
      
      // This would be a real API call in production
      const balances = await exchangeService.getAccountBalance(exchange);
      
      // Calculate total balance in USD (simplified)
      const totalBalance = Object.entries(balances).reduce((total, [currency, amount]) => {
        // Apply rough price estimations for common cryptocurrencies
        const prices: Record<string, number> = {
          'BTC': 36000,
          'XBT': 36000, // Kraken uses XBT
          'ETH': 2500,
          'USDT': 1,
          'USDC': 1,
          'USD': 1
        };
        
        const price = prices[currency] || 0;
        return total + (amount * price);
      }, 0);
      
      updatedExchanges[index] = {
        ...updatedExchanges[index],
        balance: totalBalance,
        isLoading: false
      };
      
      setExchanges(updatedExchanges);
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast.error('Failed to fetch balance', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      
      updatedExchanges[index] = {
        ...updatedExchanges[index],
        isLoading: false
      };
      
      setExchanges(updatedExchanges);
    } finally {
      setLoading(false);
    }
  };

  const renderExchangeIcon = (exchange: string) => {
    return (
      <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-md">
        <span className="text-xl font-bold">
          {exchange === 'binance' ? 'B' : exchange === 'coinbase' ? 'C' : 'K'}
        </span>
      </div>
    );
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
          <DialogContent className="max-w-md">
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
                    {renderExchangeIcon('binance')}
                    <span>Binance</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                  onClick={() => setSelectedExchange('coinbase')}
                >
                  <div className="flex items-center gap-2">
                    {renderExchangeIcon('coinbase')}
                    <span>Coinbase</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                  onClick={() => setSelectedExchange('kraken')}
                >
                  <div className="flex items-center gap-2">
                    {renderExchangeIcon('kraken')}
                    <span>Kraken</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <div className="py-4 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  {renderExchangeIcon(selectedExchange)}
                  <h3 className="font-medium capitalize">{selectedExchange}</h3>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Enter your API keys from {selectedExchange}. The bot only needs read and trade permissions, 
                    <span className="font-medium"> do not enable withdrawal permissions.</span>
                  </p>
                  
                  <a 
                    href={`https://${selectedExchange}.com/settings/api`} 
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

                  {selectedExchange === 'kraken' && (
                    <div>
                      <Label htmlFor="passphrase">API Passphrase</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="passphrase"
                          type="password"
                          placeholder="Enter your API passphrase" 
                          className="pl-9"
                          value={configValues.passphrase}
                          onChange={(e) => setConfigValues({...configValues, passphrase: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

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
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleConnectExchange}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Link className="h-4 w-4 mr-2" />
                          Connect {selectedExchange}
                        </>
                      )}
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
                {renderExchangeIcon(exchange.exchange)}
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
                <div className="flex items-center">
                  {exchange.isLoading ? (
                    <RefreshCw className="h-3.5 w-3.5 text-muted-foreground animate-spin mr-1" />
                  ) : null}
                  <span className="text-sm font-medium">
                    {exchange.apiKeyConfigured 
                      ? `$${exchange.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
                      : 'Not connected'}
                  </span>
                </div>
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
                exchange.isActive ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => getExchangeBalance(exchange.exchange as SupportedExchange)}
                    disabled={loading || exchange.isLoading}
                  >
                    <RefreshCw className={cn(
                      "h-4 w-4 mr-2",
                      exchange.isLoading && "animate-spin"
                    )} />
                    Refresh Balance
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleActivateExchange(exchange.exchange)}
                    disabled={loading}
                  >
                    Activate Exchange
                  </Button>
                )
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setSelectedExchange(exchange.exchange);
                    setOpenDialog(true);
                  }}
                  disabled={loading}
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
