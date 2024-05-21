import { z } from 'zod';

export const postValidator = z.object({
  id: z.number().optional(),
  uuid: z.number().optional(),
  description: z.string().default(''),
  username: z.string().optional(),
  video_link: z.string().optional(),
  user_id: z.number(),
  // views: z.number(),
  is_perspective : z.boolean().optional(),
  is_like: z.number().optional(),
  is_clap: z.number().optional(),
  is_heart: z.number().optional(),
  is_laugh: z.number().optional(),
  avatar: z.string().optional(),
  tags : z.any().optional(),
  medias : z.any().optional(),
  new_medias : z.any().optional(),
  all: z.number().optional(),
  like: z.number().optional(),
  clap: z.number().optional(),
  heart: z.number().optional(),
  laugh: z.number().optional(),
  comments: z.any().optional(),
  group_id: z.any().optional(),
  user: z.object({
    name: z.string(),
    username: z.string(),
  }).optional(),
  time_ago: z.string().optional(),
  updatedAt: z.string().optional(),
  created_at: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Post = z.infer<typeof postValidator>;
