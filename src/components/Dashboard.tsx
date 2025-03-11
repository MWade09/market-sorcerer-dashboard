
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TradingViewChart from "@/components/TradingViewChart";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import { AlertTriangle, TrendingUp, Activity, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketData, PerformanceMetric } from "@/lib/types";
import TradeControls from "@/components/TradeControls";
import MarketSignals from "@/components/MarketSignals";
import RiskManagement from "@/components/RiskManagement";
import { performanceMetrics, bitcoinChartData } from "@/utils/mockData";

interface DashboardProps {
  isRunning: boolean;
  marketData: MarketData | null;
  isLoading: boolean;
}

const Dashboard = ({ isRunning, marketData, isLoading }: DashboardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>BTC/USDT</CardTitle>
              <CardDescription>
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <span className="text-lg font-semibold text-green-500">
                    ${marketData?.price || "36,789.45"}
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

      <div className="space-y-6">
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
