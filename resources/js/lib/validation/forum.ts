import { z } from 'zod';

export const forumValidator = z.object({
    id: z.number().optional(),
    description: z.string().optional(),
    time_ago: z.string().optional(),
    updatedAt: z.string().optional(),
    user_id: z.number(),
    title: z.string().optional(),
    category_id: z.number().optional()
});

export type Forum = z.infer<typeof forumValidator>;
