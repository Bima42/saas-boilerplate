'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const YEARLY_DISCOUNT = 20;

export default function Pricing() {
    const t = useTranslations('Pricing');
    const [selectedBillingPeriod, setSelectedBillingPeriod] = useState('monthly');

    const plans = [
        {
            name: t('plans.starter.name'),
            price: 20,
            description: t('plans.starter.description'),
            features: [
                { title: t('plans.starter.features.turnaround') },
                { title: t('plans.starter.features.portraits') },
                { title: t('plans.starter.features.styles') },
                { title: t('plans.starter.features.retouch') }
            ],
            buttonText: t('cta.start')
        },
        {
            name: t('plans.advanced.name'),
            price: 40,
            isRecommended: true,
            isPopular: true,
            description: t('plans.advanced.description'),
            features: [
                { title: t('plans.advanced.features.turnaround') },
                { title: t('plans.advanced.features.portraits') },
                { title: t('plans.advanced.features.styles') },
                { title: t('plans.advanced.features.retouch') }
            ],
            buttonText: t('cta.advanced')
        },
        {
            name: t('plans.premium.name'),
            price: 80,
            description: t('plans.premium.description'),
            features: [
                { title: t('plans.premium.features.turnaround') },
                { title: t('plans.premium.features.portraits') },
                { title: t('plans.premium.features.styles') },
                { title: t('plans.premium.features.retouch') }
            ],
            buttonText: t('cta.premium')
        }
    ];

    return (
        <div className="py-24 px-6 flex flex-col items-center justify-center bg-muted/30" id="pricing">
            <h2 className="text-4xl md:text-5xl font-semibold text-center tracking-tight">{t('title')}</h2>
            <p className="mt-4 text-xl text-center text-muted-foreground max-w-lg">{t('subtitle')}</p>

            <Tabs value={selectedBillingPeriod} onValueChange={setSelectedBillingPeriod} className="mt-8">
                <TabsList className="h-11 rounded-full">
                    <TabsTrigger value="monthly" className="rounded-full px-6">
                        {t('monthly')}
                    </TabsTrigger>
                    <TabsTrigger value="yearly" className="rounded-full px-6">
                        {t('yearly', { discount: YEARLY_DISCOUNT })}
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mt-12 container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={cn('relative border bg-background rounded-xl p-6 shadow-sm', {
                            'border-2 border-primary shadow-md': plan.isPopular
                        })}
                    >
                        {plan.isPopular && (
                            <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                                {t('mostPopular')}
                            </Badge>
                        )}
                        <h3 className="text-lg font-medium">{plan.name}</h3>
                        <p className="mt-4 text-4xl font-semibold">
                            $
                            {selectedBillingPeriod === 'monthly'
                                ? plan.price
                                : Math.round(plan.price * ((100 - YEARLY_DISCOUNT) / 100))}
                            <span className="ml-1.5 text-sm text-muted-foreground font-normal">{t('perMonth')}</span>
                        </p>
                        <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>

                        <Button variant={plan.isPopular ? 'default' : 'outline'} size="lg" className="w-full mt-6">
                            {plan.buttonText}
                        </Button>
                        <Separator className="my-8" />
                        <ul className="space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature.title} className="flex items-center gap-2 text-sm">
                                    <CircleCheck className="h-4 w-4 text-primary" />
                                    {feature.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
