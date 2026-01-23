'use client';

import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '../plugins/align-kit';
import { BasicBlocksKit } from '../plugins/basic-blocks-kit';
import { BasicMarksKit } from '../plugins/basic-marks-kit';
import { CodeBlockKit } from '../plugins/code-block-kit';
import { FontKit } from '../plugins/font-kit';
import { LineHeightKit } from '../plugins/line-height-kit';
import { LinkKit } from '../plugins/link-kit';
import { ListKit } from '../plugins/list-kit';
import { MarkdownKit } from '../plugins/markdown-kit';
import { MediaKit } from '../plugins/media-kit';
import { TableKit } from '../plugins/table-kit';
import { TocKit } from '../plugins/toc-kit';
import { ToggleKit } from '../plugins/toggle-kit';

// ViewerKit: Only rendering plugins, no editing tools or toolbars
export const ViewerKit = [
    // Elements
    ...BasicBlocksKit,
    ...CodeBlockKit,
    ...TableKit,
    ...ToggleKit,
    ...TocKit,
    ...MediaKit,
    ...LinkKit,

    // Marks
    ...BasicMarksKit,
    ...FontKit,

    // Block Style
    ...ListKit,
    ...AlignKit,
    ...LineHeightKit,

    // Parsers
    ...MarkdownKit,

    TrailingBlockPlugin,
];

export type ViewerEditor = TPlateEditor<Value, (typeof ViewerKit)[number]>;

export const useViewer = () => useEditorRef<ViewerEditor>();