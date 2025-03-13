
import { PortfolioAsset, PortfolioAllocation, OptimizationPreference, CorrelationData } from '@/lib/types';
import { toast } from 'sonner';

class PortfolioOptimizationService {
  // Generate mock correlation data - would be calculated from historical returns in a real implementation
  generateCorrelationMatrix(assets: PortfolioAsset[]): CorrelationData[] {
    const correlationMatrix: CorrelationData[] = [];
    
    for (let i = 0; i < assets.length; i++) {
      for (let j = i; j < assets.length; j++) {
        // Self correlation is 1
        if (i === j) {
          correlationMatrix.push({
            assetA: assets[i].symbol,
            assetB: assets[j].symbol,
            correlation: 1
          });
        } else {
          // Generate a random correlation between -1 and 1, but with bias toward realistic values
          // In reality this would be calculated from covariance of returns
          const baseCorrelation = Math.random() * 0.8 - 0.4;  // Typically correlations are between -0.4 and 0.4
          const correlation = Math.round(baseCorrelation * 100) / 100;  // Round to 2 decimal places
          
          correlationMatrix.push({
            assetA: assets[i].symbol,
            assetB: assets[j].symbol,
            correlation
          });
          
          // Add the symmetric correlation
          correlationMatrix.push({
            assetA: assets[j].symbol,
            assetB: assets[i].symbol,
            correlation
          });
        }
      }
    }
    
    return correlationMatrix;
  }
  
