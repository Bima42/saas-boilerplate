import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { Resend } from 'resend';
import { db } from '@/server/db';
import { env } from '@/config/env';

let resendInstance: Resend | null = null;
function getResend() {
    if (!resendInstance) {
        resendInstance = new Resend(env.RESEND_API_KEY);
    }
    return resendInstance;
}

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
    if (!authInstance) {
        authInstance = betterAuth({
            secret: env.BETTER_AUTH_SECRET,
            baseURL: env.NEXT_PUBLIC_APP_URL,
            rateLimit: {
                window: 60,
                max: 10
            },
            database: drizzleAdapter(db, {
                provider: 'pg'
            }),
            socialProviders: {
                google: {
                    clientId: env.GOOGLE_CLIENT_ID,
                    clientSecret: env.GOOGLE_CLIENT_SECRET
                }
            },
            plugins: [
                magicLink({
                    sendMagicLink: async ({ email, token, url }) => {
                        try {
                            await getResend().emails.send({
                                from: 'Boilerplate <onboarding@resend.dev>', // TODO: Update with your verified domain
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
                            // We don't throw here to prevent leaking email existence,
                            // but in dev we might want to know.
                        }
                    }
                })
            ]
        });
    }
    return authInstance;
}
