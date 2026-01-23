import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink, admin } from 'better-auth/plugins';
import { db } from '@/server/db';
import { env } from '@/config/env';
import { getResend } from '@/lib/resend';
import { count } from 'drizzle-orm';
import { user as UserTable } from '@/server/db/schema/auth-schema';

export const auth = betterAuth({
    advanced: {
        cookiePrefix: 'boilerplate'
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.NEXT_PUBLIC_APP_URL,
    rateLimit: {
        window: 60,
        max: 10
    },
    database: drizzleAdapter(db, {
        provider: 'pg'
    }),
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    // Check if any user exists in the database
                    const [record] = await db.select({ count: count() }).from(UserTable);
                    const userCount = record?.count ?? 0;

                    if (userCount === 0) {
                        return {
                            data: {
                                ...user,
                                role: 'admin'
                            }
                        };
                    }

                    return {
                        data: user
                    };
                }
            }
        }
    },
    user: {
        additionalFields: {
            hasPurchased: {
                type: 'boolean',
                required: true,
                defaultValue: false,
                input: false
            }
        }
    },
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }
    },
    plugins: [
        admin(),
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                try {
                    await getResend().emails.send({
                        from: 'Boilerplate <onboarding@resend.dev>',
                        to: email,
                        subject: 'Sign in to Boilerplate',
                        html: `
                                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                                        <h1>Welcome to Boilerplate</h1>
                                        <p>Click the link below to sign in to your account:</p>
                                        <a href="${url}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                                            Sign In
                                        </a>
                                        <p style="color: #666; font-size: 14px; margin-top: 24px;">
                                            If you didn't request this email, you can safely ignore it.
                                        </p>
                                    </div>
                                `
                    });
                } catch (error) {
                    console.error('Failed to send magic link email:', error);
                }
            }
        })
    ]
});
