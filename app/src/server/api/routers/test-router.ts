import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const testRouter = createTRPCRouter({
    getSecretMessage: protectedProcedure.query(({ ctx }) => {
        return { message: `Welcome back, ${ctx.user.email}!` };
    }),

    getGithubStars: publicProcedure
        .input(
            z.object({
                owner: z.string().min(1),
                repo: z.string().min(1)
            })
        )
        .query(async ({ input }) => {
            const { owner, repo } = input;

            try {
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        'User-Agent': 'Saas-Boilerplate'
                    },
                    next: { revalidate: 3600 }
                });

                if (!response.ok) {
                    throw new TRPCError({
                        code: response.status === 404 ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
                        message: 'Failed to fetch repository data'
                    });
                }

                const data = await response.json();
                const starCount = data.stargazers_count;

                return { stargazers_count: starCount as number };
            } catch (error) {
                if (error instanceof TRPCError) throw error;

                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to fetch stars'
                });
            }
        })
});
