
import React from 'react';
import { PerformanceMetric } from '@/lib/types';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProgressWithIndicator } from '@/components/ui/progress-with-indicator';
import { cn } from '@/lib/utils';

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <div className="content-panel">
      <h2 className="text-lg font-medium mb-4">Performance Metrics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-3 border rounded-md">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{metric.label}</span>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="inline-flex">
                      <InfoCircledIcon className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{metric.info}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {metric.change !== undefined && (
                <div className={cn(
                  "text-xs flex items-center",
                  metric.change >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {metric.change >= 0 ? (
                    <ArrowUpIcon className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(metric.change).toFixed(1)}%
                </div>
              )}
            </div>
            
            <div className="text-base font-medium truncate">
              {metric.value}
            </div>
            
            {/* Progress bar visualizations for certain metrics */}
            {(metric.label.includes('Win Rate') || metric.label.includes('Max Drawdown')) && (
              <div className="mt-2">
                <ProgressWithIndicator 
                  value={
                    metric.label.includes('Win Rate')
                      ? typeof metric.value === 'string' 
                        ? parseFloat(metric.value.replace('%', ''))
                        : metric.value
                      : typeof metric.value === 'string'
                        ? parseFloat(metric.value.replace('%', ''))
                        : metric.value
                  } 
                  max={
                    metric.label.includes('Win Rate') ? 100 : 20
                  }
                  className={cn(
                    "h-1.5",
                    metric.label.includes('Win Rate') ? "bg-muted" : "bg-red-100"
                  )}
                  indicatorClassName={
                    metric.label.includes('Win Rate') ? "bg-green-500" : "bg-red-500"
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