  // Mean-variance optimization (simplified implementation)
  optimizePortfolio(assets: PortfolioAsset[], preferences: OptimizationPreference): PortfolioAllocation {
    try {
      // Apply constraints
      const constraints = preferences.constraints;
      let filteredAssets = [...assets];
      
      // Filter by included/excluded assets
      if (constraints.includedAssets && constraints.includedAssets.length > 0) {
        filteredAssets = filteredAssets.filter(asset => 
          constraints.includedAssets!.includes(asset.symbol)
        );
      }
      
      if (constraints.excludedAssets && constraints.excludedAssets.length > 0) {
        filteredAssets = filteredAssets.filter(asset => 
          !constraints.excludedAssets!.includes(asset.symbol)
        );
      }
      
      // In a real implementation, we would use quadratic programming to optimize based on 
      // mean-variance optimization, but for this simplified version, we use a heuristic approach
      
      // Apply different allocation strategies based on risk tolerance
      let optimizedAssets: PortfolioAsset[] = [];
      let totalWeight = 0;
      
      switch (preferences.riskTolerance) {
        case 'low':
          // Lower risk: allocate more to lower volatility assets
          optimizedAssets = filteredAssets.map(asset => {
            // Inverse of volatility as weight
            const weight = 1 / (asset.volatility * asset.volatility);
            totalWeight += weight;
            return { ...asset, weight };
          });
          break;
          
        case 'moderate':
          // Moderate risk: balance risk and return (Sharpe ratio approach)
          optimizedAssets = filteredAssets.map(asset => {
            // Simplified Sharpe ratio as weight
            const weight = asset.expectedReturn / asset.volatility;
            totalWeight += weight;
            return { ...asset, weight };
          });
          break;
          
        case 'high':
          // Higher risk: focus on return
          optimizedAssets = filteredAssets.map(asset => {
            // Expected return as weight
            const weight = asset.expectedReturn;
            totalWeight += weight;
            return { ...asset, weight };
          });
          break;
      }
      
      // Normalize weights to sum to 1 (100%)
      optimizedAssets = optimizedAssets.map(asset => {
        const normalizedWeight = asset.weight / totalWeight;
        
        // Apply min/max constraints if specified
        let allocation = normalizedWeight;
        if (constraints.minAllocation !== undefined) {
          allocation = Math.max(allocation, constraints.minAllocation);
        }
        if (constraints.maxAllocation !== undefined) {
          allocation = Math.min(allocation, constraints.maxAllocation);
        }
        
        return {
          ...asset,
          allocation: Math.round(allocation * 10000) / 100 // Convert to percentage with 2 decimals
        };
      });
      
      // Re-normalize if constraints were applied
      const totalAllocation = optimizedAssets.reduce((sum, asset) => sum + asset.allocation, 0);
      if (Math.abs(totalAllocation - 100) > 0.01) {
        // Adjust to make total exactly 100%
        const adjustmentFactor = 100 / totalAllocation;
        optimizedAssets = optimizedAssets.map(asset => ({
          ...asset,
          allocation: Math.round(asset.allocation * adjustmentFactor * 100) / 100
        }));
      }
      
      // Calculate portfolio metrics
      const portfolioReturn = optimizedAssets.reduce(
        (sum, asset) => sum + asset.expectedReturn * (asset.allocation / 100),
        0
      );
      
      // Simplified volatility calculation (doesn't account for correlations properly)
      // In a real implementation, we would use the covariance matrix
      const portfolioVolatility = Math.sqrt(
        optimizedAssets.reduce(
          (sum, asset) => sum + Math.pow(asset.volatility * (asset.allocation / 100), 2),
          0
        )
      );
      
      const sharpeRatio = portfolioReturn / portfolioVolatility;
      
      // Return the optimized portfolio
      return {
        assets: optimizedAssets,
        expectedReturn: Math.round(portfolioReturn * 10000) / 100, // Convert to percentage with 2 decimals
        volatility: Math.round(portfolioVolatility * 10000) / 100, // Convert to percentage with 2 decimals
        sharpeRatio: Math.round(sharpeRatio * 100) / 100,
        maxDrawdown: Math.round(portfolioVolatility * 1.5 * 10000) / 100, // Simplified estimate
        riskLevel: preferences.riskTolerance
      };
    } catch (error) {
      console.error('Error in portfolio optimization:', error);
      toast.error('Portfolio optimization failed', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // Return an empty allocation
      return {
        assets: [],
        expectedReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        riskLevel: 'moderate'
      };
    }
  }

  // Generate mock assets - in a real implementation, these would come from API data
  getMockAssets(): PortfolioAsset[] {
    return [
      {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        allocation: 0,
        expectedReturn: 0.15,
        volatility: 0.65,
        weight: 0,
        price: 36700,
        quantity: 0
      },
      {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        allocation: 0,
        expectedReturn: 0.18,
        volatility: 0.70,
        weight: 0,
        price: 2450,
        quantity: 0
      },
      {
        id: '3',
        symbol: 'SOL',
        name: 'Solana',
        allocation: 0,
        expectedReturn: 0.25,
        volatility: 0.85,
        weight: 0,
        price: 145,
        quantity: 0
      },
      {
        id: '4',
        symbol: 'LINK',
        name: 'Chainlink',
        allocation: 0,
        expectedReturn: 0.20,
        volatility: 0.75,
        weight: 0,
        price: 15.8,
        quantity: 0
      },
      {
        id: '5',
        symbol: 'DOT',
        name: 'Polkadot',
        allocation: 0,
        expectedReturn: 0.22,
        volatility: 0.80,
        weight: 0,
        price: 6.7,
        quantity: 0
      },
      {
        id: '6',
        symbol: 'ADA',
        name: 'Cardano',
        allocation: 0,
        expectedReturn: 0.17,
        volatility: 0.68,
        weight: 0,
        price: 0.45,
        quantity: 0
      },
      {
        id: '7',
        symbol: 'USDT',
        name: 'Tether',
        allocation: 0,
        expectedReturn: 0.03,
        volatility: 0.01,
        weight: 0,
        price: 1,
        quantity: 0
      },
      {
        id: '8',
        symbol: 'USDC',
        name: 'USD Coin',
        allocation: 0,
        expectedReturn: 0.025,
        volatility: 0.01,
        weight: 0,
        price: 1,
        quantity: 0
      }
    ];
  }
}

export const portfolioOptimizationService = new PortfolioOptimizationService();
