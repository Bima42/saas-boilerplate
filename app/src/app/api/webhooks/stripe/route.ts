import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { env } from '@/config/env';
import type Stripe from 'stripe';
import { insertCompletedPurchase } from '@/server/services/purchase';
import { updateUserStripeCustomerId } from '@/server/services/user';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        console.error('Webhook signature verification failed.', error);
        return new NextResponse('Webhook Error', { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // We will pass this in 'metadata' when creating the session.
                const userId = session.metadata?.userId;
                console.log(`Processing checkout.session.completed for userId: ${userId}`);

                if (!userId) {
                    console.error('Missing userId in session metadata');
                    return new NextResponse('Missing metadata', { status: 400 });
                }

                if (session.customer && typeof session.customer === 'string') {
                    await updateUserStripeCustomerId({ userId, stripeCustomerId: session.customer });
                }

                console.log(`Session ID: ${session.id}`);

                // onConflictDoNothing to prevent duplicate inserts if Stripe retries the webhook
                await insertCompletedPurchase({ userId, session });
                break;
            }

            // Handle other events like refunds if necessary
            // case "charge.refunded": ...

            default:
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

    return new NextResponse('Received', { status: 200 });
}
