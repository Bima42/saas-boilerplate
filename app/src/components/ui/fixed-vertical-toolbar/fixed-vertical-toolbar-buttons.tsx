'use client';

import * as React from 'react';

import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon
} from 'lucide-react';
import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';

import { AlignToolbarButton } from './buttons/align-toolbar-button';
import { EmojiToolbarButton } from './buttons/emoji-toolbar-button';
import { ExportToolbarButton } from './buttons/export-toolbar-button';
import { FontColorToolbarButton } from '../font-color-toolbar-button';
import { FontSizeToolbarButton } from './buttons/font-size-toolbar-button';
import { RedoToolbarButton, UndoToolbarButton } from '../history-toolbar-button';
import { ImportToolbarButton } from './buttons/import-toolbar-button';
import { IndentToolbarButton, OutdentToolbarButton } from '../indent-toolbar-button';
import { InsertToolbarButton } from './buttons/insert-toolbar-button';
import { LineHeightToolbarButton } from './buttons/line-height-toolbar-button';
import { LinkToolbarButton } from '../link-toolbar-button';
import { BulletedListToolbarButton, NumberedListToolbarButton, TodoListToolbarButton } from './buttons/list-toolbar-button';
import { MarkToolbarButton } from '../mark-toolbar-button';
import { MediaToolbarButton } from './buttons/media-toolbar-button';
import { TableToolbarButton } from './buttons/table-toolbar-button';
import { ToggleToolbarButton } from '../toggle-toolbar-button';
import { TurnIntoToolbarButton } from './buttons/turn-into-toolbar-button';
import { Separator } from '../separator';

export function FixedVerticalToolbarButtons() {
  const readOnly = useEditorReadOnly();
  
  return (
    <div className="flex flex-col w-full gap-1 items-start">
      {!readOnly && (
        <>
          {/* History */}
          <UndoToolbarButton />
          <RedoToolbarButton />
          
          <Separator className="my-1 w-full" />
          
          {/* Export/Import */}
          <ExportToolbarButton>
            <ArrowUpToLineIcon />
          </ExportToolbarButton>
          <ImportToolbarButton />
          
          <Separator className="my-1 w-full" />
          
          {/* Insert & Transform */}
          <InsertToolbarButton />
          <TurnIntoToolbarButton />
          <FontSizeToolbarButton />
          
          <Separator className="my-1 w-full" />
          
          {/* Text Formatting */}
          <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
            <BoldIcon />
          </MarkToolbarButton>
          
          <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘+I)">
            <ItalicIcon />
          </MarkToolbarButton>
          
          <MarkToolbarButton nodeType={KEYS.underline} tooltip="Underline (⌘+U)">
            <UnderlineIcon />
          </MarkToolbarButton>
          
          <MarkToolbarButton nodeType={KEYS.strikethrough} tooltip="Strikethrough (⌘+⇧+M)">
            <StrikethroughIcon />
          </MarkToolbarButton>
          
          <MarkToolbarButton nodeType={KEYS.code} tooltip="Code (⌘+E)">
            <Code2Icon />
          </MarkToolbarButton>
          
          <FontColorToolbarButton nodeType={KEYS.color} tooltip="Text color">
            <BaselineIcon />
          </FontColorToolbarButton>
          
          <FontColorToolbarButton nodeType={KEYS.backgroundColor} tooltip="Background color">
            <PaintBucketIcon />
          </FontColorToolbarButton>
          
          <Separator className="my-1 w-full" />
          
          {/* Lists & Alignment */}
          <AlignToolbarButton />
          <NumberedListToolbarButton />
          <BulletedListToolbarButton />
          <TodoListToolbarButton />
          <ToggleToolbarButton />
          
          <Separator className="my-1 w-full" />
          
          {/* Links & Tables */}
          <LinkToolbarButton />
          <TableToolbarButton />
          <EmojiToolbarButton />
          
          <Separator className="my-1 w-full" />
          
          {/* Media */}
          <MediaToolbarButton nodeType={KEYS.img} />
          <MediaToolbarButton nodeType={KEYS.video} />
          <MediaToolbarButton nodeType={KEYS.audio} />
          <MediaToolbarButton nodeType={KEYS.file} />
          
          <Separator className="my-1 w-full" />
          
          {/* Indentation */}
          <LineHeightToolbarButton />
          <OutdentToolbarButton />
          <IndentToolbarButton />
        </>
      )}
    </div>
  );
}