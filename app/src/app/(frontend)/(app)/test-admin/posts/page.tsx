'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/trpc/client';

export default function AdminPostsPage() {
    // Fetch posts (drafts & published)
    const { data: posts, isLoading, refetch } = api.post.adminList.useQuery();

    // Mutation for deleting (optimistic update logic can be added later)
    const deletePost = api.post.delete.useMutation({
        onSuccess: () => {
            refetch();
        }
    });

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost.mutate({ id });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
                    <p className="text-muted-foreground">Manage your blog content, drafts, and publications.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Title
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Status
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Published Date
                                </th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="h-24 text-center">
                                        Loading posts...
                                    </td>
                                </tr>
                            ) : posts?.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No posts found. Create your first one!
                                    </td>
                                </tr>
                            ) : (
                                posts?.map((post) => (
                                    <tr key={post.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">
                                            {post.title}
                                            <div className="text-xs text-muted-foreground font-normal">
                                                /{post.slug}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            {post.publishedAt ? (
                                                <span className="inline-flex items-center rounded-full border border-transparent bg-green-500/15 px-2.5 py-0.5 text-xs font-semibold text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full border border-transparent bg-yellow-500/15 px-2.5 py-0.5 text-xs font-semibold text-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {post.publishedAt && (
                                                    <Button variant="ghost" size="icon" asChild title="View Live">
                                                        <Link href={`/blog/${post.slug}`} target="_blank">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="icon" asChild title="Edit">
                                                    <Link href={`/admin/posts/${post.id}`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive/90"
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={deletePost.isPending}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
