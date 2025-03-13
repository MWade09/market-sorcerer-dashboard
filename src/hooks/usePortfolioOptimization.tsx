
import { usePortfolioAssets } from './usePortfolioAssets';
import { useOptimizationProcess } from './useOptimizationProcess';

/**
 * Main hook that combines asset management and optimization process
 */
export const usePortfolioOptimization = () => {
  const { 
    assets, 
    updateAsset, 
    addAsset, 
    removeAsset 
  } = usePortfolioAssets();
  
  const { 
    optimizedPortfolio, 
    correlationData, 
    isLoading, 
    optimizePortfolio 
  } = useOptimizationProcess(assets);
  
  return {
    // Asset management
    assets,
    updateAsset,
    addAsset,
    removeAsset,
    
    // Optimization
    optimizedPortfolio,
    correlationData,
    isLoading,
    optimizePortfolio
  };
};
