import { createTRPCRouter } from './trpc';
import { testRouter } from '@/server/api/routers/test-router';

export const appRouter = createTRPCRouter({
    test: testRouter
});

export type AppRouter = typeof appRouter;
