'use client';

import * as React from 'react';

import type { PlateContentProps, PlateViewProps } from 'platejs/react';

import { cva } from 'class-variance-authority';
import { PlateContainer, PlateContent, PlateView } from 'platejs/react';

import { cn } from '@/lib/utils';

const viewerContainerVariants = cva(
  'relative w-full cursor-text select-text overflow-y-auto'
);

export function ViewerContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <PlateContainer
      className={cn(viewerContainerVariants(), className)}
      {...props}
    />
  );
}

const viewerVariants = cva(
  cn(
    'relative w-full overflow-x-hidden whitespace-pre-wrap break-words',
    'text-base',
    '[&_strong]:font-bold'
  )
);

export type ViewerProps = PlateContentProps;

export const Viewer = ({
  className,
  ref,
  ...props
}: ViewerProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <PlateContent
    ref={ref}
    className={cn(viewerVariants(), className)}
    disableDefaultStyles
    {...props}
  />
);

Viewer.displayName = 'Viewer';

export function ViewerView({
  className,
  ...props
}: PlateViewProps) {
  return (
    <PlateView
      {...props}
      className={cn(viewerVariants(), className)}
    />
  );
}

ViewerView.displayName = 'ViewerView';