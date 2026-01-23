import { Toaster } from '@/components/ui/sonner';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { TRPCProvider } from '@/providers/trpc-provider';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages();
    return (
        <TRPCProvider>
            <NextIntlClientProvider messages={messages}>
                <Toaster />
                {children}
            </NextIntlClientProvider>
        </TRPCProvider>
    );
}
