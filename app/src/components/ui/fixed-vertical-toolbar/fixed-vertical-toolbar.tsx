'use client';

import { cn } from '@/lib/utils';

import { Toolbar } from '../toolbar';

export function FixedVerticalToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar
      {...props}
      className={cn(
        'scrollbar-hide z-10 flex flex-col min-h-0 w-10 justify-start overflow-y-auto overflow-x-hidden border-r border-r-border bg-background p-1 shrink-0',
        props.className
      )}
    />
  );
}