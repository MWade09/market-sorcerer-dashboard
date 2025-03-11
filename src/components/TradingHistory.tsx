
import React from 'react';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  Search,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { TradeHistory } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { tradeHistory } from '@/utils/mockData';

const TradingHistory = () => {
  return (
    <div className="content-panel">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trades..." className="pl-8" />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="h-4 w-4 mr-2" />
            Date
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-muted-foreground text-sm">Type</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground text-sm">Symbol</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground text-sm">Entry</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground text-sm">Exit</th>
              <th className="text-right py-2 px-4 font-medium text-muted-foreground text-sm">P/L</th>
              <th className="text-right py-2 px-4 font-medium text-muted-foreground text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory.map((trade) => (
              <tr key={trade.id} className="border-b hover:bg-accent/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      trade.type === 'long' 
                        ? "bg-green-500/10 text-green-600" 
                        : "bg-red-500/10 text-red-600"
                    )}>
                      {trade.type === 'long' ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                    </div>
                    <span className="capitalize text-sm">{trade.type}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">{trade.symbol}</td>
                <td className="py-3 px-4 text-sm">${trade.entryPrice.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm">${trade.exitPrice.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">
                  <div className={cn(
                    "font-medium",
                    trade.isProfit ? "text-green-600" : "text-red-600"
                  )}>
                    {trade.isProfit ? "+" : ""}{trade.pnl.toFixed(2)} ({trade.pnlPercentage.toFixed(2)}%)
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                  <div className="flex items-center justify-end gap-1">
                    <Calendar className="h-3 w-3" />
                    {trade.closeTime.toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingHistory;
