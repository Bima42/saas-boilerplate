'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/trpc/client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export default function AdminPostsPage() {
    const router = useRouter();
    const { data: posts, isLoading } = api.post.adminList.useQuery();

    const handleRowClick = (id: string) => {
        router.push(`/admin/posts/${id}`);
    };

    return (
        <div className="flex flex-col min-h-full">
            
            <div className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 border-b bg-muted/40 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Blogs</h1>
                    <p className="mt-2 sm:mt-4 text-base sm:text-lg text-muted-foreground">
                        Manage your articles and publications.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto max-w-5xl py-8 sm:py-12">
                <div className="rounded-md border bg-card overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[50%] sm:w-[450px] pl-4 sm:pl-6 h-10 sm:h-12">Article</TableHead>
                                <TableHead className="h-10 sm:h-12 hidden sm:table-cell">Status</TableHead>
                                <TableHead className="text-right pr-4 sm:pr-6 h-10 sm:h-12">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-32 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Loading blogs...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : posts?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                                        No blogs found. Use the sidebar to create your first one!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts?.map((post) => (
                                    <TableRow
                                        key={post.id}
                                        className="cursor-pointer hover:bg-muted/50 transition-colors h-16 sm:h-20"
                                        onClick={() => handleRowClick(post.id)}
                                    >
                                        <TableCell className="pl-4 sm:pl-6 py-3 align-middle">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
                                                    {post.title}
                                                </span>
                                                <span className="text-xs text-muted-foreground font-normal line-clamp-1">
                                                    /{post.slug}
                                                </span>
                                                <div className="sm:hidden mt-1">
                                                    {post.publishedAt ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                            Draft
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-3 align-middle hidden sm:table-cell">
                                            {post.publishedAt ? (
                                                <Badge 
                                                    variant="secondary" 
                                                    className="bg-green-500/15 text-green-600 hover:bg-green-500/25 border-0 rounded-full font-medium"
                                                >
                                                    Published
                                                </Badge>
                                            ) : (
                                                <Badge 
                                                    variant="secondary" 
                                                    className="bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25 border-0 rounded-full font-medium"
                                                >
                                                    Draft
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right pr-4 sm:pr-6 py-3 align-middle text-sm text-muted-foreground">
                                            {post.publishedAt
                                                ? new Date(post.publishedAt).toLocaleDateString()
                                                : '-'}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}