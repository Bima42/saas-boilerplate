'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { authClient } from '@/lib/better-auth/auth-client';
import { GoogleLogo } from '@/components/login/google-logo';
import { Logo } from '@/components/logo';
import { LOGGED_HOME_PATH } from '@/config/config';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
    const t = useTranslations('Auth');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState('');

    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackURL') || LOGGED_HOME_PATH;

    const formSchema = z.object({
        email: z.string().email({ message: t('validation.email') })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ''
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setEmail(data.email);

        await authClient.signIn.magicLink(
            {
                email: data.email,
                callbackURL: callbackURL
            },
            {
                onSuccess: () => {
                    setIsEmailSent(true);
                    setIsLoading(false);
                    toast.success(t('toast.magicLinkSent'));
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                    setIsLoading(false);
                }
            }
        );
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        await authClient.signIn.social(
            {
                provider: 'google',
                callbackURL: callbackURL
            },
            {
                onError: (ctx) => {
                    toast.error(ctx.error.message || t('toast.googleError'));
                    setIsLoading(false);
                }
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full h-full min-h-screen grid lg:grid-cols-2">
                {/* Left Side: Form */}
                <div className="relative flex flex-col items-center justify-center p-8 outline-0 sm:outline-2 outline-border/40 dark:outline-border/80 outline-offset-0.5">
                    <div className="w-full max-w-sm relative z-10">
                        <div className="flex items-center gap-2 font-bold text-xl mb-8">
                            <Logo />
                        </div>

                        {isEmailSent ? (
                            <div className="flex flex-col items-center justify-center space-y-6 py-6 text-center animate-in fade-in zoom-in duration-300">
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-semibold tracking-tight">{t('checkEmail')}</h3>
                                    <p className="text-muted-foreground">
                                        {t.rich('sentLink', {
                                            email: () => <span className="font-medium text-foreground">{email}</span>,
                                            bold: (chunks) => (
                                                <span className="font-medium text-foreground">{chunks}</span>
                                            )
                                        })}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsEmailSent(false)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    {t('useDifferentEmail')}
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
                                    <p className="text-sm text-muted-foreground mt-2">{t('subtitle')}</p>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full gap-3 h-11 font-medium"
                                    onClick={handleGoogleSignIn}
                                    disabled={isLoading}
                                >
                                    <GoogleLogo />
                                    {t('google')}
                                </Button>

                                <div className="my-7 w-full flex items-center justify-center overflow-hidden">
                                    <Separator className="shrink" />
                                    <span className="text-xs text-muted-foreground font-medium px-4 uppercase">
                                        {t('or')}
                                    </span>
                                    <Separator className="shrink" />
                                </div>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t('emailLabel')}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder={t('emailPlaceholder')}
                                                            className="h-11"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" className="w-full h-11" disabled={isLoading}>
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {t('email')}
                                        </Button>
                                    </form>
                                </Form>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Side: Image/Pattern */}
                <div className="hidden lg:block bg-muted relative overflow-hidden border-l border-border">
                    <div className="absolute inset-0 bg-zinc-900/5 dark:bg-zinc-900/50" />
                </div>
            </div>
        </div>
    );
}
