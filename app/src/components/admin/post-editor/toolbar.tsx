'use client';

import React from 'react';
import { Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ToolbarProps {
    isPublished: boolean;
    setIsPublished: (value: boolean) => void;
    hasUnsavedChanges: boolean;
    isSaving: boolean;
    postSlug: string;
    onDelete: () => void;
    viewMode: 'edit' | 'preview';
    onViewModeChange: (mode: 'edit' | 'preview') => void;
}

interface DotIndicatorProps {
    color: 'green' | 'red' | 'amber';
    animate?: boolean;
}

function DotIndicator({ color, animate }: DotIndicatorProps) {
    const colorMap = {
        green: 'bg-green-500',
        red: 'bg-red-500',
        amber: 'bg-amber-500'
    };

    return (
        <span
            className={cn(
                'inline-block h-2 w-2 rounded-full flex-shrink-0',
                colorMap[color],
                animate && 'animate-pulse'
            )}
        />
    );
}

interface PublishStatusButtonProps {
    isPublished: boolean;
    setIsPublished: (value: boolean) => void;
    postSlug: string;
}

function PublishStatusButton({ isPublished, setIsPublished, postSlug }: PublishStatusButtonProps) {
    const handleBadgeClick = () => {
        if (postSlug) {
            window.open(`/blog/${postSlug}`, '_blank');
        }
    };

    return (
        <div className="flex items-center gap-2 flex-shrink-0">
            <Switch
                checked={isPublished}
                onCheckedChange={setIsPublished}
                id="publish-mode"
                className="data-[state=checked]:bg-green-600 flex-shrink-0"
            />
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Badge
                        variant="secondary"
                        className={cn(
                            'cursor-pointer rounded-md px-3 py-1.5 h-9 gap-2 flex items-center font-medium transition-colors',
                            isPublished
                                ? 'bg-green-500/15 text-green-600 hover:bg-green-500/25'
                                : 'bg-red-500/10 text-red-600 hover:bg-red-500/20',
                            !postSlug && 'cursor-default opacity-50'
                        )}
                        onClick={handleBadgeClick}
                    >
                        {isPublished ? <Eye size="s" /> : <EyeOff size="s" />}
                        <span className="text-xs whitespace-nowrap">{isPublished ? 'Published' : 'Offline'}</span>
                    </Badge>
                </TooltipTrigger>
                <TooltipContent side="bottom">{postSlug ? 'View live post' : 'No slug available'}</TooltipContent>
            </Tooltip>
        </div>
    );
}

interface DeleteButtonProps {
    onDelete: () => void;
}

function DeleteButton({ onDelete }: DeleteButtonProps) {
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onDelete}
                    className="h-9 w-9 text-destructive hover:bg-destructive/10 flex-shrink-0"
                >
                    <Trash2 size="s" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Delete</TooltipContent>
        </Tooltip>
    );
}

interface SaveButtonProps {
    isSaving: boolean;
    hasUnsavedChanges: boolean;
}

function SaveButton({ isSaving, hasUnsavedChanges }: SaveButtonProps) {
    return (
        <Button
            type="submit"
            disabled={isSaving || !hasUnsavedChanges}
            size="sm"
            className="min-w-[70px] sm:min-w-[80px] h-9 flex-shrink-0"
        >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
        </Button>
    );
}

interface ViewModeTabsProps {
    viewMode: 'edit' | 'preview';
    onViewModeChange: (mode: 'edit' | 'preview') => void;
}

function ViewModeTabs({ viewMode, onViewModeChange }: ViewModeTabsProps) {
    return (
        <Tabs value={viewMode} onValueChange={onViewModeChange as (value: string) => void}>
            <TabsList className="h-8">
                <TabsTrigger value="edit" className="text-xs">
                    Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-xs">
                    Preview
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

interface MobileToolbarProps extends ToolbarProps {
    className?: string;
}

function MobileToolbar({
    isPublished,
    setIsPublished,
    hasUnsavedChanges,
    isSaving,
    postSlug,
    onDelete,
    viewMode,
    onViewModeChange,
    className
}: MobileToolbarProps) {
    return (
        <header className={cn('w-full flex items-center justify-between border-b bg-background px-3 h-14', className)}>
            <div className="flex items-center gap-2 min-w-0 flex-shrink">
                <ViewModeTabs viewMode={viewMode} onViewModeChange={onViewModeChange} />

                {hasUnsavedChanges && (
                    <>
                        <Separator orientation="vertical" className="h-6 flex-shrink-0" />
                        <div className="flex items-center gap-2 min-w-0">
                            <DotIndicator color="amber" animate />
                            <span className="text-xs font-medium text-amber-500 whitespace-nowrap">Unsaved</span>
                        </div>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <PublishStatusButton isPublished={isPublished} setIsPublished={setIsPublished} postSlug={postSlug} />

                <Separator orientation="vertical" className="h-6 mx-1 flex-shrink-0" />

                <DeleteButton onDelete={onDelete} />
                <SaveButton isSaving={isSaving} hasUnsavedChanges={hasUnsavedChanges} />
            </div>
        </header>
    );
}

interface DesktopToolbarProps extends ToolbarProps {
    className?: string;
}

function DesktopToolbar({
    isPublished,
    setIsPublished,
    hasUnsavedChanges,
    isSaving,
    postSlug,
    onDelete,
    viewMode,
    onViewModeChange,
    className
}: DesktopToolbarProps) {
    return (
        <header className={cn('w-full flex items-center justify-between border-b bg-background px-6 h-14', className)}>
            <div className="flex items-center gap-4 min-w-0 flex-shrink">
                <ViewModeTabs viewMode={viewMode} onViewModeChange={onViewModeChange} />

                {hasUnsavedChanges && (
                    <>
                        <Separator orientation="vertical" className="h-6 flex-shrink-0" />
                        <div className="flex items-center gap-2 min-w-0">
                            <DotIndicator color="amber" animate />
                            <span className="text-xs font-medium text-amber-500 whitespace-nowrap">
                                Unsaved changes
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <PublishStatusButton isPublished={isPublished} setIsPublished={setIsPublished} postSlug={postSlug} />

                <Separator orientation="vertical" className="h-6 mx-2 flex-shrink-0" />

                <DeleteButton onDelete={onDelete} />
                <SaveButton isSaving={isSaving} hasUnsavedChanges={hasUnsavedChanges} />
            </div>
        </header>
    );
}

export function Toolbar(props: ToolbarProps) {
    return (
        <TooltipProvider>
            <MobileToolbar {...props} className="lg:hidden" />
            <DesktopToolbar {...props} className="hidden lg:flex" />
        </TooltipProvider>
    );
}
