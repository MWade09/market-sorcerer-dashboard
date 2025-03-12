
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Separator } from "@/components/ui/separator";
import TradingViewChart from "@/components/TradingViewChart";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import ActiveTrades from "@/components/ActiveTrades";
import { performanceMetrics, activeTrades, chartData } from "@/utils/mockData";
import { MarketData } from "@/lib/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useMarketData } from "@/hooks/useMarketData";

// Add import for the new BotLearningInsights component
import BotLearningInsights from "@/components/BotLearningInsights";

const Dashboard = ({ 
  isRunning, 
  marketData, 
  isLoading 
}: {
  isRunning: boolean;
  marketData: MarketData | null;
  isLoading: boolean;
}) => {
  const { refreshData } = useMarketData();

  return (
    <div className="grid gap-6">
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Current Price"
          value={marketData ? `$${marketData.price.toFixed(2)}` : "N/A"}
          isLoading={isLoading}
        />
        <MetricCard
          label="24h Change"
          value={marketData ? `${marketData.change24h.toFixed(2)}%` : "N/A"}
          change={marketData ? marketData.change24h : 0}
          isLoading={isLoading}
        />
        <Card>
          <CardHeader>
            <CardTitle>Refresh Data</CardTitle>
            <CardDescription>Manually refresh market data</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" disabled={isLoading} onClick={refreshData}>
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Refresh Data"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart section - 2 columns wide on large screens */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Price Chart</CardTitle>
              <CardDescription>Real-time price movements</CardDescription>
            </CardHeader>
            <CardContent>
              <TradingViewChart symbol="BTCUSDT" data={chartData} />
            </CardContent>
          </Card>
        </div>
        
        {/* Bot Learning Insights - Add this new section */}
        <div className="lg:col-span-1">
          <BotLearningInsights isRunning={isRunning} />
        </div>
      </div>
      
      {/* Third row */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for your bot</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics metrics={performanceMetrics} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
