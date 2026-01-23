'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/trpc/client';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ArrowLeft, Loader2, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BackButton } from '@/components/back-button';

export default function BillingPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('Billing');

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success(t('success'));
            router.replace('/dashboard/billing');
        }
    }, [t, searchParams, router]);

    const { data: statusData, isLoading: isStatusLoading } = api.stripe.getPurchaseStatus.useQuery();

    const { mutate: createCheckoutSession, isPending: isCheckoutLoading } =
        api.stripe.createCheckoutSession.useMutation({
            onSuccess: ({ url }) => {
                if (url) window.location.href = url;
                else toast.error(t('error.checkout'));
            },
            onError: (err) => {
                console.error(err);
                toast.error(t('error.checkout'));
            }
        });

    const { mutate: openCustomerPortal, isPending: isPortalLoading } = api.stripe.getCustomerPortalUrl.useMutation({
        onSuccess: ({ url }) => {
            toast.loading(t('redirectingPortal'));
            window.location.href = url;
        },
        onError: (err) => {
            console.error(err);
            toast.error(t('error.portal'));
        }
    });

    if (isStatusLoading) {
        return (
            <div className="min-h-screen py-10 px-4 flex justify-center">
                <Card className="w-full max-w-5xl">
                    <CardHeader>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    const hasAccess = statusData?.hasAccess;

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <BackButton path={'/dashboard'} />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                        <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
                    </div>
                </div>

                <Card className="overflow-hidden border-primary/10 shadow-md">
                    <CardHeader className="bg-muted/20 border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">
                                    {hasAccess ? t('lifetimeAccess') : t('freePlan')}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    {hasAccess ? t('hasAccess') : t('noAccess')}
                                </CardDescription>
                            </div>
                            {hasAccess && (
                                <Badge className="bg-green-600 hover:bg-green-700">
                                    <Sparkles className="w-3 h-3 mr-1" /> Active
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="p-8 grid md:grid-cols-2 gap-8">
                        {/* Features List */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                                Included
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm">
                                    <div
                                        className={`rounded-full p-1 ${hasAccess ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className={hasAccess ? 'text-foreground' : 'text-muted-foreground'}>
                                        {t('unlimitedProjects')}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <div
                                        className={`rounded-full p-1 ${hasAccess ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className={hasAccess ? 'text-foreground' : 'text-muted-foreground'}>
                                        {t('prioritySupport')}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Action Area */}
                        <div className="flex flex-col justify-center items-center text-center bg-muted/30 rounded-lg p-6 border border-border/50">
                            {hasAccess ? (
                                <>
                                    <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                        <CreditCard className="h-6 w-6" />
                                    </div>
                                    <p className="font-semibold mb-1">Billing Portal</p>
                                    <p className="text-xs text-muted-foreground mb-4">{t('viewInvoices')}</p>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => openCustomerPortal()}
                                        disabled={isPortalLoading}
                                    >
                                        {isPortalLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {t('manageBilling')}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm text-muted-foreground mb-1">{t('oneTimePayment')}</p>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-3xl font-bold">$29</span>
                                        <span className="text-muted-foreground text-sm">/lifetime</span>
                                    </div>
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={() => createCheckoutSession()}
                                        disabled={isCheckoutLoading}
                                    >
                                        {isCheckoutLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {t('getAccess')}
                                    </Button>
                                    <p className="text-[10px] text-muted-foreground mt-3 flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" /> {t('securePayment')}
                                    </p>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
