import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from '@/providers/trpc-provider';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <TRPCProvider>
            <Toaster />
            {children}
        </TRPCProvider>
    );
}
