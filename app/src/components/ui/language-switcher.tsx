'use client';

import { useTranslations } from 'next-intl';
import { Languages } from 'lucide-react';
import { SimpleButton } from '@/components/ui/simple-button';
import { LANGUAGE_NAMES } from '@/config/config';
import { useLanguageSwitcher } from '@/hooks/use-language-switcher';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ReactNode, useEffect, useState } from 'react';

export function LanguageSwitcherDropdown({
    children,
    dropdownClassName = ''
}: {
    children: ReactNode;
    dropdownClassName?: string;
}) {
    const { currentLocale, switchLocale } = useLanguageSwitcher();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by rendering a static placeholder or the trigger only
    // until mounted. For dropdowns, returning children is usually safe,
    // but we guard the content inside the menu.
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>{children}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`w-48 ${dropdownClassName}`}>
                {Object.entries(LANGUAGE_NAMES).map(([locale, { name, icon }]) => (
                    <DropdownMenuItem
                        key={locale}
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => switchLocale(locale as keyof typeof LANGUAGE_NAMES)}
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">{icon}</span>
                            <span>{name}</span>
                        </span>
                        {currentLocale === locale && <span className="text-neutral-500">✓</span>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function LanguageSwitcher({
    dropdownClassName = '',
    className = ''
}: {
    dropdownClassName?: string;
    className?: string;
}) {
    const t = useTranslations('LanguageSwitcher');

    return (
        <LanguageSwitcherDropdown dropdownClassName={dropdownClassName}>
            <SimpleButton
                icon={Languages}
                size="lg"
                label={t('changeLanguage')}
                tooltipClassName={dropdownClassName}
                className={className}
                onClick={() => {}}
            />
        </LanguageSwitcherDropdown>
    );
}
