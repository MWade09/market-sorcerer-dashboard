
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";

const TradingHistory = () => {
  // This would typically come from an API or state
  const tradeHistory = [
    {
      id: 1,
      pair: "BTC/USDT",
      type: "buy",
      entryPrice: 36420.50,
      exitPrice: 36890.20,
      amount: 0.05,
      profit: 23.48,
      profitPercentage: 1.29,
      date: "2023-05-15 14:30",
      strategy: "RSI Momentum"
    },
    {
      id: 2,
      pair: "ETH/USDT",
      type: "sell",
      entryPrice: 2540.80,
      exitPrice: 2480.30,
      amount: 0.5,
      profit: -30.25,
      profitPercentage: -2.37,
      date: "2023-05-15 12:45",
      strategy: "Moving Average"
    },
    {
      id: 3,
      pair: "BTC/USDT",
      type: "buy",
      entryPrice: 35980.40,
      exitPrice: 36420.50,
      amount: 0.04,
      profit: 17.60,
      profitPercentage: 1.22,
      date: "2023-05-14 23:15",
      strategy: "Bollinger Bands"
    },
    {
      id: 4,
      pair: "SOL/USDT",
      type: "buy",
      entryPrice: 102.50,
      exitPrice: 106.30,
      amount: 5,
      profit: 19.00,
      profitPercentage: 3.71,
      date: "2023-05-14 18:20",
      strategy: "RSI Momentum"
    },
    {
      id: 5,
      pair: "ETH/USDT",
      type: "buy",
      entryPrice: 2480.30,
      exitPrice: 2540.80,
      amount: 0.4,
      profit: 24.20,
      profitPercentage: 2.44,
      date: "2023-05-14 10:30",
      strategy: "Moving Average"
    },
  ];

  return (
    <div>
      <Table>
        <TableCaption>Recent trading activity</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Pair</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Strategy</TableHead>
            <TableHead className="text-right">Entry</TableHead>
            <TableHead className="text-right">Exit</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">P/L</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeHistory.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell className="font-medium">{trade.pair}</TableCell>
              <TableCell>
                <Badge variant={trade.type === "buy" ? "default" : "destructive"} className="flex w-16 justify-center items-center gap-1">
                  {trade.type === "buy" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {trade.type}
                </Badge>
              </TableCell>
              <TableCell>{trade.strategy}</TableCell>
              <TableCell className="text-right">${trade.entryPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">${trade.exitPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">{trade.amount}</TableCell>
              <TableCell className={`text-right font-medium ${trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} ({trade.profitPercentage.toFixed(2)}%)
              </TableCell>
              <TableCell className="text-right">{trade.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradingHistory;
