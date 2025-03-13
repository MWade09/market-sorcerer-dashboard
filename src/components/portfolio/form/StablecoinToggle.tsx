
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Control } from 'react-hook-form';
import { FormValues } from './types';

interface StablecoinToggleProps {
  control: Control<FormValues>;
}

const StablecoinToggle: React.FC<StablecoinToggleProps> = ({ control }) => {
  return (
    <FormField
      control={control}
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
  );
};

export default StablecoinToggle;
