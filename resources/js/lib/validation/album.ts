import { z } from 'zod';

export const albumValidator = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  title: z.string().default('Untitled'),
  description: z.string().default(''),
  images: z.array(
    z.object({
      title: z.string().default(''),
      url: z.string(),
      description: z.string().default(''),
      createdAt: z.string().optional(),
    })
  ).default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deleted: z.boolean().default(false).optional()
});

export type Album = z.infer<typeof albumValidator>;
