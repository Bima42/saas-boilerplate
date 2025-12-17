import { createTRPCRouter } from './trpc';
import { testRouter } from '@/server/api/routers/test-router';
import { stripeRouter } from '@/server/api/routers/stripe-router';

export const appRouter = createTRPCRouter({
    test: testRouter,
    stripe: stripeRouter
});

export type AppRouter = typeof appRouter;
