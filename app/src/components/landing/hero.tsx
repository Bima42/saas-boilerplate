'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import { BackgroundPattern } from '@/components/landing/background-pattern';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    const openWindowToRepo = () => {
        window.open('https://github.com/Bima42/saas-boilerplate', '_blank');
    };

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
            <BackgroundPattern />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <Badge variant="secondary" className="rounded-full py-1 border-border">
                    <Link href="#" className="flex items-center gap-1">
                        {t('badge')} <ArrowUpRight className="size-4" />
                    </Link>
                </Badge>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
                    {t.rich('title', {
                        strike: (chunks) => (
                            <span className="line-through text-muted-foreground decoration-2">{chunks}</span>
                        ),
                        highlight: (chunks) => <span className="text-primary">{chunks}</span>
                    })}
                </h1>
                <p className="mt-6 md:text-lg text-foreground/80 max-w-2xl mx-auto">{t('description')}</p>
                <div className="mt-12 flex items-center justify-center gap-4">
                    <Button size="lg" className="rounded-full text-base" onClick={openWindowToRepo}>
                        {t('cta')} <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full text-base shadow-none">
                        <CirclePlay className="mr-2 h-5 w-5" /> {t('demo')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
