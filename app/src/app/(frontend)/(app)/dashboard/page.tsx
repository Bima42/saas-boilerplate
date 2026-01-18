'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/better-auth/auth-client';
import { api } from '@/lib/trpc/client';
import { useTranslations } from 'next-intl';
import { CreditCard, User, Server, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
    const router = useRouter();
    const t = useTranslations('Dashboard');
    const { data: session, isPending: isSessionLoading } = authClient.useSession();

    const {
        data: secretData,
        isLoading: isTrpcLoading,
        error: trpcError
    } = api.test.getSecretMessage.useQuery(undefined, {
        enabled: !!session,
        retry: false
    });

    if (isSessionLoading || (session && isTrpcLoading)) {
        return (
            <div className="min-h-screen p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                        <p className="text-muted-foreground">{t('subtitle')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => router.push('/dashboard/billing')}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            {t('billing')}
                        </Button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* User Profile Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('userProfile')}</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                    {session?.user.name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{session?.user.name}</div>
                                    <div className="text-sm text-muted-foreground">{session?.user.email}</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{t('userId')}</span>
                                    <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">
                                        {session?.user.id}
                                    </code>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{t('role')}</span>
                                    <Badge variant="secondary">{t('roleUser')}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Status / tRPC Test Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('systemHealth')}</CardTitle>
                            <Server className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="mt-2">
                                {trpcError ? (
                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                        <div className="text-sm">
                                            <p className="font-semibold">{t('connectionError')}</p>
                                            <p>{trpcError.message}</p>
                                        </div>
                                    </div>
                                ) : secretData ? (
                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
                                        <ShieldCheck className="h-5 w-5 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="font-medium text-sm">{secretData.message}</p>
                                            <p className="text-xs opacity-80">{t('secureChannel')}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {t('connecting')}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
