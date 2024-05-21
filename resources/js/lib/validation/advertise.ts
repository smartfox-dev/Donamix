import { z } from 'zod';

export const advertiseValidator = z.object({
  id: z.string().optional(),
  user_id: z.number(),
  urls: z.string().default(''),
  ads_type: z.string().default(''),
  conversation: z.string().default(''),
  site_url: z.string().default(''),
  button: z.string().default(''),
  description: z.string().optional(),
  country: z.string().default(''),
  age_from: z.number(),
  age_to: z.number(),
  gender: z.string().default(''),
  interest: z.string().default(''),
  work: z.string().default(''),
  price: z.number(),
  expires: z.number(),
  created_at: z.string().optional(),
  updatedAt: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Advertise = z.infer<typeof advertiseValidator>;
