
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PortfolioAllocation } from '@/lib/types';
import { ArrowUpIcon, ArrowDownIcon, BarChart, TrendingUp, ShieldIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioMetricsProps {
  portfolio: PortfolioAllocation;
}

const PortfolioMetrics: React.FC<PortfolioMetricsProps> = ({ portfolio }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Expected Return</p>
              <h3 className="text-2xl font-bold mt-1">{portfolio.expectedReturn}%</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Annualized projected return</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Volatility</p>
              <h3 className="text-2xl font-bold mt-1">{portfolio.volatility}%</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Annualized standard deviation</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
              <h3 className="text-2xl font-bold mt-1">{portfolio.sharpeRatio.toFixed(2)}</h3>
            </div>
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center",
              portfolio.sharpeRatio > 1 ? "bg-green-100" : "bg-yellow-100"
            )}>
              {portfolio.sharpeRatio > 1 ? (
                <ArrowUpIcon className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowDownIcon className="h-5 w-5 text-yellow-600" />
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Risk-adjusted return metric</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <h3 className="text-2xl font-bold mt-1">{portfolio.maxDrawdown}%</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <ShieldIcon className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Maximum potential loss</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioMetrics;
