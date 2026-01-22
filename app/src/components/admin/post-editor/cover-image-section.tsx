'use client';

import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form';

interface CoverImageSectionProps {
    form: UseFormReturn<{
        title: string;
        slug: string;
        description?: string;
        coverImage?: string;
    }>;
}

export function CoverImageSection({ form }: CoverImageSectionProps) {
    const [showCoverInput, setShowCoverInput] = useState(false);
    const watchCoverImage = form.watch('coverImage');

    useEffect(() => {
        if (watchCoverImage) {
            setShowCoverInput(true);
        }
    }, [watchCoverImage]);

    return (
        <div className="group relative w-full max-w-full">
            {watchCoverImage ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={watchCoverImage} alt="Cover" className="h-full w-full object-cover" />
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100 z-10"
                        onClick={() => form.setValue('coverImage', '', { shouldDirty: true })}
                    >
                        <X size="s" />
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-2 relative z-10">
                    {!showCoverInput ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowCoverInput(true)}
                            className="text-muted-foreground hover:text-foreground -ml-2 h-8 relative z-10"
                        >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Add cover image
                        </Button>
                    ) : (
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <div className="flex w-full max-w-md items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <Input placeholder="https://..." {...field} className="h-8" autoFocus />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 flex-shrink-0"
                                        onClick={() => setShowCoverInput(false)}
                                    >
                                        <X size="s" />
                                    </Button>
                                </div>
                            )}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
