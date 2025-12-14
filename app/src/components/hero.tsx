'use client';

import React, { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import SectionContainer from '@/components/ui/section-container';

const HeroTitle = () => {
    const t = useTranslations('Hero');

    return (
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8">
            {t.rich('title', {
                strike: (chunks: ReactNode) => <span className="line-through text-muted-foreground">{chunks}</span>,
                highlight: (chunks: ReactNode) => <span className="text-primary">{chunks}</span>
            })}
        </h1>
    );
};

const HeroSubtitle = () => {
    const t = useTranslations('Hero');
    return <h2 className="text-2xl text-muted-foreground mb-12 font-light">{t('subtitle')}</h2>;
};

export default function Hero() {
    return (
        <section className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-background relative py-8 md:py-0">
            <SectionContainer maxWidth="4xl" className="text-center">
                <HeroTitle />
                <HeroSubtitle />
            </SectionContainer>
        </section>
    );
}
