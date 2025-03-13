
import { useState, useCallback } from 'react';
import { 
  PortfolioAsset, 
  PortfolioAllocation, 
  OptimizationPreference,
  CorrelationData 
} from '@/lib/types';
import { portfolioOptimizationService } from '@/services/portfolioOptimizationService';
import { generateCorrelationMatrix } from '@/utils/portfolioUtils';
import { toast } from 'sonner';

/**
 * Hook for handling the optimization process
 */
export const useOptimizationProcess = (assets: PortfolioAsset[]) => {
  const [optimizedPortfolio, setOptimizedPortfolio] = useState<PortfolioAllocation | null>(null);
  const [correlationData, setCorrelationData] = useState<CorrelationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const optimizePortfolio = useCallback(async (preferences: OptimizationPreference) => {
    try {
      setIsLoading(true);
      
      // Generate correlation matrix
      const correlations = generateCorrelationMatrix(assets);
      setCorrelationData(correlations);
      
      // Optimize portfolio
      const optimized = portfolioOptimizationService.optimizePortfolio(assets, preferences);
      setOptimizedPortfolio(optimized);
      
      toast.success('Portfolio optimization complete', {
        description: `${optimized.assets.length} assets optimized for ${preferences.riskTolerance} risk profile`
      });
    } catch (error) {
      console.error('Failed to optimize portfolio:', error);
      toast.error('Portfolio optimization failed', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  }, [assets]);
  
  return {
    optimizedPortfolio,
    correlationData,
    isLoading,
    optimizePortfolio
  };
};
