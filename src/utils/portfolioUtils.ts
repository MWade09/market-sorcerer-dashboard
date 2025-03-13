
import { PortfolioAsset, CorrelationData } from '@/lib/types';
import { portfolioOptimizationService } from '@/services/portfolioOptimizationService';

/**
 * Get initial assets for portfolio optimization
 */
export const getInitialAssets = (): PortfolioAsset[] => {
  return portfolioOptimizationService.getMockAssets();
};

/**
 * Generate correlation matrix for the given assets
 */
export const generateCorrelationMatrix = (assets: PortfolioAsset[]): CorrelationData[] => {
  return portfolioOptimizationService.generateCorrelationMatrix(assets);
};

/**
 * Update a specific asset with the provided updates
 */
export const updateAssetInList = (
  assets: PortfolioAsset[],
  assetId: string,
  updates: Partial<PortfolioAsset>
): PortfolioAsset[] => {
  return assets.map(asset => 
    asset.id === assetId ? { ...asset, ...updates } : asset
  );
};

/**
 * Add a new asset to the asset list
 */
export const addAssetToList = (
  assets: PortfolioAsset[],
  newAsset: PortfolioAsset
): PortfolioAsset[] => {
  return [...assets, newAsset];
};

/**
 * Remove an asset from the asset list by ID
 */
export const removeAssetFromList = (
  assets: PortfolioAsset[],
  assetId: string
): PortfolioAsset[] => {
  return assets.filter(asset => asset.id !== assetId);
};
