import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        BETTER_AUTH_SECRET: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        RESEND_API_KEY: z.string().min(1),
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().url()
    },
    runtimeEnv: {
        // Server
        DATABASE_URL: process.env.DATABASE_URL,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        NODE_ENV: process.env.NODE_ENV,

        // Client
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true
});
