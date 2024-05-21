import { z } from 'zod';

export const commentValidator = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  post_id: z.number(),
  is_edit: z.number(),
  is_edited : z.boolean().optional(),
  description: z.string().default(''),
  user: z.object({
    name: z.string(),
    username: z.string(),
    avatar: z.string().optional()
  }).optional(),
  childs : z.any().default(''),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Comment = z.infer<typeof commentValidator>;
