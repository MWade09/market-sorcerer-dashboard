
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PortfolioAsset } from '@/lib/types';

interface AllocationChartProps {
  assets: PortfolioAsset[];
}

const COLORS = [
  '#22c55e', '#eab308', '#3b82f6', '#ec4899', '#a855f7', 
  '#14b8a6', '#f97316', '#64748b', '#6366f1', '#84cc16'
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{data.name} ({data.symbol})</p>
        <p className="text-sm">Allocation: {data.allocation}%</p>
        <p className="text-xs text-muted-foreground mt-1">Expected Return: {(data.expectedReturn * 100).toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">Volatility: {(data.volatility * 100).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const AllocationChart: React.FC<AllocationChartProps> = ({ assets }) => {
  // Filter out assets with zero allocation
  const allocatedAssets = assets.filter(asset => asset.allocation > 0);
  
  // Sort assets by allocation (descending)
  const sortedAssets = [...allocatedAssets].sort((a, b) => b.allocation - a.allocation);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {sortedAssets.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sortedAssets}
                  dataKey="allocation"
                  nameKey="symbol"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ symbol, allocation }) => `${symbol} ${allocation}%`}
                >
                  {sortedAssets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No allocation data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllocationChart;
