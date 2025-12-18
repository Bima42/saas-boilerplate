import Stripe from 'stripe';
import { env } from '@/config/env';

let stripeInstance: Stripe | null = null;
export function getStripe() {
    if (!stripeInstance) {
        stripeInstance = new Stripe(env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-12-15.clover',
            typescript: true
        });
    }
    return stripeInstance;
}
