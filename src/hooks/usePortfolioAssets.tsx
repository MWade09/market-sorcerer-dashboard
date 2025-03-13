
import { useState, useCallback } from 'react';
import { PortfolioAsset } from '@/lib/types';
import { 
  getInitialAssets, 
  updateAssetInList, 
  addAssetToList,
  removeAssetFromList
} from '@/utils/portfolioUtils';

/**
 * Hook for managing portfolio assets
 */
export const usePortfolioAssets = () => {
  const [assets, setAssets] = useState<PortfolioAsset[]>(getInitialAssets());
  
  const updateAsset = useCallback((assetId: string, updates: Partial<PortfolioAsset>) => {
    setAssets(prev => updateAssetInList(prev, assetId, updates));
  }, []);
  
  const addAsset = useCallback((asset: PortfolioAsset) => {
    setAssets(prev => addAssetToList(prev, asset));
  }, []);
  
  const removeAsset = useCallback((assetId: string) => {
    setAssets(prev => removeAssetFromList(prev, assetId));
  }, []);
  
  return {
    assets,
    updateAsset,
    addAsset,
    removeAsset
  };
};
