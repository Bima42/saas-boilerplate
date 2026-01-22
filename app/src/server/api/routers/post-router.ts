import { z } from 'zod';
import { createTRPCRouter, publicProcedure, adminProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import {
    getPublishedPosts,
    getPublishedPostBySlug,
    getAdminPosts,
    getPostById,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost
} from '@/server/services/post';

const updateSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    content: z.any().optional(),
    coverImage: z.string().optional(),
    published: z.boolean().optional(),
    publishedAt: z.date().nullable().optional()
});

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(async () => {
        return await getPublishedPosts();
    }),

    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
        const result = await getPublishedPostBySlug(input.slug);

        if (!result) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found' });
        }

        return result;
    }),

    adminList: adminProcedure.query(async () => {
        return await getAdminPosts();
    }),

    adminGetById: adminProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const result = await getPostById(input.id);

        if (!result) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        return result;
    }),

    create: adminProcedure
        .input(
            z.object({
                title: z.string().min(1),
                slug: z.string().min(1)
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existing = await getPostBySlug(input.slug);

            if (existing) {
                throw new TRPCError({ code: 'CONFLICT', message: 'Slug already exists' });
            }

            return await createPost({
                title: input.title,
                slug: input.slug,
                authorId: ctx.session.user.id
            });
        }),

    update: adminProcedure.input(updateSchema).mutation(async ({ input }) => {
        const updateData: any = { ...input };
        delete updateData.published; // Remove virtual field before sending to DB

        // Handle business logic for publishing dates in the router/controller layer
        if (input.published === true) {
            updateData.publishedAt = new Date();
        } else if (input.published === false) {
            updateData.publishedAt = null;
        }

        const updated = await updatePost(input.id, updateData);

        if (!updated) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found during update' });
        }

        return updated;
    }),

    delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
        await deletePost(input.id);
        return { success: true };
    })
});
