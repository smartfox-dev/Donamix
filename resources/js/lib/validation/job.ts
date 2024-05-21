import { z } from 'zod';

export const jobValidator = z.object({
  id: z.string().optional(),
  user_id: z.number(),
  job_id: z.number(),
  cv_letter: z.string().default(''),
  cv_link: z.string().default(''),
  created_at: z.string().optional(),
  updatedAt: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Job = z.infer<typeof jobValidator>;
