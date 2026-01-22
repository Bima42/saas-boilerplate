import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        BETTER_AUTH_SECRET: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        RESEND_API_KEY: z.string().min(1),
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
        R2_ACCOUNT_ID: z.string().min(1),
        R2_PUBLIC_URL: z.url(),
        S3_BUCKET: z.string().min(1),
        S3_ACCESS_KEY_ID: z.string().min(1),
        S3_SECRET_ACCESS_KEY: z.string().min(1),
        S3_REGION: z.string().min(1),
        STRIPE_CUSTOMER_PORTAL_LINK: z.string().url(),
        STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_'),
        STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_'),
        STRIPE_PRICE_ID: z.string().min(1)
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.url()
    },
    runtimeEnv: {
        // Server
        DATABASE_URL: process.env.DATABASE_URL,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        NODE_ENV: process.env.NODE_ENV,
        R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
        R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
        S3_BUCKET: process.env.S3_BUCKET,
        S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
        S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
        S3_REGION: process.env.S3_REGION,
        STRIPE_CUSTOMER_PORTAL_LINK: process.env.STRIPE_CUSTOMER_PORTAL_LINK,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,

        // Client
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true
});
