'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LoginButton() {
    const t = useTranslations('Auth');

    return (
        <Button asChild size="sm" className="gap-2">
            <Link href="/login">
                <LogIn className="w-4 h-4" />
                {t('login')}
            </Link>
        </Button>
    );
}
