'use client';

import React from 'react';
import { Plate, usePlateEditor } from 'platejs/react';
import type { Value } from 'platejs';
import { Viewer, ViewerContainer } from '@/components/ui/viewer';
import { ViewerKit } from './viewer-kit';

interface PlateViewerProps {
    value: Value;
}

const defaultValue: Value = [
    {
        type: 'p',
        children: [{ text: '' }]
    }
];

export function PlateViewer({ value = defaultValue }: PlateViewerProps) {
    const editor = usePlateEditor({
        plugins: ViewerKit,
        value: value,
        readOnly: true
    });
    
    return (
        <Plate editor={editor}>
            <ViewerContainer>
                <Viewer />
            </ViewerContainer>
        </Plate>
    );
}