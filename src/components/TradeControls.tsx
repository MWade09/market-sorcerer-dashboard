
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, BellRing, Clock, Zap, RefreshCw, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from '@/components/ui/sonner';
import { tradingService, OrderParams } from "@/services/api/tradingService";
import { marketDataService } from "@/services/api/marketDataService";
import { exchangeService } from "@/services/api/exchangeService";

const TradeControls = () => {
  const [tradeMode, setTradeMode] = useState("automated");
  const [amount, setAmount] = useState(0.01);
  const [leverage, setLeverage] = useState(1);
  const [interval, setInterval] = useState("5m");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [strategy, setStrategy] = useState("momentum");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(36789.45);
  const [priceChange, setPriceChange] = useState(1.24);
  const [orderType, setOrderType] = useState("market");
  const [timeInForce, setTimeInForce] = useState("gtc");
  const [symbol, setSymbol] = useState("BTC/USDT");
  const [isExchangeConnected, setIsExchangeConnected] = useState(false);
  
  useEffect(() => {
    const activeExchange = exchangeService.getActiveExchange();
    if (activeExchange) {
      const credentials = exchangeService.getCredentials(activeExchange);
      setIsExchangeConnected(!!credentials);
    } else {
      setIsExchangeConnected(false);
    }
  }, []);
  
  useEffect(() => {
    // Store the interval ID with the correct type
    const refreshInterval = window.setInterval(() => {
      setCurrentPrice(prev => prev * (1 + (Math.random() - 0.5) * 0.001));
      setPriceChange(prev => Math.max(-5, Math.min(5, prev + (Math.random() - 0.5) * 0.1)));
    }, 5000);
    
    // Clean up with the correct interval ID
    return () => {
      window.clearInterval(refreshInterval);
    };
  }, []);
  
  const calculateOrderValue = () => {
    return amount * currentPrice;
  };
  
  const handlePlaceOrder = async (side: 'buy' | 'sell') => {
    if (!isExchangeConnected) {
      toast.error('No exchange connected', {
        description: 'Please connect and activate an exchange in settings first'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const orderParams: OrderParams = {
        symbol,
        side,
        type: orderType as 'market' | 'limit' | 'stop',
        quantity: amount,
        price: orderType === 'market' ? undefined : currentPrice,
        timeInForce: timeInForce === 'gtc' ? 'GTC' : timeInForce === 'ioc' ? 'IOC' : 'FOK'
      };
      
      const order = await tradingService.placeOrder(orderParams);
      
      toast.success(`${side.toUpperCase()} order placed successfully`, {
        description: `${amount} ${symbol} at ${orderType === 'market' ? 'market price' : `$${currentPrice.toFixed(2)}`}`
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isExchangeConnected) {
    return (
      <Card className="p-6 space-y-4">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-3" />
          <h3 className="text-lg font-medium mb-2">No Exchange Connected</h3>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            You need to connect to an exchange before you can trade. 
            Please go to Settings and connect your exchange API credentials.
          </p>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <Tabs value={tradeMode} onValueChange={setTradeMode}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="automated" className="flex gap-2 items-center">
            <Zap size={16} />
            Automated
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex gap-2 items-center">
            <Clock size={16} />
            Manual
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="automated" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy">Trading Strategy</Label>
              <Select value={strategy} onValueChange={setStrategy}>
                <SelectTrigger id="strategy">
                  <SelectValue placeholder="Select Strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="momentum">RSI Momentum</SelectItem>
                  <SelectItem value="trend">Trend Following (MA)</SelectItem>
                  <SelectItem value="breakout">Breakout (Bollinger)</SelectItem>
                  <SelectItem value="scalping">Scalping</SelectItem>
                  <SelectItem value="dca">Dollar Cost Average</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeframe">Time Interval</Label>
              <Select value={interval} onValueChange={setInterval}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select Timeframe" />
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
          
          <Separator />
          
          <div className="space-y-2">
            <Label>Position Size (BTC)</Label>
            <div className="flex gap-2">
              <Slider
                min={0.001}
                max={0.1}
                step={0.001}
                value={[amount]}
                onValueChange={(values) => setAmount(values[0])}
                className="flex-1"
              />
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-24"
                step={0.001}
                min={0.001}
                max={0.1}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Approx. value: ${calculateOrderValue().toFixed(2)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max Active Trades</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue placeholder="Max Trades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue placeholder="Trading Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Conservative)</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High (Aggressive)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="cursor-pointer">Trade Notifications</Label>
              <div className="text-sm text-muted-foreground">Get notified on new trades</div>
            </div>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-6 pt-4">
          <div className="flex justify-between">
            <div>
              <div className="text-lg font-medium">{symbol}</div>
              <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
              <div className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% (24h)
              </div>
            </div>
            <div className="space-y-2">
              <Label>Amount (BTC)</Label>
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
                step={0.001}
                min={0.001}
              />
              <div className="text-sm text-muted-foreground">
                ${calculateOrderValue().toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="w-full h-16 text-lg bg-green-600 hover:bg-green-700"
              onClick={() => handlePlaceOrder('buy')}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowUp className="mr-2 h-5 w-5" />
              )}
              Buy / Long
            </Button>
            <Button 
              variant="destructive" 
              className="w-full h-16 text-lg"
              onClick={() => handlePlaceOrder('sell')}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowDown className="mr-2 h-5 w-5" />
              )}
              Sell / Short
            </Button>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="leverage">Leverage</Label>
              <Badge variant="outline">{leverage}x</Badge>
            </div>
            <Slider
              id="leverage"
              min={1}
              max={10}
              step={1}
              value={[leverage]}
              onValueChange={(values) => setLeverage(values[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1x</span>
              <span>10x</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger>
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market</SelectItem>
                <SelectItem value="limit">Limit</SelectItem>
                <SelectItem value="stop">Stop</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeInForce} onValueChange={setTimeInForce}>
              <SelectTrigger>
                <SelectValue placeholder="Time in Force" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gtc">Good til Cancelled</SelectItem>
                <SelectItem value="ioc">Immediate or Cancel</SelectItem>
                <SelectItem value="fok">Fill or Kill</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {orderType !== 'market' && (
            <div className="space-y-2">
              <Label htmlFor="limit-price">Limit Price</Label>
              <Input
                id="limit-price"
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                step={0.01}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeControls;
