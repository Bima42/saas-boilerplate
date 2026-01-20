import { z } from 'zod';
import { createTRPCRouter, publicProcedure, adminProcedure } from '@/server/api/trpc';
import { post } from '@/server/db/schema';
import { db } from '@/server/db';
import { eq, desc, isNotNull, and } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

const updateSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    content: z.any().optional(), // Plate JSON structure
    coverImage: z.string().optional(),
    published: z.boolean().optional(),
    publishedAt: z.date().nullable().optional()
});
type UpdatePostInput = z.infer<typeof updateSchema>;

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(async () => {
        return await db.query.post.findMany({
            where: isNotNull(post.publishedAt),
            orderBy: [desc(post.publishedAt)],
            with: {
                author: {
                    columns: {
                        name: true,
                        image: true
                    }
                }
            }
        });
    }),

    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
        const result = await db.query.post.findFirst({
            where: and(eq(post.slug, input.slug), isNotNull(post.publishedAt)),
            with: {
                author: {
                    columns: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        if (!result) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found' });
        }

        return result;
    }),

    adminList: adminProcedure.query(async () => {
        return await db.query.post.findMany({
            orderBy: [desc(post.createdAt)],
            with: {
                author: {
                    columns: {
                        name: true
                    }
                }
            }
        });
    }),

    adminGetById: adminProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const result = await db.query.post.findFirst({
            where: eq(post.id, input.id)
        });

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
            // Check slug uniqueness
            const existing = await db.query.post.findFirst({
                where: eq(post.slug, input.slug)
            });

            if (existing) {
                throw new TRPCError({ code: 'CONFLICT', message: 'Slug already exists' });
            }

            const newPost = await db
                .insert(post)
                .values({
                    id: crypto.randomUUID(),
                    title: input.title,
                    slug: input.slug,
                    authorId: ctx.session.user.id,
                    content: []
                })
                .returning();

            return newPost[0];
        }),

    // ADMIN: Update a post
    update: adminProcedure.input(updateSchema).mutation(async ({ input }) => {
        const updateData: UpdatePostInput = { ...input };
        delete updateData.published;

        // Handle publication logic
        if (input.published === true) {
            updateData.publishedAt = new Date();
        } else if (input.published === false) {
            updateData.publishedAt = null;
        }

        const updated = await db.update(post).set(updateData).where(eq(post.id, input.id)).returning();

        return updated[0];
    }),

    // ADMIN: Delete a post
    delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
        await db.delete(post).where(eq(post.id, input.id));
        return { success: true };
    })
});
