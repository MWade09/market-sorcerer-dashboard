
import * as z from 'zod';

export const formSchema = z.object({
  riskTolerance: z.enum(['low', 'moderate', 'high']),
  optimizationGoal: z.enum(['sharpe', 'return', 'risk']),
  useConstraints: z.boolean().default(false),
  minAllocation: z.number().min(0).max(100).optional(),
  maxAllocation: z.number().min(0).max(100).optional(),
  includeStablecoins: z.boolean().default(true),
});

export type FormValues = z.infer<typeof formSchema>;

