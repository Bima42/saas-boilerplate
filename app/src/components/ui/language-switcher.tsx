'use client';

import { useTranslations } from 'next-intl';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Switched to standard Button
import { LANGUAGE_NAMES } from '@/config/config';
import { useLanguageSwitcher } from '@/hooks/use-language-switcher';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
    className?: string;
    dropdownClassName?: string;
}

export function LanguageSwitcher({ className = '', dropdownClassName = '' }: LanguageSwitcherProps) {
    const t = useTranslations('LanguageSwitcher');
    const { currentLocale, switchLocale } = useLanguageSwitcher();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={`gap-2 ${className}`}>
                    <Languages />
                </Button>
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
