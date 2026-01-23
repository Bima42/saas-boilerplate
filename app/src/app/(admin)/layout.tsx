import React from 'react';
import { TRPCProvider } from '@/providers/trpc-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <TRPCProvider>
            <div className="flex min-h-screen w-full bg-muted/40 overflow-x-hidden">
                <AdminSidebar />

                <main className="flex flex-1 flex-col min-w-0 w-full pt-14 lg:pt-0 lg:pl-16 overflow-x-hidden">
                    <div className="flex-1 w-full min-w-0 p-3 sm:p-4 lg:px-6 lg:py-6">{children}</div>
                </main>
            </div>
        </TRPCProvider>
    );
}
