'use client';

import { TRPCProvider as TRPCProviderBase } from '@/lib/trpc/client';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
    return <TRPCProviderBase>{children}</TRPCProviderBase>;
}
