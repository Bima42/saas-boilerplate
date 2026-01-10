'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';

const YEARLY_DISCOUNT = 20;
const plans = [
    {
        name: 'Starter',
        price: 20,
        description: 'Get 20 AI-generated portraits with 2 unique styles.',
        features: [
            { title: '5 hours turnaround time' },
            { title: '20 AI portraits' },
            { title: 'Choice of 2 styles' },
            { title: '2 retouch credits' }
        ],
        buttonText: 'Get Started'
    },
    {
        name: 'Advanced',
        price: 40,
        isRecommended: true,
        isPopular: true,
        description: 'Get 50 AI-generated portraits with 5 unique styles.',
        features: [
            { title: '3 hours turnaround time' },
            { title: '50 AI portraits' },
            { title: 'Choice of 5 styles' },
            { title: '5 retouch credits' }
        ],
        buttonText: 'Get Advanced'
    },
    {
        name: 'Premium',
        price: 80,
        description: 'Get 100 AI-generated portraits with 10 unique styles.',
        features: [
            { title: '1-hour turnaround time' },
            { title: '100 AI portraits' },
            { title: 'Choice of 10 styles' },
            { title: '10 retouch credits' }
        ],
        buttonText: 'Get Premium'
    }
];

export default function Pricing() {
    const [selectedBillingPeriod, setSelectedBillingPeriod] = useState('monthly');

    return (
        <div className="py-24 px-6 flex flex-col items-center justify-center bg-muted/30" id="pricing">
            <h2 className="text-4xl md:text-5xl font-semibold text-center tracking-tight">Our Plans</h2>
            <p className="mt-4 text-xl text-center text-muted-foreground max-w-lg">
                Choose the plan that fits your needs and get started today
            </p>

            <Tabs value={selectedBillingPeriod} onValueChange={setSelectedBillingPeriod} className="mt-8">
                <TabsList className="h-11 rounded-full">
                    <TabsTrigger value="monthly" className="rounded-full px-6">
                        Monthly
                    </TabsTrigger>
                    <TabsTrigger value="yearly" className="rounded-full px-6">
                        Yearly (Save {YEARLY_DISCOUNT}%)
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
                                Most Popular
                            </Badge>
                        )}
                        <h3 className="text-lg font-medium">{plan.name}</h3>
                        <p className="mt-4 text-4xl font-semibold">
                            $
                            {selectedBillingPeriod === 'monthly'
                                ? plan.price
                                : Math.round(plan.price * ((100 - YEARLY_DISCOUNT) / 100))}
                            <span className="ml-1.5 text-sm text-muted-foreground font-normal">/month</span>
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
