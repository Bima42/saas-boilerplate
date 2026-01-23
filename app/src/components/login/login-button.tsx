'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { authClient } from '@/lib/better-auth/auth-client';
import { LOGGED_HOME_PATH } from '@/config/config';

export function LoginButton() {
    const t = useTranslations('Auth');
    const { data: session } = authClient.useSession();

    const loginHref = `/login?callbackURL=${encodeURIComponent(LOGGED_HOME_PATH)}`;

    return (
        <Button asChild size="sm" className="gap-2">
            <Link href={session ? LOGGED_HOME_PATH : loginHref}>
                <LogIn className="w-4 h-4" />
                {session ? t('dashboard') : t('login')}
            </Link>
        </Button>
    );
}
