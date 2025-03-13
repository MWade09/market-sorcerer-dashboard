
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { FormValues } from './types';

interface OptimizationGoalFieldProps {
  control: Control<FormValues>;
}

const OptimizationGoalField: React.FC<OptimizationGoalFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
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
  );
};

export default OptimizationGoalField;
