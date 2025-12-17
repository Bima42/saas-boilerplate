'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '@/lib/trpc/client';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SimpleButton } from '@/components/ui/simple-button';

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

    const { data: statusData, isLoading: isStatusLoading } = trpc.stripe.getPurchaseStatus.useQuery();

    const { mutate: createCheckoutSession, isPending: isCheckoutLoading } =
        trpc.stripe.createCheckoutSession.useMutation({
            onSuccess: ({ url }) => {
                if (url) {
                    window.location.href = url;
                } else {
                    toast.error(t('error.checkout'));
                }
            },
            onError: (err) => {
                console.error(err);
                toast.error(t('error.checkout'));
            }
        });

    const { mutate: openCustomerPortal, isPending: isPortalLoading } = trpc.stripe.getCustomerPortalUrl.useMutation({
        onSuccess: ({ url }) => {
            toast.loading(t('redirectingPortal'));
            window.location.href = url;
        },
        onError: (err) => {
            console.error(err);
            toast.error(t('error.portal'));
        }
    });

    const handleUpgrade = () => {
        createCheckoutSession();
    };

    const handleOpenPortal = () => {
        openCustomerPortal();
    };

    if (isStatusLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                    <p className="text-gray-500 text-sm">{t('loading')}</p>
                </div>
            </div>
        );
    }

    const hasAccess = statusData?.hasAccess;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
                        <p className="text-gray-500 text-sm">{t('subtitle')}</p>
                    </div>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                    >
                        {t('backToDashboard')}
                    </button>
                </header>

                {/* Content */}
                <div className="grid md:grid-cols-1 gap-6">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {hasAccess ? t('lifetimeAccess') : t('freePlan')}
                                </h2>
                                <p className="text-gray-500 max-w-md">{hasAccess ? t('hasAccess') : t('noAccess')}</p>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <span
                                            className={`w-5 h-5 rounded-full flex items-center justify-center ${hasAccess ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}
                                        >
                                            ✓
                                        </span>
                                        <span>{t('unlimitedProjects')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <span
                                            className={`w-5 h-5 rounded-full flex items-center justify-center ${hasAccess ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}
                                        >
                                            ✓
                                        </span>
                                        <span>{t('prioritySupport')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-auto bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center space-y-3">
                                {hasAccess ? (
                                    <>
                                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3 text-xl">
                                            ✨
                                        </div>
                                        <p className="font-semibold text-green-700">Active</p>
                                        <p className="text-xs text-gray-500 mt-1">{t('lifetimeLicense')}</p>
                                        <SimpleButton
                                            text={t('manageBilling')}
                                            isLoading={isPortalLoading}
                                            disabled={isPortalLoading}
                                            onClick={handleOpenPortal}
                                        />
                                        <p className="text-xs text-gray-400">{t('viewInvoices')}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-500 mb-1">{t('oneTimePayment')}</p>
                                        <p className="text-3xl font-bold text-gray-900 mb-4">$29</p>
                                        <SimpleButton
                                            text={t('getAccess')}
                                            isLoading={isCheckoutLoading}
                                            disabled={isCheckoutLoading}
                                            onClick={handleUpgrade}
                                        />
                                        <p className="text-xs text-gray-400 mt-3">{t('securePayment')}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
