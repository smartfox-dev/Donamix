import { z } from 'zod';

export const userValidator = z.object({
  id: z.number(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional(),
  email: z.string(),
  banner: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  gender: z.string().default('Male').nullable(),
  status: z.string().default('Single').nullable(),
  description: z.string().default('').nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  birthday: z.string().nullable(),
  credit: z.number().nullable(),
  role: z.string().nullable(),
  education: z
    .object({
      university: z.string().nullable().optional(),
      from: z.string().nullable(),
      to: z.string().nullable(),
      description: z.string().nullable(),
    })
    .nullable()
    .optional(),
  experience: z
    .object({
      company: z.string().nullable().optional(),
      position: z.string().nullable(),
      from: z.string().nullable(),
      to: z.string().nullable(),
      location: z.string().nullable(),
      description: z.string().nullable(),
    })
    .nullable()
    .optional(),
  interests: z.array(z.string()).nullable().default([]),
  setting: z.object({
    is_enable_friend_request: z.boolean().default(true),
    is_enable_private_message: z.boolean().default(true),
    is_enable_tagging: z.boolean().default(true),
    is_enable_private_profile: z.boolean().default(true),
    is_activate_account: z.boolean().default(true),
    is_remove_ads: z.boolean().default(true),
  }),
  // createdAt: z.string().optional(),
  // updatedAt: z.string().optional(),
  // deleted: z.boolean().default(false).optional(),
});

export type User = z.infer<typeof userValidator>;
