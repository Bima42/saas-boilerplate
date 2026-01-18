import React from 'react';
import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import { RichText } from '@/components/blog/rich-text';
import { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayloadClient();

    const result = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
        select: {
            title: true,
            meta: true
        }
    });

    const post = result.docs[0];

    if (!post) return { title: '404' };

    // Fallback logic
    const title = post.meta?.title || post.title;
    const description = post.meta?.description || '';

    const ogImage =
        typeof post.meta?.image === 'object' && post.meta.image?.url ? post.meta.image.url : '/images/og-default.jpg';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/blog/${slug}`,
            images: [{ url: ogImage }]
        }
    };
}

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const payload = await getPayloadClient();

    const result = await payload.find({
        collection: 'posts',
        where: {
            slug: { equals: slug }
        },
        limit: 1,
        depth: 2
    });

    const post = result.docs[0];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: typeof post.coverImage === 'object' ? post.coverImage?.url : undefined,
        datePublished: post.createdAt,
        author: {
            '@type': 'Organization',
            name: 'Boilerplate'
        }
    };

    if (!post) {
        return notFound();
    }

    return (
        <article className="max-w-3xl mx-auto space-y-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <header className="space-y-4 text-center border-b border-border pb-8">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
                {post.createdAt && (
                    <time className="text-muted-foreground block">{new Date(post.createdAt).toLocaleDateString()}</time>
                )}
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
                {post.content && <RichText data={post.content} />}
            </div>
        </article>
    );
}
