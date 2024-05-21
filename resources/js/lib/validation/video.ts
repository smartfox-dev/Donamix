import { z } from 'zod';

export const videoValidator = z.object({
  id: z.number().optional(),
  uuid: z.number().optional(),
  video_link: z.string().optional(),
  description: z.string().optional(),
  user_id: z.number(),
  // views: z.number(),
  comments: z.any().optional(),
  user: z.object({
    name: z.string(),
    username: z.string(),
    avatar: z.string()
  }).optional(),
  time_ago: z.string().optional(),
  updatedAt: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Video = z.infer<typeof videoValidator>;
