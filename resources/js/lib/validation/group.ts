import { z } from 'zod';

export const groupValidator = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  cover_photo: z.string().optional(),
  group_name: z.string().optional(),
  url: z.string().optional(),
  category: z.string().optional(),
  description: z.string().default(''),
  privacy: z.string().optional(),
  method_count: z.number().optional(),
  user_list: z.string().optional(),

  is_like: z.number().optional(),
  is_clap: z.number().optional(),
  is_heart: z.number().optional(),
  is_laugh: z.number().optional(),

  all: z.number().optional(),
  like: z.number().optional(),
  clap: z.number().optional(),
  heart: z.number().optional(),
  laugh: z.number().optional(),
  comments: z.any().optional(),
  time_ago: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Group = z.infer<typeof groupValidator>;
