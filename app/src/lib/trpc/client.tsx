'use client';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import superjson from 'superjson';
import { env } from '@/config/env';
import { AppRouter } from '@/server/api/root';

export const trpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return makeQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
    const base = (() => {
        if (env.NEXT_PUBLIC_APP_URL) return `https://${env.NEXT_PUBLIC_APP_URL}`;
        return 'http://localhost:3000';
    })();
    return `${base}/api/trpc`;
}

export function TRPCProvider(
    props: Readonly<{
        children: React.ReactNode;
    }>
) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: getUrl()
                })
            ]
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
        </trpc.Provider>
    );
}
