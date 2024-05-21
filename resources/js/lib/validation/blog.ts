import { z } from 'zod';

export const blogValidator = z.object({
  id: z.string().optional(),
  title: z.string().default(''),
  slug: z.string().default(''),
  category_id: z.number().default(1),
  banner: z.string().default(''),
  description: z.string().default(''),
  user_id: z.number(),
  // views: z.number(),
  // shares: z.number(),
  category: z.object({
    id: z.number(),
    title: z.string()
  }).optional(),
  user: z.object({
    name: z.string(),
    username: z.string()
  }).optional(),
  created_at: z.string().optional(),
  updatedAt: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Blog = z.infer<typeof blogValidator>;
