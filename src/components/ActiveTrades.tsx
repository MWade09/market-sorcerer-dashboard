import React from 'react';
import { Clock, TrendingUp, TrendingDown, X, BarChart3, Edit } from 'lucide-react';
import { TradePosition } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ActiveTradesProps {
  positions: TradePosition[];
}

const ActiveTrades: React.FC<ActiveTradesProps> = ({ positions }) => {
  const [selectedPosition, setSelectedPosition] = React.useState<TradePosition | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: value >= 1 ? 2 : 6
    });
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const handleClosePosition = (position: TradePosition) => {
    toast({
      title: "Position closed",
      description: `${position.type.toUpperCase()} position closed at ${formatCurrency(position.currentPrice)}`,
      variant: "default"
    });
  };

  return (
    <div className="content-panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Active Positions</h2>
      </div>

      {positions.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No active positions</p>
        </div>
      ) : (
        <div className="space-y-3">
          {positions.map((position) => (
            <div 
              key={position.id} 
              className="p-3 border rounded-md transition-colors hover:bg-accent/50 cursor-pointer"
              onClick={() => setSelectedPosition(position)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center",
                    position.type === 'long' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                  )}>
                    {position.type === 'long' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{position.symbol}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(position.openTime).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "font-medium",
                    position.pnl >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {formatCurrency(position.pnl)} ({formatPercentage(position.pnlPercentage)})
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {position.quantity} @ {formatCurrency(position.entryPrice)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Position Details Dialog */}
      <Dialog open={!!selectedPosition} onOpenChange={(open) => !open && setSelectedPosition(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Position Details</DialogTitle>
          </DialogHeader>
          {selectedPosition && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-md flex items-center justify-center",
                  selectedPosition.type === 'long' ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                )}>
                  {selectedPosition.type === 'long' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-medium">{selectedPosition.symbol} {selectedPosition.type.toUpperCase()}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BarChart3 className="h-3.5 w-3.5 mr-1" />
                    {selectedPosition.strategy}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Entry Price</p>
                  <p className="text-lg font-medium">{formatCurrency(selectedPosition.entryPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="text-lg font-medium">{formatCurrency(selectedPosition.currentPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="text-lg font-medium">{selectedPosition.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Position Size</p>
                  <p className="text-lg font-medium">{formatCurrency(selectedPosition.entryPrice * selectedPosition.quantity)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Profit/Loss</p>
                <p className={cn(
                  "text-xl font-medium",
                  selectedPosition.pnl >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {formatCurrency(selectedPosition.pnl)} ({formatPercentage(selectedPosition.pnlPercentage)})
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                {selectedPosition.stopLoss && (
                  <div>
                    <p className="text-sm text-muted-foreground">Stop Loss</p>
                    <p className="text-red-600 font-medium">{formatCurrency(selectedPosition.stopLoss)}</p>
                  </div>
                )}
                
                {selectedPosition.takeProfit && (
                  <div>
                    <p className="text-sm text-muted-foreground">Take Profit</p>
                    <p className="text-green-600 font-medium">{formatCurrency(selectedPosition.takeProfit)}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between gap-2 mt-4">
                <Button variant="outline" onClick={() => setSelectedPosition(null)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Position
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    handleClosePosition(selectedPosition);
                    setSelectedPosition(null);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Close Position
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveTrades;
