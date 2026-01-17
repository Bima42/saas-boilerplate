'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { authClient } from '@/lib/better-auth/auth-client';

export function LoginButton() {
    const t = useTranslations('Auth');
    const { data: session } = authClient.useSession();

    return (
        <Button asChild size="sm" className="gap-2">
            <Link href={session ? '/dashboard' : '/login'}>
                <LogIn className="w-4 h-4" />
                {session ? t('dashboard') : t('login')}
            </Link>
        </Button>
    );
}
