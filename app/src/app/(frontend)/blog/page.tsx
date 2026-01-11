import React from 'react';
import { getPayloadClient } from '@/lib/payload';
import { PostCard } from '@/components/blog/post-card';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const payload = await getPayloadClient();
    const t = await getTranslations('Blog');

    const posts = await payload.find({
        collection: 'posts',
        limit: 10,
        sort: '-createdAt'
    });

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">{t('title')}</h2>
                <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            {posts.docs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">{t('noPosts')}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.docs.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
