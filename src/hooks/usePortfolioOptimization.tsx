
import { useState, useCallback } from 'react';
import { 
  PortfolioAsset, 
  PortfolioAllocation, 
  OptimizationPreference,
  CorrelationData 
} from '@/lib/types';
import { portfolioOptimizationService } from '@/services/portfolioOptimizationService';
import { toast } from 'sonner';

export const usePortfolioOptimization = () => {
  const [assets, setAssets] = useState<PortfolioAsset[]>(
    portfolioOptimizationService.getMockAssets()
  );
  const [optimizedPortfolio, setOptimizedPortfolio] = useState<PortfolioAllocation | null>(null);
  const [correlationData, setCorrelationData] = useState<CorrelationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const optimizePortfolio = useCallback(async (preferences: OptimizationPreference) => {
    try {
      setIsLoading(true);
      
      // Generate correlation matrix
      const correlations = portfolioOptimizationService.generateCorrelationMatrix(assets);
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
  
  const updateAsset = useCallback((assetId: string, updates: Partial<PortfolioAsset>) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId ? { ...asset, ...updates } : asset
    ));
  }, []);
  
  const addAsset = useCallback((asset: PortfolioAsset) => {
    setAssets(prev => [...prev, asset]);
  }, []);
  
  const removeAsset = useCallback((assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  }, []);
  
  return {
    assets,
    optimizedPortfolio,
    correlationData,
    isLoading,
    optimizePortfolio,
    updateAsset,
    addAsset,
    removeAsset
  };
};
