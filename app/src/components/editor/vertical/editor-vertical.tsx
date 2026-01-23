'use client';

import React from 'react';
import { Plate, usePlateEditor } from 'platejs/react';
import type { Value } from 'platejs';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { EditorVerticalKit } from './editor-vertical-kit';

interface PlateEditorVerticalProps {
    initialValue?: Value;
    onChange?: (value: Value) => void;
    readOnly?: boolean;
    placeholder?: string;
}

const defaultInitialValue: Value = [
    {
        type: 'p',
        children: [{ text: '' }]
    }
];

export function PlateEditorVertical({
    initialValue = defaultInitialValue,
    onChange,
    readOnly = false,
    placeholder = 'Type your content here...'
}: PlateEditorVerticalProps) {
    const editor = usePlateEditor({
        plugins: EditorVerticalKit,
        value: initialValue,
        readOnly
    });
    
    return (
        <TooltipProvider>
            <div className="w-full max-w-full min-w-0 overflow-x-hidden">
                <Plate
                    editor={editor}
                    onChange={({ value }) => {
                        if (onChange) {
                            onChange(value);
                        }
                    }}
                >
                    <EditorContainer className="flex w-full max-w-full">
                        <Editor className="flex-1 w-full max-w-full" placeholder={placeholder} />
                    </EditorContainer>
                </Plate>
            </div>
        </TooltipProvider>
    );
}