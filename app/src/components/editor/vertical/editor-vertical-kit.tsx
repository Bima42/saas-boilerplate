'use client';

import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '../plugins/align-kit';
import { AutoformatKit } from '../plugins/autoformat-kit';
import { BasicBlocksKit } from '../plugins/basic-blocks-kit';
import { BasicMarksKit } from '../plugins/basic-marks-kit';
import { BlockMenuKit } from '../plugins/block-menu-kit';
import { BlockPlaceholderKit } from '../plugins/block-placeholder-kit';
import { CodeBlockKit } from '../plugins/code-block-kit';
import { DocxKit } from '../plugins/docx-kit';
import { EmojiKit } from '../plugins/emoji-kit';
import { FixedVerticalToolbarKit } from '../plugins/fixed-vertical-toolbar-kit';
import { FontKit } from '../plugins/font-kit';
import { LineHeightKit } from '../plugins/line-height-kit';
import { LinkKit } from '../plugins/link-kit';
import { ListKit } from '../plugins/list-kit';
import { MarkdownKit } from '../plugins/markdown-kit';
import { MediaKit } from '../plugins/media-kit';
import { SlashKit } from '../plugins/slash-kit';
import { TableKit } from '../plugins/table-kit';
import { TocKit } from '../plugins/toc-kit';
import { ToggleKit } from '../plugins/toggle-kit';

// import { FloatingToolbarKit } from './plugins/floating-toolbar-kit';
// import { MathKit } from './plugins/math-kit';

export const EditorVerticalKit = [
    ...BlockMenuKit,

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

    // Editing
    ...SlashKit,
    ...AutoformatKit,
    ...EmojiKit,
    TrailingBlockPlugin,

    // Parsers
    ...DocxKit,
    ...MarkdownKit,

    // UI
    ...BlockPlaceholderKit,
    ...FixedVerticalToolbarKit

    // TODO: Check those kits - they have been cleared cause of useless or errors
    // ...DndKit,
    // ...ColumnKit,
    // ...FloatingToolbarKit
    // ...MathKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorVerticalKit)[number]>;

export const useVerticalEditor = () => useEditorRef<MyEditor>();