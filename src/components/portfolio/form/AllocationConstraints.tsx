
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Control, UseFormWatch } from 'react-hook-form';
import { FormValues } from './types';

interface AllocationConstraintsProps {
  control: Control<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const AllocationConstraints: React.FC<AllocationConstraintsProps> = ({ control, watch }) => {
  const useConstraints = watch('useConstraints');
  
  return (
    <>
      <FormField
        control={control}
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
      
      {useConstraints && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="minAllocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Allocation (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
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
            control={control}
            name="maxAllocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Allocation (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
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
    </>
  );
};

export default AllocationConstraints;
