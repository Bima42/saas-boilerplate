import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemesProvider } from '@/providers/theme-provider';
// import { AuthErrorListener } from '@/components/auth-error-listener';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'A modern SaaS with TypeScript and Tailwind.'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemesProvider>
                    <Toaster />
                    {/*<AuthErrorListener />*/}
                    {children}
                </ThemesProvider>
            </body>
        </html>
    );
}
