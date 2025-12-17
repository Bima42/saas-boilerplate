import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const purchase = pgTable('purchase', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),

    stripeCheckoutSessionId: text('stripe_checkout_session_id').notNull().unique(),
    stripePaymentIntentId: text('stripe_payment_intent_id').unique(),
    stripePriceId: text('stripe_price_id'),

    amount: integer('amount').notNull(),
    currency: text('currency').notNull(),
    status: text('status').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull()
});
