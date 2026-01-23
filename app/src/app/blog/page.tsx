import React from 'react';
import { getTranslations } from 'next-intl/server';
import { trpc } from '@/lib/trpc/server';
import { BlogPostCard } from '@/components/blog/blog-post-card';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await trpc.post.getAll();
    const t = await getTranslations('Blog');

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">{t('title')}</h2>
                <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">{t('noPosts')}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
