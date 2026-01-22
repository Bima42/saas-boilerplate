import React from 'react';
import { TRPCProvider } from '@/providers/trpc-provider';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <TRPCProvider>
            {children}
        </TRPCProvider>
    );
}