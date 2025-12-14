import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { locales, defaultLocale } from '@/config/locales';

const COOKIE_NAME = 'NEXT_LOCALE';

async function extractLanguageFromHeader(): Promise<string | null> {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');

    if (!acceptLanguage) return null;

    const primaryLanguage = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    return locales.includes(primaryLanguage as any) ? primaryLanguage : null;
}

export default getRequestConfig(async () => {
    const values = await cookies();

    const localeCookie = values.get(COOKIE_NAME)?.value;
    const browserLocale = !localeCookie ? await extractLanguageFromHeader() : null;

    const locale = localeCookie || browserLocale || defaultLocale;
    const safeLocale = locales.includes(locale as any) ? locale : defaultLocale;

    return {
        locale: safeLocale,
        messages: (await import(`./../messages/${safeLocale}.json`)).default
    };
});
