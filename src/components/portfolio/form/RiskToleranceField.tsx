
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

interface RiskToleranceFieldProps {
  control: Control<FormValues>;
}

const RiskToleranceField: React.FC<RiskToleranceFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
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
  );
};

export default RiskToleranceField;
