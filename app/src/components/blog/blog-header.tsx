'use client';

import React from 'react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function BlogHeader() {
    const router = useRouter();

    const segment = useSelectedLayoutSegment();
    const isPost = !!segment;

    return (
        <header className="border-b border-border bg-card">
            <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
                <Button
                    variant="outline"
                    onClick={() => {
                        if (isPost) {
                            router.push('/blog');
                        } else {
                            router.push('/');
                        }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft />
                </Button>
                <h1 className="text-2xl font-bold">Blog</h1>
            </div>
        </header>
    );
}
