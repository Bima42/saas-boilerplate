'use client';

import React, { useState } from 'react';
import { PlateEditor } from '@/components/editor/editor';
import type { Value } from 'platejs';

export default function TestEditorPage() {
    const [value, setValue] = useState<Value>([
        {
            type: 'h1',
            children: [{ text: 'Hello Plate.js!' }]
        },
        {
            type: 'p',
            children: [{ text: 'This is a test of the new editor implementation.' }]
        }
    ]);

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <h1 className="mb-6 text-3xl font-bold">Editor Playground</h1>

            <div className="grid gap-8">
                {/* Editor Instance */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <PlateEditor initialValue={value} onChange={(newValue) => setValue(newValue)} />
                </div>

                {/* Live Preview of State */}
                <div className="rounded-lg border bg-muted p-4">
                    <h2 className="mb-2 font-semibold">Live State (JSON):</h2>
                    <pre className="overflow-auto rounded bg-black p-4 text-xs text-white">
                        {JSON.stringify(value, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
