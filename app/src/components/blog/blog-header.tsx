'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { SimpleButton } from '@/components/ui/simple-button';

export function BlogHeader() {
    const segment = useSelectedLayoutSegment();
    const isPost = !!segment;

    return (
        <header className="border-b border-border bg-card">
            <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
                <SimpleButton
                    icon={ArrowLeft}
                    href={isPost ? '/blog' : '/'}
                    iconClassName="text-muted-foreground hover:text-foreground transition-colors"
                />
                <h1 className="text-2xl font-bold">Blog</h1>
            </div>
        </header>
    );
}
