import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { Post, Media } from '@/payload-types';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const t = useTranslations('Blog');
    const { title, description, slug, coverImage, tags, readTime } = post;

    const image = coverImage as Media | undefined;
    console.log(image);

    return (
        <Card className="shadow-none overflow-hidden rounded-md py-0 flex flex-col h-full">
            <CardHeader className="p-0">
                {image?.url ? (
                    <div className="aspect-video w-full relative border-b overflow-hidden">
                        <Image
                            src={image.url}
                            alt={image.alt || title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="aspect-video bg-muted w-full border-b flex items-center justify-center text-muted-foreground/20">
                        {t('noImage')}
                    </div>
                )}
            </CardHeader>

            <CardContent className="pb-6 pt-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    {tags &&
                        tags.length > 0 &&
                        tags.map((tag) => (
                            <Badge
                                key={tag.tag}
                                className="bg-accent/10 text-accent hover:bg-accent/10 shadow-none border-none"
                            >
                                {tag.tag}
                            </Badge>
                        ))}
                    {readTime && (
                        <span className="font-medium text-xs text-muted-foreground">
                            {readTime} {t('minRead')}
                        </span>
                    )}
                </div>

                <Link href={`/blog/${slug}`} className="group">
                    <h3 className="text-[1.4rem] font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>

                <p className="mt-2 text-muted-foreground line-clamp-3 flex-1">{description || t('noDescription')}</p>

                <div className="mt-6">
                    <Button asChild size="sm" className="shadow-none gap-1">
                        <Link href={`/blog/${slug}`}>
                            {t('readMore')} <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
