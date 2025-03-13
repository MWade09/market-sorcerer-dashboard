
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PortfolioAsset } from '@/lib/types';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  GemIcon,
  ShieldIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssetTableProps {
  assets: PortfolioAsset[];
  optimized?: boolean;
  onQuantityChange?: (assetId: string, quantity: number) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ 
  assets, 
  optimized = false,
  onQuantityChange
}) => {
  const calculateRiskScore = (volatility: number) => {
    if (volatility < 0.2) return 'Low';
    if (volatility < 0.5) return 'Medium';
    return 'High';
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Expected Return</TableHead>
            <TableHead className="text-right">Risk</TableHead>
            {optimized && (
              <TableHead className="text-right">Allocation</TableHead>
            )}
            {onQuantityChange && (
              <TableHead className="text-right">Quantity</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">{asset.symbol}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell className="text-right">
                ${asset.price.toLocaleString(undefined, {
                  minimumFractionDigits: asset.price < 1 ? 4 : 2,
                  maximumFractionDigits: asset.price < 1 ? 4 : 2,
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {(asset.expectedReturn * 100).toFixed(1)}%
                  {asset.expectedReturn > 0.1 ? (
                    <GemIcon className="ml-1 h-4 w-4 text-green-500" />
                  ) : (
                    <ShieldIcon className="ml-1 h-4 w-4 text-blue-500" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  asset.volatility < 0.2 
                    ? "bg-green-100 text-green-800" 
                    : asset.volatility < 0.5 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-red-100 text-red-800"
                )}>
                  {calculateRiskScore(asset.volatility)}
                </div>
              </TableCell>
              {optimized && (
                <TableCell className="text-right font-medium">
                  {asset.allocation > 0 && `${asset.allocation}%`}
                </TableCell>
              )}
              {onQuantityChange && (
                <TableCell className="text-right">
                  <input 
                    type="number"
                    className="w-20 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background"
                    value={asset.quantity || 0}
                    min={0}
                    step={asset.price > 1000 ? 0.01 : 1}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && onQuantityChange) {
                        onQuantityChange(asset.id, value);
                      }
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetTable;
