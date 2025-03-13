
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts';
import { PortfolioAsset, PortfolioAllocation } from '@/lib/types';

interface RiskReturnScatterProps {
  assets: PortfolioAsset[];
  optimizedPortfolio?: PortfolioAllocation | null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPortfolio = 'sharpeRatio' in data;
    
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">
          {isPortfolio ? 'Optimized Portfolio' : `${data.name} (${data.symbol})`}
        </p>
        <p className="text-sm">Expected Return: {(data.expectedReturn * 100).toFixed(1)}%</p>
        <p className="text-sm">Volatility: {(data.volatility * 100).toFixed(1)}%</p>
        {isPortfolio && (
          <p className="text-sm">Sharpe Ratio: {data.sharpeRatio.toFixed(2)}</p>
        )}
        {!isPortfolio && (
          <p className="text-xs text-muted-foreground mt-1">
            Allocation: {data.allocation.toFixed(1)}%
          </p>
        )}
      </div>
    );
  }
  return null;
};

const RiskReturnScatter: React.FC<RiskReturnScatterProps> = ({ assets, optimizedPortfolio }) => {
  // Format data for the scatter plot
  const scatterData = assets.map(asset => ({
    ...asset,
    // Convert to percentage for display
    expectedReturn: asset.expectedReturn * 100,
    volatility: asset.volatility * 100
  }));
  
  // Add optimized portfolio if available
  const portfolioPoint = optimizedPortfolio ? [{
    name: 'Portfolio',
    symbol: 'PORTFOLIO',
    expectedReturn: optimizedPortfolio.expectedReturn,
    volatility: optimizedPortfolio.volatility,
    sharpeRatio: optimizedPortfolio.sharpeRatio
  }] : [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Risk vs Return Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="volatility" 
                name="Volatility" 
                unit="%" 
                domain={[0, 'dataMax + 10']}
              >
                <Label
                  value="Volatility (Risk)"
                  position="insideBottom"
                  offset={-10}
                />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="expectedReturn" 
                name="Expected Return" 
                unit="%" 
                domain={[0, 'dataMax + 5']}
              >
                <Label
                  value="Expected Return"
                  position="insideLeft"
                  angle={-90}
                  offset={-5}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              
              {/* Risk-free rate reference */}
              <ReferenceLine
                y={2.5}
                stroke="#666"
                strokeDasharray="3 3"
              >
                <Label value="Risk-free rate (2.5%)" position="right" />
              </ReferenceLine>
              
              {/* Individual assets */}
              <Scatter
                name="Assets"
                data={scatterData}
                fill="#3b82f6"
              />
              
              {/* Optimized portfolio */}
              {optimizedPortfolio && (
                <Scatter
                  name="Portfolio"
                  data={portfolioPoint}
                  fill="#22c55e"
                  shape="diamond"
                  line={{ stroke: '#22c55e' }}
                  lineType="fitting"
                />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-start items-center gap-4 mt-3">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></div>
            <span className="text-xs">Individual Assets</span>
          </div>
          {optimizedPortfolio && (
            <div className="flex items-center">
              <div className="w-3 h-3 rotate-45 bg-green-500 mr-1.5"></div>
              <span className="text-xs">Optimized Portfolio</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReturnScatter;
