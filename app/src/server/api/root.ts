import { createTRPCRouter } from './trpc';
import { testRouter } from '@/server/api/routers/test-router';
import { stripeRouter } from '@/server/api/routers/stripe-router';
import { postRouter } from '@/server/api/routers/post-router';

export const appRouter = createTRPCRouter({
    test: testRouter,
    stripe: stripeRouter,
    post: postRouter
});

export type AppRouter = typeof appRouter;
