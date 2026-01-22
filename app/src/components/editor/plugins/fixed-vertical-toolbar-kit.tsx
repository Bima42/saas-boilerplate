'use client';

import { createPlatePlugin } from 'platejs/react';

import { FixedVerticalToolbar } from '@/components/ui/fixed-vertical-toolbar/fixed-vertical-toolbar';
import { FixedVerticalToolbarButtons } from '@/components/ui/fixed-vertical-toolbar/fixed-vertical-toolbar-buttons';

export const FixedVerticalToolbarKit = [
  createPlatePlugin({
    key: 'fixed-vertical-toolbar',
    render: {
      beforeEditable: () => (
        <FixedVerticalToolbar>
          <FixedVerticalToolbarButtons />
        </FixedVerticalToolbar>
      ),
    },
  }),
];