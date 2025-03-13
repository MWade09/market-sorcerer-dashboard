
import React from 'react';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import AllocationConstraints from './AllocationConstraints';
import { Control, UseFormWatch } from 'react-hook-form';
import { FormValues } from './types';

interface AdvancedOptionsSectionProps {
  control: Control<FormValues>;
  watch: UseFormWatch<FormValues>;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
}

const AdvancedOptionsSection: React.FC<AdvancedOptionsSectionProps> = ({ 
  control, 
  watch,
  showAdvanced, 
  setShowAdvanced 
}) => {
  return (
    <div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex items-center gap-1 mb-4"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Advanced Options
        <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
      </Button>
      
      {showAdvanced && (
        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
          <AllocationConstraints control={control} watch={watch} />
        </div>
      )}
    </div>
  );
};

export default AdvancedOptionsSection;
