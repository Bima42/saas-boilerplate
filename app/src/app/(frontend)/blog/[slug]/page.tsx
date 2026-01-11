import React from 'react';
import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import { RichText } from '@/components/blog/rich-text';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const payload = await getPayloadClient();
    const posts = await payload.find({
        collection: 'posts',
        limit: 100,
        select: { slug: true }
    });

    return posts.docs.filter((doc) => doc.slug).map((doc) => ({ slug: doc.slug }));
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

    if (!post) {
        return notFound();
    }

    return (
        <article className="max-w-3xl mx-auto space-y-8">
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
