
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Form
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { OptimizationPreference, PortfolioAsset } from '@/lib/types';
import { formSchema, FormValues } from './form/types';
import RiskToleranceField from './form/RiskToleranceField';
import OptimizationGoalField from './form/OptimizationGoalField';
import StablecoinToggle from './form/StablecoinToggle';
import AdvancedOptionsSection from './form/AdvancedOptionsSection';

interface OptimizationFormProps {
  assets: PortfolioAsset[];
  onOptimize: (preferences: OptimizationPreference) => void;
  isLoading: boolean;
}

const OptimizationForm: React.FC<OptimizationFormProps> = ({
  assets,
  onOptimize,
  isLoading
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riskTolerance: 'moderate',
      optimizationGoal: 'sharpe',
      useConstraints: false,
      minAllocation: 0,
      maxAllocation: 50,
      includeStablecoins: true,
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // Identify stablecoin assets (for simplicity, just look for USDT and USDC)
    const stablecoins = assets
      .filter(asset => ['USDT', 'USDC'].includes(asset.symbol))
      .map(asset => asset.symbol);
    
    // Transform form values to the OptimizationPreference format
    const preferences: OptimizationPreference = {
      riskTolerance: values.riskTolerance,
      optimizationGoal: values.optimizationGoal,
      constraints: {
        minAllocation: values.useConstraints ? values.minAllocation : undefined,
        maxAllocation: values.useConstraints ? values.maxAllocation : undefined,
        excludedAssets: !values.includeStablecoins ? stablecoins : [],
      }
    };
    
    onOptimize(preferences);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portfolio Optimization</CardTitle>
        <CardDescription>
          Configure your risk preferences and optimization parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <RiskToleranceField control={form.control} />
            <OptimizationGoalField control={form.control} />
            <StablecoinToggle control={form.control} />
            
            <AdvancedOptionsSection 
              control={form.control} 
              watch={form.watch} 
              showAdvanced={showAdvanced} 
              setShowAdvanced={setShowAdvanced} 
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Optimizing...' : 'Optimize Portfolio'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OptimizationForm;
