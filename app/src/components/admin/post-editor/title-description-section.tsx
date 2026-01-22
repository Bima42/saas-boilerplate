'use client';

import React, { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface TitleDescriptionSectionProps {
    form: UseFormReturn<{
        title: string;
        slug: string;
        description?: string;
        coverImage?: string;
    }>;
}

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
    ({ className, value, onChange, ...props }, ref) => {
        const internalRef = useRef<HTMLTextAreaElement>(null);
        
        const setRefs = (element: HTMLTextAreaElement | null) => {
            internalRef.current = element;
            if (typeof ref === 'function') {
                ref(element);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = element;
            }
        };

        const adjustHeight = () => {
            const textarea = internalRef.current;
            if (textarea) {
                textarea.style.height = 'auto'; 
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };

        useEffect(() => {
            adjustHeight();
        }, [value]);

        return (
            <textarea
                ref={setRefs}
                className={cn(
                    "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                value={value}
                onChange={(e) => {
                    adjustHeight();
                    onChange?.(e);
                }}
                rows={1}
                {...props}
            />
        );
    }
);
AutoResizeTextarea.displayName = "AutoResizeTextarea";

export function TitleDescriptionSection({ form }: TitleDescriptionSectionProps) {
    return (
        <div className="w-full max-w-full space-y-4 lg:space-y-6">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <AutoResizeTextarea
                                {...field}
                                placeholder="Post Title"
                                className="w-full resize-none border-0 p-0 shadow-none focus-visible:ring-0 bg-transparent text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight placeholder:text-muted-foreground/40 overflow-hidden min-h-[1.1em] leading-[1.1]"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <AutoResizeTextarea
                                {...field}
                                placeholder="Add a subtitle or summary..."
                                className="w-full resize-none border-0 p-0 shadow-none focus-visible:ring-0 bg-transparent text-lg sm:text-xl md:text-2xl text-muted-foreground overflow-hidden min-h-[1.5em] leading-relaxed"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}