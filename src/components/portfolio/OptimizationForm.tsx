
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { 
  Slider 
} from '@/components/ui/slider';
import { 
  Switch 
} from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { OptimizationPreference, PortfolioAsset } from '@/lib/types';
import { AdjustmentsHorizontalIcon, ChevronDownIcon } from 'lucide-react';

const formSchema = z.object({
  riskTolerance: z.enum(['low', 'moderate', 'high']),
  optimizationGoal: z.enum(['sharpe', 'return', 'risk']),
  useConstraints: z.boolean().default(false),
  minAllocation: z.number().min(0).max(100).optional(),
  maxAllocation: z.number().min(0).max(100).optional(),
  includeStablecoins: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

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
            <FormField
              control={form.control}
              name="riskTolerance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Tolerance</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk tolerance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value === 'low' && "Prioritizes stability with lower returns"}
                    {field.value === 'moderate' && "Balances risk and returns"}
                    {field.value === 'high' && "Aims for maximum returns with higher volatility"}
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="optimizationGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optimization Goal</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select optimization goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sharpe">Maximize Sharpe Ratio</SelectItem>
                      <SelectItem value="return">Maximize Returns</SelectItem>
                      <SelectItem value="risk">Minimize Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value === 'sharpe' && "Best risk-adjusted returns (recommended)"}
                    {field.value === 'return' && "Highest possible returns regardless of risk"}
                    {field.value === 'risk' && "Lowest possible volatility"}
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="includeStablecoins"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Include Stablecoins</FormLabel>
                    <FormDescription>
                      Include stablecoins like USDT and USDC in the optimization
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 mb-4"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
                Advanced Options
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
              
              {showAdvanced && (
                <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                  <FormField
                    control={form.control}
                    name="useConstraints"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Use Allocation Constraints</FormLabel>
                          <FormDescription>
                            Set minimum and maximum allocation per asset
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch('useConstraints') && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minAllocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Allocation (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                min={0}
                                max={100}
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum allocation per asset
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxAllocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Allocation (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                min={0}
                                max={100}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum allocation per asset
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            
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
