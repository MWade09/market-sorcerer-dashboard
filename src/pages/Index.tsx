
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TradingViewChart from "@/components/TradingViewChart";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import ActiveTrades from "@/components/ActiveTrades";
import ExchangeSelector from "@/components/ExchangeSelector";
import StrategySelector from "@/components/StrategySelector";
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings, History, ChevronDown, Book, Cog, LogOut, User, BarChart4 } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs as SettingsTabs, TabsContent as SettingsTabsContent, TabsList as SettingsTabsList, TabsTrigger as SettingsTabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import TradingHistory from "@/components/TradingHistory";
import UserGuide from "@/components/UserGuide";
import RiskManagement from "@/components/RiskManagement";
import TradingDisclaimer from "@/components/TradingDisclaimer";
import { exchangeAccounts, tradingStrategies, activeTrades, performanceMetrics, chartData } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";
import { MarketData } from "@/lib/types";
import OnboardingTour from "@/components/OnboardingTour";
import { Link } from "react-router-dom";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const { marketData, loading: isLoading, getChartData } = useMarketData();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [settingsTab, setSettingsTab] = useState("exchanges");
  const { user, logout, isFirstLogin, completeOnboarding } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check for first login and show onboarding
  useEffect(() => {
    if (isFirstLogin) {
      setShowOnboarding(true);
    }
  }, [isFirstLogin]);

  const toggleBotStatus = () => {
    setIsRunning(!isRunning);
  };

  const getMarketDataForDisplay = (): MarketData | null => {
    if (!marketData || marketData.length === 0) return null;
    
    const crypto = marketData[0];
    return {
      price: crypto.price,
      change24h: crypto.change24h,
      volume24h: crypto.volume24h,
      marketCap: crypto.marketCap,
      high24h: crypto.price * 1.05,
      low24h: crypto.price * 0.95,
      lastUpdated: new Date().toISOString()
    };
  };

  const handleCompleteOnboarding = async () => {
    await completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold tracking-tight">Market Sorcerer Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center mr-4 text-sm text-muted-foreground">
              <User size={16} className="mr-1" />
              {user?.name || user?.email || 'Guest User'}
            </div>
            
            <Button 
              onClick={toggleBotStatus}
              variant={isRunning ? "destructive" : "default"}
              className="gap-2"
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? "Stop Bot" : "Start Bot"}
            </Button>
            
            <Link to="/portfolio-optimization">
              <Button variant="outline" className="gap-2">
                <BarChart4 size={16} />
                Portfolio Optimization
              </Button>
            </Link>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings size={16} />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-3xl p-0 max-h-[90vh] overflow-auto">
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Cog className="h-5 w-5" />
                    Bot Configuration
                  </DialogTitle>
                </DialogHeader>
                
                <SettingsTabs value={settingsTab} onValueChange={setSettingsTab} className="w-full">
                  <div className="px-6">
                    <SettingsTabsList className="grid w-full grid-cols-3 mb-6">
                      <SettingsTabsTrigger value="exchanges">Exchanges</SettingsTabsTrigger>
                      <SettingsTabsTrigger value="strategies">Strategies</SettingsTabsTrigger>
                      <SettingsTabsTrigger value="risk">Risk Management</SettingsTabsTrigger>
                    </SettingsTabsList>
                  </div>
                  
                  <SettingsTabsContent value="exchanges" className="p-6 pt-0">
                    <ExchangeSelector exchanges={exchangeAccounts} />
                  </SettingsTabsContent>
                  
                  <SettingsTabsContent value="strategies" className="p-6 pt-0">
                    <StrategySelector strategies={tradingStrategies} />
                  </SettingsTabsContent>
                  
                  <SettingsTabsContent value="risk" className="p-6 pt-0">
                    <RiskManagement />
                  </SettingsTabsContent>
                </SettingsTabs>
              </DialogContent>
            </Dialog>
            
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="mb-6">
          <TradingDisclaimer />
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="guide">
              <Book size={16} className="mr-1" />
              Guide
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <Dashboard 
              isRunning={isRunning} 
              marketData={getMarketDataForDisplay()} 
              isLoading={isLoading} 
            />
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
                  <ActiveTrades positions={activeTrades} />
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
          
          <TabsContent value="guide" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book size={18} />
                  User Guide
                </CardTitle>
                <CardDescription>
                  Learn how to set up, test, and customize your trading bot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserGuide />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Onboarding Tour */}
      <OnboardingTour 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)} 
        onComplete={handleCompleteOnboarding}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
};

export default Index;
