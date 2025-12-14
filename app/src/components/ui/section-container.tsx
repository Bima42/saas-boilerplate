import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    padding?: 'sm' | 'md' | 'lg';
}

export default function SectionContainer({
    children,
    className,
    maxWidth = '6xl',
    padding = 'md'
}: SectionContainerProps) {
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl'
    };

    const paddingClasses = {
        sm: 'px-2',
        md: 'px-4',
        lg: 'px-6'
    };

    return (
        <div className={cn(maxWidthClasses[maxWidth], 'mx-auto', paddingClasses[padding], className)}>{children}</div>
    );
}
