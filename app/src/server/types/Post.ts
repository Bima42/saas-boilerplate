import { z } from 'zod';
import { post } from '@/server/db/schema';

export type Post = typeof post.$inferSelect;

export const blogPostFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    tags: z.array(z.string()),
    coverImage: z.string().optional()
});

export type BlogPostFormData = z.infer<typeof blogPostFormSchema>;

export const blogPostUpdateSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    content: z.any().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    published: z.boolean().optional(),
    publishedAt: z.date().nullable().optional()
});

export type BlogPostUpdateData = z.infer<typeof blogPostUpdateSchema>;
