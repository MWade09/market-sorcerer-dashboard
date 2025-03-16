
import { usePortfolioAssets } from './usePortfolioAssets';
import { useOptimizationProcess } from './useOptimizationProcess';

/**
 * Main hook that combines asset management and optimization process
 * with enhanced visual feedback and brighter color scheme
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
  
  // Define vibrant color scheme for charts
  const chartColors = [
    '#8B5CF6', // Purple (primary)
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F97316', // Orange
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#F59E0B', // Amber
    '#6366F1', // Indigo
    '#D946EF'  // Magenta
  ];
  
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
    optimizePortfolio,
    
    // Visual enhancements
    chartColors
  };
};
