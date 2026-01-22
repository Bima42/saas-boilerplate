import React from 'react';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { api, trpc } from '@/lib/trpc/server';
import { BlogPostViewer } from '@/components/blog/blog-post-viewer';
import { Button } from '@/components/ui/button';

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
    } catch (error) {
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
            <div className="container mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
                >
                    <Link href="/">
                        <ArrowLeft size="s" />
                        Back to all posts
                    </Link>
                </Button>
            </div>
            <BlogPostViewer post={post} />
        </main>
    );
}
