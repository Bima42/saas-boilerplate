import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { stripe } from '@/lib/stripe';
import { env } from '@/config/env';
import { TRPCError } from '@trpc/server';
import { getUserCompletedPurchase } from '@/server/services/purchase';
import { getUserById, updateUserStripeCustomerId } from '@/server/services/user';

export const stripeRouter = createTRPCRouter({
    createCheckoutSession: protectedProcedure.mutation(async ({ ctx }) => {
        const { user: authUser } = ctx.session;

        const existingPurchase = await getUserCompletedPurchase(authUser.id);

        if (existingPurchase) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'You have already purchased this product.'
            });
        }

        const dbUser = await getUserById(authUser.id);

        if (!dbUser) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        let customerId = dbUser.stripeCustomerId;

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: dbUser.email,
                name: dbUser.name,
                metadata: {
                    userId: dbUser.id
                }
            });
            customerId = customer.id;

            await updateUserStripeCustomerId({ userId: dbUser.id, stripeCustomerId: customerId });
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price: env.STRIPE_PRICE_ID,
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
            cancel_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
            metadata: {
                userId: dbUser.id
            }
        });

        if (!session.url) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create checkout session'
            });
        }

        return { url: session.url };
    }),

    getPurchaseStatus: protectedProcedure.query(async ({ ctx }) => {
        const purchase = await getUserCompletedPurchase(ctx.session.user.id);

        return {
            hasAccess: !!purchase
        };
    }),

    getCustomerPortalUrl: protectedProcedure.mutation(async ({ ctx }) => {
        const { user } = ctx.session;

        if (!user.email) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'User email not found'
            });
        }

        const encodedEmail = encodeURIComponent(user.email);
        const portalUrl = `${env.STRIPE_CUSTOMER_PORTAL_LINK}?prefilled_email=${encodedEmail}`;

        return { url: portalUrl };
    })
});
