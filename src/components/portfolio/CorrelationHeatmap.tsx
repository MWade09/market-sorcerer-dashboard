
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CorrelationData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CorrelationHeatmapProps {
  correlationData: CorrelationData[];
  assets: string[];
}

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ correlationData, assets }) => {
  // Convert linear correlation data to a matrix for easier rendering
  const correlationMatrix: Record<string, Record<string, number>> = {};
  
  // Initialize the matrix with empty values
  assets.forEach(assetA => {
    correlationMatrix[assetA] = {};
    assets.forEach(assetB => {
      correlationMatrix[assetA][assetB] = 0;
    });
  });
  
  // Fill the matrix with correlation values
  correlationData.forEach(({ assetA, assetB, correlation }) => {
    if (correlationMatrix[assetA] && assets.includes(assetB)) {
      correlationMatrix[assetA][assetB] = correlation;
    }
  });
  
  // Function to get color based on correlation value
  const getCorrelationColor = (value: number): string => {
    // Strong negative correlation: red
    // No correlation: white
    // Strong positive correlation: green
    
    if (value === 1) {
      return 'bg-emerald-600 text-white'; // Perfect correlation (diagonal)
    } else if (value > 0.7) {
      return 'bg-emerald-500 text-white';
    } else if (value > 0.3) {
      return 'bg-emerald-400 text-gray-900';
    } else if (value > 0) {
      return 'bg-emerald-300 text-gray-900';
    } else if (value === 0) {
      return 'bg-gray-200 text-gray-900';
    } else if (value > -0.3) {
      return 'bg-red-300 text-gray-900';
    } else if (value > -0.7) {
      return 'bg-red-400 text-gray-900';
    } else {
      return 'bg-red-500 text-white';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Asset Correlation Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[400px]">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 font-medium text-xs sticky left-0 z-10 bg-background border-b"></th>
                {assets.map(asset => (
                  <th key={asset} className="p-2 font-medium text-xs border-b">
                    {asset}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assets.map(assetA => (
                <tr key={assetA}>
                  <th className="p-2 font-medium text-xs text-left sticky left-0 z-10 bg-background border-r">
                    {assetA}
                  </th>
                  {assets.map(assetB => {
                    const correlation = correlationMatrix[assetA][assetB];
                    return (
                      <TooltipProvider key={`${assetA}-${assetB}`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <td 
                              className={cn(
                                "p-2 text-center text-xs w-14 h-14",
                                getCorrelationColor(correlation)
                              )}
                            >
                              {correlation.toFixed(2)}
                            </td>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              Correlation between {assetA} and {assetB}: {correlation.toFixed(2)}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-red-500 mr-1"></div>
            <span>-1.0 (Perfect negative correlation)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-gray-200 mr-1"></div>
            <span>0 (No correlation)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-emerald-500 mr-1"></div>
            <span>+1.0 (Perfect positive correlation)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
