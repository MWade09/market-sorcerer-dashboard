
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TradingViewChart from "@/components/TradingViewChart";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import { AlertTriangle, TrendingUp, Activity, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketData, PerformanceMetric, Cryptocurrency } from "@/lib/types";
import TradeControls from "@/components/TradeControls";
import MarketSignals from "@/components/MarketSignals";
import RiskManagement from "@/components/RiskManagement";
import { performanceMetrics, bitcoinChartData } from "@/utils/mockData";

interface DashboardProps {
  isRunning: boolean;
  marketData: Cryptocurrency | null;
  isLoading: boolean;
}

const Dashboard = ({ isRunning, marketData, isLoading }: DashboardProps) => {
  // Create a valid MarketData object from Cryptocurrency
  const createMarketData = (crypto: Cryptocurrency | null): MarketData => {
    if (!crypto) {
      return {
        price: 36789.45,
        change24h: 2.54,
        high24h: 38500.00,
        low24h: 36300.00,
        volume24h: 28765432000,
        marketCap: 924567890000,
        lastUpdated: new Date().toISOString()
      };
    }
    
    return {
      price: crypto.price,
      change24h: crypto.change24h,
      high24h: crypto.price * 1.05, // Approximation
      low24h: crypto.price * 0.95,  // Approximation
      volume24h: crypto.volume24h,
      marketCap: crypto.marketCap,
      lastUpdated: new Date().toISOString()
    };
  };
  
  const marketDataFormatted = createMarketData(marketData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-4 md:space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>BTC/USDT</CardTitle>
              <CardDescription>
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <span className="text-lg font-semibold text-green-500">
                    ${marketDataFormatted.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isRunning ? "default" : "secondary"}>
                {isRunning ? "Active" : "Paused"}
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                <Clock className="mr-1 h-3 w-3" /> 5m
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <TradingViewChart symbol="BTC/USDT" data={bitcoinChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trade Settings</CardTitle>
            <CardDescription>Configure your trading parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <TradeControls />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Trading bot statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics metrics={performanceMetrics} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={18} />
              Market Signals
            </CardTitle>
            <CardDescription>Technical indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketSignals />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={18} />
              Risk Management
            </CardTitle>
            <CardDescription>Stop-loss & take-profit</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
