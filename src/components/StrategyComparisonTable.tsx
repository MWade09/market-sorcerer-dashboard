
import React from 'react';
import { BacktestResult, TradingStrategy } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowUp, ArrowDown, Star, AlertCircle, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StrategyComparisonTableProps {
  strategies: {
    strategy: TradingStrategy;
    backtestResults?: BacktestResult;
  }[];
  onViewDetails: (strategyId: string) => void;
}

const StrategyComparisonTable: React.FC<StrategyComparisonTableProps> = ({ 
  strategies,
  onViewDetails
}) => {
  // Sort strategies by performance (total return)
  const sortedStrategies = [...strategies].sort((a, b) => {
    const aReturn = a.backtestResults?.totalReturn || 0;
    const bReturn = b.backtestResults?.totalReturn || 0;
    return bReturn - aReturn;
  });
  
  const formatPercentage = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Strategy Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead className="text-right">Total Return</TableHead>
            <TableHead className="text-right">Win Rate</TableHead>
            <TableHead className="text-center">Sharpe Ratio</TableHead>
            <TableHead className="text-right">Max Drawdown</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStrategies.map(({ strategy, backtestResults }) => (
            <TableRow key={strategy.id}>
              <TableCell className="font-medium">{strategy.name}</TableCell>
              <TableCell className="capitalize">{strategy.type.replace('_', ' ')}</TableCell>
              <TableCell>
                <Badge variant={
                  strategy.riskLevel === 'low' ? 'outline' : 
                  strategy.riskLevel === 'medium' ? 'secondary' : 
                  'destructive'
                }>
                  {strategy.riskLevel}
                </Badge>
              </TableCell>
              <TableCell className={cn(
                "text-right font-medium",
                !backtestResults ? "text-muted-foreground" :
                backtestResults.totalReturn >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {!backtestResults ? 'No data' : formatPercentage(backtestResults.totalReturn)}
              </TableCell>
              <TableCell className="text-right">
                {!backtestResults ? 'No data' : `${backtestResults.winRate}%`}
              </TableCell>
              <TableCell className="text-center">
                {!backtestResults ? 'No data' : (
                  <div className="flex items-center justify-center gap-1">
                    {backtestResults.sharpeRatio >= 1.5 ? (
                      <>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </>
                    ) : backtestResults.sharpeRatio >= 1 ? (
                      <>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </>
                    ) : backtestResults.sharpeRatio >= 0.5 ? (
                      <>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </>
                    )}
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs">
                            Sharpe Ratio: {backtestResults.sharpeRatio.toFixed(2)}
                            <br />
                            <span className="text-muted-foreground">
                              Risk-adjusted return measure
                            </span>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right text-red-600">
                {!backtestResults ? 'No data' : `-${backtestResults.maxDrawdown}%`}
              </TableCell>
              <TableCell className="text-right">
                {strategy.isActive ? (
                  <div className="flex items-center justify-end">
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <Badge variant="outline">Inactive</Badge>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewDetails(strategy.id)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StrategyComparisonTable;
