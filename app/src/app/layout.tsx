import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemesProvider } from '@/providers/theme-provider';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
// import { AuthErrorListener } from '@/components/auth-error-listener';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Boilerplate',
    description:
        'A modern SaaS Boilerplate simple, easy to use. Build on top of Drizzle, tRPC, BetterAuth, Shadcn and PlateJS to quickly produce high-quality SaaS applications.'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <ThemesProvider>
                        <Toaster />
                        {/*<AuthErrorListener />*/}
                        {children}
                    </ThemesProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
