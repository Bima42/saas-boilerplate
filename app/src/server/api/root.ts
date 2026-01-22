import { createTRPCRouter } from './trpc';
import { testRouter } from '@/server/api/routers/test-router';
import { stripeRouter } from '@/server/api/routers/stripe-router';
import { postRouter } from '@/server/api/routers/post-router';
import { mediaRouter } from '@/server/api/routers/media-router';

export const appRouter = createTRPCRouter({
    media: mediaRouter,
    post: postRouter,
    stripe: stripeRouter,
    test: testRouter
});

export type AppRouter = typeof appRouter;
