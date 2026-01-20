import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { headers } from 'next/headers';
import { auth } from '@/lib/better-auth/auth';
import 'server-only';

/**
 * CONTEXT
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
export const createTRPCContext = cache(async () => {
    const heads = await headers();

    const session = await auth.api.getSession({
        headers: heads
    });

    return {
        session: session,
        headers: heads
    };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    }
});

/**
 * PROTECTED PROCEDURE
 * Reusable middleware that enforces authentication
 */
const isAuthenticated = t.middleware(({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
        ctx: {
            // Infers the `session` as non-nullable down the chain
            session: ctx.session,
            user: ctx.session.user
        }
    });
});

/**
 * ADMIN PROCEDURE
 * Reusable middleware that enforces admin role
 */
const isAdmin = t.middleware(({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const user = ctx.session.user;

    if (user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
    }

    return next({
        ctx: {
            session: ctx.session,
            user: ctx.session.user
        }
    });
});

/**
 * ROUTER & PROCEDURE (THE EXPORTED PUBLIC API)
 */
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAdmin);
