'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, Plus, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { authClient } from '@/lib/better-auth/auth-client';
import { cn } from '@/lib/utils';
import { CreatePostDialog } from '@/components/admin/admin-create-post-dialog';
import { LOGGED_HOME_PATH } from '@/config/config';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    className?: string;
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
}

function SidebarItem({
    icon: Icon,
    label,
    href,
    onClick,
    active,
    className,
    tooltipSide = 'bottom'
}: SidebarItemProps) {
    const button = (
        <Button
            variant={active ? 'secondary' : 'ghost'}
            className={cn('h-10 w-10', className)}
            onClick={onClick}
            asChild={!!href}
        >
            {href ? (
                <Link href={href}>
                    <Icon className="size-5" />
                    <span className="sr-only">{label}</span>
                </Link>
            ) : (
                <span>
                    <Icon className="size-5" />
                    <span className="sr-only">{label}</span>
                </span>
            )}
        </Button>
    );

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side={tooltipSide} className="font-medium">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
}

function MobileNavbar({ isPostsActive, handleLogout }: { isPostsActive: boolean; handleLogout: () => Promise<void> }) {
    return (
        <nav className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b bg-background">
            <div className="flex h-full items-center justify-between px-4">
                <div className="flex items-center gap-1">
                    <SidebarItem
                        icon={FileText}
                        label="Posts"
                        href="/admin/posts"
                        active={isPostsActive}
                        tooltipSide="bottom"
                    />

                    <CreatePostDialog>
                        <span>
                            <SidebarItem
                                icon={Plus}
                                label="Create New Post"
                                className="bg-primary text-white hover:bg-primary/80 hover:text-white shadow-sm"
                                tooltipSide="bottom"
                            />
                        </span>
                    </CreatePostDialog>
                </div>

                <div className="flex items-center gap-1">
                    <SidebarItem icon={Globe} label="Back to Site" href="/" tooltipSide="bottom" />

                    <SidebarItem
                        icon={LogOut}
                        label="Logout"
                        onClick={handleLogout}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        tooltipSide="bottom"
                    />
                </div>
            </div>
        </nav>
    );
}

function DesktopSidebar({
    isPostsActive,
    handleLogout
}: {
    isPostsActive: boolean;
    handleLogout: () => Promise<void>;
}) {
    return (
        <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-16 flex-col items-center border-r bg-background py-4">
            <div className="flex flex-col gap-2 w-full items-center">
                {/* Main Action - Top Position in Orange */}
                <CreatePostDialog>
                    <span>
                        <SidebarItem
                            icon={Plus}
                            label="Create New Post"
                            className="bg-primary text-white hover:bg-primary/80 hover:text-white shadow-sm"
                            tooltipSide="right"
                        />
                    </span>
                </CreatePostDialog>

                <Separator className="w-8 my-1" />

                <SidebarItem
                    icon={FileText}
                    label="Posts"
                    href="/admin/posts"
                    active={isPostsActive}
                    tooltipSide="right"
                />
            </div>

            <div className="flex-1" />

            <div className="flex flex-col gap-2 items-center">
                <Separator className="w-8" />
                <SidebarItem icon={Globe} label="Back to Site" href={LOGGED_HOME_PATH} tooltipSide="right" />
                <SidebarItem icon={LogOut} label="Logout" onClick={handleLogout} tooltipSide="right" />
            </div>
        </aside>
    );
}

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const isPostsActive = pathname.startsWith('/admin/posts');

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success('Logged out successfully');
            router.push('/');
        } catch {
            toast.error('Error logging out');
        }
    };

    return (
        <TooltipProvider>
            <MobileNavbar isPostsActive={isPostsActive} handleLogout={handleLogout} />
            <DesktopSidebar isPostsActive={isPostsActive} handleLogout={handleLogout} />
        </TooltipProvider>
    );
}
