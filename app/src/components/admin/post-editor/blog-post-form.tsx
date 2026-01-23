'use client';

import React, { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Hash, X } from 'lucide-react';
import { BlogPostFormData } from '@/server/types/Post';

interface BlogPostProps {
    form: UseFormReturn<BlogPostFormData>;
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
                    'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export function BlogPostForm({ form }: BlogPostProps) {
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = tagInput.trim();
            if (val) {
                // Typescript now knows 'tags' is string[]
                const currentTags = form.getValues('tags') || [];
                if (!currentTags.includes(val)) {
                    form.setValue('tags', [...currentTags, val], { shouldDirty: true });
                }
                setTagInput('');
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        const currentTags = form.getValues('tags') || [];
        form.setValue(
            'tags',
            currentTags.filter((tag) => tag !== tagToRemove),
            { shouldDirty: true }
        );
    };

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

            {/* Tags Section */}
            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {field.value?.map((tag) => (
                                <Badge key={tag} variant="secondary" className="px-2 py-1 text-sm font-normal">
                                    <Hash className="mr-1 h-3 w-3 opacity-50" />
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 hover:text-destructive focus:outline-none"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <FormControl>
                            <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="Add tags... (Press Enter)"
                                    className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-auto"
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
