'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                'z-50 overflow-hidden rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-neutral-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-neutral-50 dark:text-neutral-900',
                className
            )}
            {...props}
        />
    </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

interface TooltipWrapperProps {
    text: string | React.ReactNode;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    delayDuration?: number;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    tooltipClassName?: string;
}

export const TooltipWrapper = ({
    text,
    children,
    side = 'top',
    align = 'start',
    sideOffset = 0,
    delayDuration = 0,
    open,
    onOpenChange,
    tooltipClassName
}: TooltipWrapperProps) => (
    <TooltipProvider delayDuration={delayDuration}>
        <Tooltip open={open} onOpenChange={onOpenChange}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side={side} align={align} sideOffset={sideOffset} className={tooltipClassName}>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);
