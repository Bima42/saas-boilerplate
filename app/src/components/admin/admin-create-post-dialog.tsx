'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus, Link as LinkIcon } from 'lucide-react';
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
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
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
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

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
        
        const generatedSlug = generateSlug(title);
        form.setValue('slug', generatedSlug, { shouldValidate: true });
    };

    const slug = form.watch('slug');

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
  
            <DialogContent className="rounded-lg">
                <DialogHeader className="text-left">
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                        Start writing your new article. You can edit these details later.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 py-2">
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


                        <div className="space-y-2">
                            <FormLabel>Post URL</FormLabel>
                            <div className="flex items-center gap-2 w-full rounded-md border border-input bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20 px-3 py-2.5 text-sm">
                                <LinkIcon className="h-4 w-4 flex-shrink-0 text-blue-500 animate-pulse" />
                                <span className="truncate text-muted-foreground">
                                    {origin ? `${origin}/blog/` : '.../blog/'}
                                    <span className="font-medium text-foreground">
                                        {slug || 'your-post-slug'}
                                    </span>
                                </span>
                            </div>

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <Input type="hidden" {...field} />
                                )}
                            />
                        </div>


                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="A brief summary for SEO and social previews..."
                                            className="resize-none min-h-[70px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <DialogFooter className="flex-row justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={createPost.isPending}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={createPost.isPending}
                            >
                                {createPost.isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create Draft
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}