import React from 'react';
import { BlogHeader } from '@/components/blog/blog-header';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <BlogHeader />
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        </div>
    );
}
