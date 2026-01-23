import React from 'react';
import { Metadata } from 'next';
import { trpc } from '@/lib/trpc/server';
import { BlogPostViewer } from '@/components/blog/blog-post-viewer';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = await trpc.post.getBySlug({ slug });

        return {
            title: post.title,
            description: post.description || undefined,
            openGraph: {
                title: post.title,
                description: post.description || undefined,
                type: 'article',
                publishedTime: post.publishedAt?.toISOString(),
                authors: [post.author.name],
                images: post.coverImage ? [{ url: post.coverImage }] : undefined
            }
        };
    } catch {
        return {
            title: 'Post Not Found'
        };
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;

    const post = await trpc.post.getBySlug({ slug });

    return (
        <main className="min-h-screen bg-background">
            <BlogPostViewer post={post} />
        </main>
    );
}
