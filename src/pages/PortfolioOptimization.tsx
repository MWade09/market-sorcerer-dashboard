
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePortfolioOptimization } from '@/hooks/usePortfolioOptimization';
import { OptimizationPreference, PortfolioAsset } from '@/lib/types';

// Import the portfolio components
import CorrelationHeatmap from '@/components/portfolio/CorrelationHeatmap';
import AllocationChart from '@/components/portfolio/AllocationChart';
import RiskReturnScatter from '@/components/portfolio/RiskReturnScatter';
import PortfolioMetrics from '@/components/portfolio/PortfolioMetrics';
import AssetTable from '@/components/portfolio/AssetTable';
import OptimizationForm from '@/components/portfolio/OptimizationForm';

const PortfolioOptimization = () => {
  const {
    assets,
    optimizedPortfolio,
    correlationData,
    isLoading,
    optimizePortfolio,
    updateAsset
  } = usePortfolioOptimization();
  
  const [activeTab, setActiveTab] = useState('correlation');
  
  const handleOptimize = (preferences: OptimizationPreference) => {
    optimizePortfolio(preferences);
    // Switch to the allocation tab after optimization
    if (activeTab === 'correlation') {
      setActiveTab('allocation');
    }
  };
  
  const handleQuantityChange = (assetId: string, quantity: number) => {
    updateAsset(assetId, { quantity });
  };
  
  // Extract just the symbols for the correlation heatmap
  const assetSymbols = assets.map(asset => asset.symbol);
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Portfolio Optimization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Asset Table</CardTitle>
              <CardDescription>
                Available assets for portfolio optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssetTable 
                assets={assets} 
                optimized={false} 
                onQuantityChange={handleQuantityChange}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <OptimizationForm 
            assets={assets} 
            onOptimize={handleOptimize} 
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {optimizedPortfolio && (
        <div className="mb-6">
          <PortfolioMetrics portfolio={optimizedPortfolio} />
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
          <TabsTrigger value="allocation">
            Allocation Analysis
            {optimizedPortfolio && <span className="ml-1 text-xs">(Optimized)</span>}
          </TabsTrigger>
          <TabsTrigger value="risk">Risk-Return Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="correlation">
          <CorrelationHeatmap 
            correlationData={correlationData} 
            assets={assetSymbols}
          />
        </TabsContent>
        
        <TabsContent value="allocation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {optimizedPortfolio ? (
              <>
                <AllocationChart assets={optimizedPortfolio.assets} />
                <Card>
                  <CardHeader>
                    <CardTitle>Optimized Allocations</CardTitle>
                    <CardDescription>
                      Suggested asset allocations based on your risk profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AssetTable 
                      assets={optimizedPortfolio.assets.filter(a => a.allocation > 0)} 
                      optimized={true}
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No Allocation Data</h3>
                    <p className="text-muted-foreground mb-4">
                      Run the portfolio optimization to see allocation recommendations
                    </p>
                    <Button onClick={() => setActiveTab('correlation')}>
                      Go to Correlation Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="risk">
          <RiskReturnScatter 
            assets={assets}
            optimizedPortfolio={optimizedPortfolio}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioOptimization;
