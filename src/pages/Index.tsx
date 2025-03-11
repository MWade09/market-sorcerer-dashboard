
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TradingViewChart from "@/components/TradingViewChart";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import ActiveTrades from "@/components/ActiveTrades";
import ExchangeSelector from "@/components/ExchangeSelector";
import StrategySelector from "@/components/StrategySelector";
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings, History, ChevronDown } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const { marketData, isLoading } = useMarketData();
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const toggleBotStatus = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold tracking-tight">Market Sorcerer Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={toggleBotStatus}
              variant={isRunning ? "destructive" : "default"}
              className="gap-2"
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? "Stop Bot" : "Start Bot"}
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Settings <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <h4 className="font-medium leading-none">Bot Configuration</h4>
                  <Separator />
                  <div className="grid gap-2">
                    <ExchangeSelector />
                    <StrategySelector />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <Dashboard isRunning={isRunning} marketData={marketData} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="trades" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Trades</CardTitle>
                  <CardDescription>
                    Currently open trading positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ActiveTrades />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History size={18} />
                    Trading History
                  </CardTitle>
                  <CardDescription>
                    Previous trades and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TradingHistory />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
