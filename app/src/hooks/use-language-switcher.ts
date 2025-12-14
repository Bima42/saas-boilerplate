'use client';

import { useLocale } from 'next-intl';
import { type Locale, locales } from '@/config/locales';
import { setUserLocale } from '@/lib/locale';

export function useLanguageSwitcher() {
    const currentLocale = useLocale();

    const switchLocale = async (locale: Locale) => {
        await setUserLocale(locale);
    };

    return {
        currentLocale: currentLocale as Locale,
        availableLocales: locales,
        switchLocale
    };
}
