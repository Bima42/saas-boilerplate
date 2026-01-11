import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { ThemesProvider } from '@/providers/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Boilerplate',
    description: 'A modern SaaS with TypeScript and Tailwind.'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className}>
                <ThemesProvider>{children}</ThemesProvider>
            </body>
        </html>
    );
}
