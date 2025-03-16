
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
  
  // Define vibrant color scheme for charts with high contrast against dark background
  const chartColors = [
    '#b084fc', // Bright purple (primary)
    '#60a5fa', // Bright blue
    '#4ade80', // Bright green
    '#fb923c', // Bright orange
    '#f472b6', // Bright pink
    '#22d3ee', // Bright cyan
    '#fbbf24', // Bright amber
    '#818cf8', // Bright indigo
    '#e879f9'  // Bright magenta
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
