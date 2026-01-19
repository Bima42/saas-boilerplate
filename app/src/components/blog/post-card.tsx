import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';

import type { Post } from '@/payload-types';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const t = useTranslations('Blog');
    const { title, description, slug, tags, publishedDate } = post;

    return (
        <Link
            href={`/blog/${slug}`}
            className="group relative flex flex-col bg-card/50 backdrop-blur-sm border hover:border-primary/50 rounded-lg p-6 h-full transition-colors"
        >
            {/* Top Row: Date & Tags */}
            <div className="flex items-center justify-between mb-4">
                <time className="text-sm font-mono text-muted-foreground">
                    {publishedDate ? format(new Date(publishedDate), 'MMM dd, yyyy') : ''}
                </time>
                <div className="flex gap-2">
                    {tags?.slice(0, 2).map((tagItem) => (
                        <span
                            key={tagItem.tag}
                            className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-secondary/50 text-secondary-foreground"
                        >
                            {tagItem.tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground mb-8 line-clamp-3 flex-grow leading-relaxed">
                {description || t('noDescription')}
            </p>

            {/* Footer: Read More */}
            <div className="flex items-center text-sm font-medium text-primary mt-auto">
                {t('readMore')}
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    );
}
