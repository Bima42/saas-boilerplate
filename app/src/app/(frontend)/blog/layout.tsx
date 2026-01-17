import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SimpleButton } from '@/components/ui/simple-button';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <header className="border-b border-border bg-card">
                <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
                    <SimpleButton
                        icon={ArrowLeft}
                        href="/"
                        iconClassName="text-muted-foreground hover:text-foreground transition-colors"
                    />
                    <h1 className="text-2xl font-bold">Blog</h1>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        </div>
    );
}
