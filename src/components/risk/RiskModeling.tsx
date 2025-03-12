
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  LineChart, 
  Activity, 
  Settings, 
  Shield, 
  Eye, 
  BarChart, 
  CircleDollarSign,
  PieChart,
  Layers
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RiskMetrics, PortfolioRisk, RiskAlert, RiskPreference } from '@/lib/types';
import { RiskAlertsList } from './RiskAlertsList';
import { RiskPreferencesForm } from './RiskPreferencesForm';
import RiskExposureChart from './RiskExposureChart';
import RiskMetricsDisplay from './RiskMetricsDisplay';

// Mock data for demonstration
const mockRiskMetrics: RiskMetrics = {
  valueAtRisk: 3.25,
  maxDrawdown: 12.4,
  sharpeRatio: 1.8,
  volatility: 15.2,
  beta: 1.2
};

const mockPortfolioRisk: PortfolioRisk = {
  totalValueAtRisk: 2450,
  totalExposure: 42000,
  netExposure: 28000,
  grossExposure: 56000,
  leverageRatio: 1.8,
  concentrationRisk: {
    'BTC': 45,
    'ETH': 25,
    'SOL': 15,
    'Others': 15
  },
  assetClassRisk: {
    'Large Cap': 60,
    'Mid Cap': 30,
    'Small Cap': 10
  }
};

const mockRiskAlerts: RiskAlert[] = [
  {
    id: '1',
    severity: 'high',
    type: 'exposure',
    message: 'High BTC exposure exceeds 40% of portfolio',
    affectedStrategies: ['My RSI Strategy', 'MA Crossover'],
    timestamp: new Date(),
    isAcknowledged: false
  },
  {
    id: '2',
    severity: 'medium',
    type: 'volatility',
    message: 'Increased market volatility detected',
    affectedStrategies: ['All strategies'],
    timestamp: new Date(Date.now() - 3600000),
    isAcknowledged: false
  },
  {
    id: '3',
    severity: 'low',
    type: 'correlation',
    message: 'High correlation between active strategies',
    affectedStrategies: ['RSI Strategy', 'Bollinger Strategy'],
    timestamp: new Date(Date.now() - 86400000),
    isAcknowledged: true
  }
];

const mockRiskPreference: RiskPreference = {
  maxDrawdown: 15,
  maxDailyLoss: 5,
  maxPositionSize: 10,
  maxLeverage: 2,
  maxConcentration: 30,
  riskToleranceLevel: 'moderate'
};

const RiskModeling: React.FC = () => {
  const [riskMetrics] = useState<RiskMetrics>(mockRiskMetrics);
  const [portfolioRisk] = useState<PortfolioRisk>(mockPortfolioRisk);
  const [riskAlerts] = useState<RiskAlert[]>(mockRiskAlerts);
  const [riskPreference, setRiskPreference] = useState<RiskPreference>(mockRiskPreference);
  const [activeTab, setActiveTab] = useState('overview');

  const getRiskLevel = (value: number, threshold1: number, threshold2: number) => {
    if (value < threshold1) return 'low';
    if (value < threshold2) return 'medium';
    return 'high';
  };

  const getUtilizationPercentage = () => {
    // Calculate how much of the risk budget is used
    const maxDrawdownUtilization = (portfolioRisk.totalValueAtRisk / (portfolioRisk.totalExposure * (riskPreference.maxDrawdown / 100))) * 100;
    return Math.min(Math.round(maxDrawdownUtilization), 100);
  };

  const updateRiskPreference = (newPreference: RiskPreference) => {
    setRiskPreference(newPreference);
  };

  return (
    <div className="content-panel">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Risk Management</h2>
          <p className="text-sm text-muted-foreground">
            Monitor and manage trading risk across all strategies and positions
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Risk Report
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview" className="flex gap-2 items-center">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="exposure" className="flex gap-2 items-center">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Exposure</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex gap-2 items-center">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
            {riskAlerts.filter(alert => !alert.isAcknowledged).length > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {riskAlerts.filter(alert => !alert.isAcknowledged).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex gap-2 items-center">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    ${getRiskLevel(riskMetrics.valueAtRisk, 2, 4) === 'low' ? 'bg-green-100 text-green-800' :
                      getRiskLevel(riskMetrics.valueAtRisk, 2, 4) === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'}
                  `}>
                    <span className="text-2xl font-bold">{riskMetrics.valueAtRisk}%</span>
                  </div>
                  <p className="mt-2 text-sm text-center">
                    Daily Value at Risk (95% confidence)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Risk Budget Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used: {getUtilizationPercentage()}%</span>
                    <span>Limit: 100%</span>
                  </div>
                  <Progress value={getUtilizationPercentage()} />
                  <p className="text-xs text-muted-foreground">
                    Based on your maximum drawdown tolerance of {riskPreference.maxDrawdown}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Key Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Max Drawdown</p>
                    <p className="text-sm font-medium">{riskMetrics.maxDrawdown}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Volatility</p>
                    <p className="text-sm font-medium">{riskMetrics.volatility}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                    <p className="text-sm font-medium">{riskMetrics.sharpeRatio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Beta</p>
                    <p className="text-sm font-medium">{riskMetrics.beta}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Risk Exposure by Strategy</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RiskExposureChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Concentration Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(portfolioRisk.concentrationRisk).map(([asset, percentage]) => (
                    <div key={asset} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{asset}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage} className={
                        percentage > riskPreference.maxConcentration ? "bg-red-100" : ""
                      } />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Exposure Tab */}
        <TabsContent value="exposure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Portfolio Exposure</CardTitle>
                <CardDescription>Current allocation and exposure metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Gross Exposure</p>
                      <p className="text-lg font-medium">${portfolioRisk.grossExposure.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Net Exposure</p>
                      <p className="text-lg font-medium">${portfolioRisk.netExposure.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Leverage Ratio</p>
                      <p className="text-lg font-medium">{portfolioRisk.leverageRatio}x</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Value at Risk</p>
                      <p className="text-lg font-medium">${portfolioRisk.totalValueAtRisk.toLocaleString()}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Exposure Distribution</h4>
                    <div className="flex h-4 w-full overflow-hidden rounded-full">
                      <div className="bg-blue-500 h-full" style={{ width: '60%' }}></div>
                      <div className="bg-red-500 h-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-blue-500">Long 60%</span>
                      <span className="text-red-500">Short 40%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Asset Class Breakdown</CardTitle>
                <CardDescription>Exposure by asset class category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(portfolioRisk.assetClassRisk).map(([assetClass, percentage]) => (
                    <div key={assetClass} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{assetClass}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Strategy Risk Contribution</CardTitle>
              <CardDescription>How each strategy contributes to overall portfolio risk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <RiskMetricsDisplay />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <RiskAlertsList alerts={riskAlerts} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <RiskPreferencesForm 
            preferences={riskPreference} 
            onUpdate={updateRiskPreference} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskModeling;
