'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useMemo } from 'react';
import { api } from '@/lib/trpc/client';

type GithubStarsProps = {
    className?: string;
    repoUrl?: string;
    count?: string;
};

function formatStarCount(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
}

function extractRepoInfo(url: string): { owner: string; repo: string } | null {
    try {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (match) {
            return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
        }
    } catch (error) {
        console.error('Error extracting repo info:', error);
    }
    return null;
}

export function GithubStars({
    className,
    repoUrl = 'https://github.com/Bima42/saas-boilerplate',
    count: defaultCount = '0'
}: GithubStarsProps) {
    const repoInfo = useMemo(() => extractRepoInfo(repoUrl), [repoUrl]);

    const { data, isLoading, isError } = api.test.getGithubStars.useQuery(
        {
            owner: repoInfo?.owner ?? '',
            repo: repoInfo?.repo ?? ''
        },
        {
            enabled: !!repoInfo,
            staleTime: 1000 * 60 * 5
        }
    );

    const displayCount = useMemo(() => {
        if (isLoading) return '...';
        if (isError || !data) return defaultCount;
        return formatStarCount(data.stargazers_count);
    }, [data, isLoading, isError, defaultCount]);

    return (
        <Link
            href={repoUrl}
            target="_blank"
            aria-label={`Stars: ${displayCount}`}
            className={cn(
                // Layout & Sizing
                'group inline-flex items-center gap-2 rounded-md p-2',
                // Typography
                'text-sm font-medium transition-colors',
                // Colors (Using your globals.css variables)
                'border border-border bg-background text-foreground',
                'hover:bg-accent hover:text-accent-foreground',
                className
            )}
        >
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 fill-current opacity-80 group-hover:opacity-100"
            >
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.21 11.43c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.07-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.25 1.87 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.36 1.24-3.2-.13-.31-.54-1.56.12-3.24 0 0 1.01-.32 3.3 1.22.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.54 3.3-1.22 3.3-1.22.66 1.68.25 2.93.12 3.24.77.84 1.24 1.9 1.24 3.2 0 4.58-2.8 5.6-5.47 5.9.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.69.83.57A12 12 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
            </svg>

            <div className="h-4 w-px bg-border" aria-hidden="true" />

            <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">{displayCount}</span>
        </Link>
    );
}

export default GithubStars;
