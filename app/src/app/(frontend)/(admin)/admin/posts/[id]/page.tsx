'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Value } from 'platejs';

import { Form } from '@/components/ui/form';

import { api } from '@/lib/trpc/client';
import { PlateEditor } from '@/components/editor/editor';
import { Toolbar } from '@/components/admin/post-editor/toolbar';
import { CoverImageSection } from '@/components/admin/post-editor/cover-image-section';
import { TitleDescriptionSection } from '@/components/admin/post-editor/title-description-section';
import { BlogPostViewer } from '@/components/blog/blog-post-viewer';
import { useDebouncedCallback } from 'use-debounce';

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    coverImage: z.url('Must be a valid URL').optional().or(z.literal(''))
});

type FormData = z.infer<typeof formSchema>;

export default function EditPostPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [content, setContent] = useState<Value>([{ type: 'p', children: [{ text: '' }] }]);
    const [initialContent, setInitialContent] = useState<Value>([{ type: 'p', children: [{ text: '' }] }]);
    const [isPublished, setIsPublished] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editorKey, setEditorKey] = useState(0);
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

    const { data: post, isLoading } = api.post.adminGetById.useQuery({ id });
    const utils = api.useUtils();
    const contentRef = React.useRef<Value>(initialContent);

    const handleContentChange = useDebouncedCallback((newValue: Value) => {
        setContent(newValue);
    }, 200);

    const onEditorChange = (newValue: Value) => {
        contentRef.current = newValue;
        handleContentChange(newValue);
    };

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            slug: '',
            description: '',
            coverImage: ''
        }
    });

    useEffect(() => {
        if (post) {
            form.reset({
                title: post.title,
                slug: post.slug,
                description: post.description || '',
                coverImage: post.coverImage || ''
            });
            const postContent = (post.content as Value) || [{ type: 'p', children: [{ text: '' }] }];
            setContent(postContent);
            setInitialContent(postContent);
            setIsPublished(!!post.publishedAt);
            setEditorKey((prev) => prev + 1);
        }
    }, [post, form]);

    const formIsDirty = form.formState.isDirty;
    const contentHasChanged = JSON.stringify(content) !== JSON.stringify(initialContent);
    const publishStatusChanged = post ? isPublished !== !!post.publishedAt : false;
    const hasUnsavedChanges = formIsDirty || contentHasChanged || publishStatusChanged;

    const updatePost = api.post.update.useMutation({
        onSuccess: async () => {
            toast.success('Post saved');
            setIsSaving(false);
            form.reset(form.getValues());
            setInitialContent(content);
            await utils.post.adminGetById.invalidate({ id });
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to save');
            setIsSaving(false);
        }
    });

    const deletePost = api.post.delete.useMutation({
        onSuccess: () => {
            toast.success('Post deleted');
            router.push('/admin/posts');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSaving(true);
        updatePost.mutate({
            id,
            ...data,
            content: contentRef.current,
            published: isPublished
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost.mutate({ id });
        }
    };

    const handleViewModeChange = (mode: 'edit' | 'preview') => {
        setViewMode(mode);
    };

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!post) return null;

    const previewPost = {
        title: form.watch('title'),
        description: form.watch('description') || null,
        content: content,
        coverImage: form.watch('coverImage') || null,
        publishedAt: isPublished ? post.publishedAt || new Date() : null,
        author: post.author
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full min-h-screen overflow-x-hidden">
                <div className="fixed top-14 left-0 right-0 z-30 lg:fixed lg:top-0 lg:left-16 lg:right-0 lg:z-40 border-b bg-background">
                    <Toolbar
                        isPublished={isPublished}
                        setIsPublished={setIsPublished}
                        hasUnsavedChanges={hasUnsavedChanges}
                        isSaving={isSaving}
                        postSlug={post.slug}
                        onDelete={handleDelete}
                        viewMode={viewMode}
                        onViewModeChange={handleViewModeChange}
                    />
                </div>

                <div className="pt-[104px] lg:pt-12">
                    {viewMode === 'edit' ? (
                        <div className="w-full lg:max-w-6xl lg:mx-auto lg:px-8">
                            <div className="w-full space-y-12 lg:space-y-16">
                                <div className="px-4 lg:px-0">
                                    <CoverImageSection form={form} />
                                </div>

                                <div className="px-4 lg:px-0">
                                    <TitleDescriptionSection form={form} />
                                </div>

                                <div className="lg:px-0">
                                    <div className="relative w-full border-t lg:border lg:rounded-xl bg-background">
                                        <div className="w-full min-h-[400px] sm:min-h-[500px]">
                                            <PlateEditor
                                                key={editorKey}
                                                initialValue={content}
                                                onChange={onEditorChange}
                                                placeholder="Tell your story..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <BlogPostViewer post={previewPost} />
                    )}
                </div>
            </form>
        </Form>
    );
}
