import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, Home, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-6">
                    <Link href="/(frontend)/(app)/test-admin/posts" className="flex items-center gap-2 font-semibold">
                        <LayoutDashboard className="h-6 w-6" />
                        <span>Admin Panel</span>
                    </Link>
                </div>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                    <Link
                        href="/(frontend)/(app)/test-admin/posts"
                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                    >
                        <FileText className="h-4 w-4" />
                        Posts
                    </Link>
                    <Link
                        href="/(frontend)/(app)/test-admin/editor"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Settings className="h-4 w-4" />
                        Editor Test
                    </Link>
                    <div className="mt-auto">
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4" />
                            Back to App
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-64">
                <div className="flex-1 p-4 sm:px-6 sm:py-0">{children}</div>
            </main>
        </div>
    );
}
