'use client';

import { useState } from 'react';
import { authClient } from '@/lib/better-auth/auth-client';
import { toast } from 'sonner';
import { GoogleAuthButton } from '@/components/login/google-auth-button';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await authClient.signIn.magicLink(
            {
                email,
                callbackURL: '/dashboard'
            },
            {
                onSuccess: () => {
                    setIsEmailSent(true);
                    setIsLoading(false);
                    toast.success('Magic link sent to your email');
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                    setIsLoading(false);
                }
            }
        );
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Decorative (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="z-10">
                    <div className="flex items-center gap-2 font-bold text-2xl">
                        <div className="w-8 h-8 bg-white rounded-lg"></div>
                        Boilerplate
                    </div>
                </div>

                <div className="z-10 max-w-md">
                    <h2 className="text-4xl font-bold mb-6">Start building your next big idea today.</h2>
                    <p className="text-gray-400 text-lg">
                        Secure, scalable, and type-safe foundation for your modern web applications.
                    </p>
                </div>

                <div className="z-10 text-sm text-gray-500">© {new Date().getFullYear()} Bima Inc.</div>

                {/* Abstract Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute left-0 bottom-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {isEmailSent ? 'Check your email' : 'Welcome back'}
                        </h1>
                        <p className="text-sm text-zinc-500">
                            {isEmailSent
                                ? `We sent a login link to ${email}`
                                : 'Enter your email to sign in to your account'}
                        </p>
                    </div>

                    {isEmailSent ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-6">
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <button
                                onClick={() => setIsEmailSent(false)}
                                className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline"
                            >
                                Use a different email
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <form onSubmit={handleMagicLink} className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex h-9 w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Mail className="mr-2 h-4 w-4" />
                                    )}
                                    Sign in with Email
                                </button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-zinc-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-zinc-500">Or continue with</span>
                                </div>
                            </div>

                            <GoogleAuthButton />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
