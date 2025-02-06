import * as z from 'zod';

export const carSchema = z.object({
  model: z.string().min(1, 'Model is required'),
  maxSpeed: z.coerce.number().min(1, 'Max speed must be greater than 0'),
  features: z.array(z.string()).default([]),
  year: z.coerce.number().optional(),
});
