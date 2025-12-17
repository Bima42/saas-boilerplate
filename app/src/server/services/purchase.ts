import { db } from '@/server/db';
import { purchase } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';
import Stripe from 'stripe';

export async function insertCompletedPurchase(data: { userId: string; session: Stripe.Checkout.Session }) {
    await db
        .insert(purchase)
        .values({
            id: crypto.randomUUID(),
            userId: data.userId,
            stripeCheckoutSessionId: data.session.id,
            stripePaymentIntentId: data.session.payment_intent as string,
            stripePriceId: data.session.line_items?.data[0]?.price?.id,
            amount: data.session.amount_total || 0,
            currency: data.session.currency || 'usd',
            status: 'completed'
        })
        .onConflictDoNothing({ target: purchase.stripeCheckoutSessionId });
}

export async function getUserCompletedPurchase(userId: string) {
    return db.query.purchase.findFirst({
        where: and(eq(purchase.userId, userId), eq(purchase.status, 'completed'))
    });
}
