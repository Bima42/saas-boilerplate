import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const testRouter = createTRPCRouter({
    hello: publicProcedure
        .input(
            z.object({
                text: z.string()
            })
        )
        .query((opts) => {
            return {
                greeting: `hello ${opts.input.text}`
            };
        }),
    getSecretMessage: protectedProcedure.query(({ ctx }) => {
        console.log('User info in protected procedure:', ctx.user);
        return { message: `Welcome back, ${ctx.user.email}!` };
    })
});
