'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { api } from '@/lib/trpc/client';

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

const formSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(255, 'Title is too long'),
    slug: z.string().min(3, 'Slug is too short'),
    description: z.string().max(500, 'Description must be less than 500 characters').optional()
});

type FormData = z.infer<typeof formSchema>;

interface CreatePostDialogProps {
    children?: React.ReactNode;
}

export function CreatePostDialog({ children }: CreatePostDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // Track if slug was manually edited to prevent auto-overwrite
    const [slugEdited, setSlugEdited] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            slug: '',
            description: ''
        }
    });

    const createPost = api.post.create.useMutation({
        onSuccess: (data) => {
            toast.success('Draft created successfully');
            setOpen(false);
            form.reset();
            setSlugEdited(false);
            router.push(`/admin/posts/${data.id}`);
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create post');
        }
    });

    const onSubmit = (data: FormData) => {
        createPost.mutate(data);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        form.setValue('title', title, { shouldValidate: true });

        // Only auto-generate if user hasn't manually touched the slug
        if (!slugEdited) {
            const generatedSlug = generateSlug(title);
            form.setValue('slug', generatedSlug, { shouldValidate: true });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                        Start writing your new article. You can edit these details later.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 py-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. The Future of Web Development"
                                            {...field}
                                            onChange={handleTitleChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        {/* Input Group Pattern */}
                                        <div className="flex rounded-md shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                            <span className="flex select-none items-center px-3 text-muted-foreground border border-r-0 rounded-l-md bg-muted/50 text-sm">
                                                /blog/
                                            </span>
                                            <Input
                                                {...field}
                                                className="rounded-l-none shadow-none focus-visible:ring-0"
                                                placeholder="post-url-slug"
                                                onChange={(e) => {
                                                    setSlugEdited(true);
                                                    field.onChange(e);
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription>This will be the URL of your post.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Short Description{' '}
                                        <span className="text-muted-foreground font-normal">(Optional)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="A brief summary for SEO and social previews..."
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={createPost.isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createPost.isPending}>
                                {createPost.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Draft
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
