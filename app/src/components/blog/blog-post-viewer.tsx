'use client';

import React from 'react';
import { PlateViewer } from '@/components/editor/viewer';
import type { Value } from 'platejs';

type Post = {
    title: string;
    description: string | null;
    content: unknown;
    coverImage: string | null;
    publishedAt: Date | null;
    author: {
        name: string;
        image: string | null;
    };
};

export function BlogPostViewer({ post }: { post: Post }) {
    return (
        <article className="container p-4">
            {post.coverImage && (
                <div className="mb-8 overflow-hidden rounded-lg">
                    <img src={post.coverImage} alt={post.title} className="w-full h-auto" />
                </div>
            )}

            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
                {post.description && <p className="mt-4 text-xl text-muted-foreground">{post.description}</p>}

                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    {post.author && (
                        <>
                            {post.author.image && (
                                <img
                                    src={post.author.image}
                                    alt={post.author.name || 'Author'}
                                    className="h-10 w-10 rounded-full"
                                />
                            )}
                            <div>
                                <div className="font-medium text-foreground">{post.author.name}</div>
                                {post.publishedAt && (
                                    <time dateTime={post.publishedAt.toISOString()}>
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </header>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                <PlateViewer value={(post.content as Value) || [{ type: 'p', children: [{ text: '' }] }]} />
            </div>
        </article>
    );
}
