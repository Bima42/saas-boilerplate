'use client';

import * as React from 'react';

import { ListStyleType, someList, toggleList } from '@platejs/list';
import {
  useIndentTodoToolBarButton,
  useIndentTodoToolBarButtonState,
} from '@platejs/list/react';
import { List, ListOrdered, ListTodoIcon } from 'lucide-react';
import { useEditorRef, useEditorSelector } from 'platejs/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ToolbarButton } from '../../toolbar';

export function BulletedListToolbarButton() {
  const editor = useEditorRef();
  const [open, setOpen] = React.useState(false);

  const pressed = useEditorSelector(
    (editor) =>
      someList(editor, [
        ListStyleType.Disc,
        ListStyleType.Circle,
        ListStyleType.Square,
      ]),
    []
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={pressed}
          tooltip="Bulleted list"
        >
          <List className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.Disc,
              });
              setOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full border border-current bg-current" />
              Default
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.Circle,
              });
              setOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full border border-current" />
              Circle
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.Square,
              });
              setOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 border border-current bg-current" />
              Square
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NumberedListToolbarButton() {
  const editor = useEditorRef();
  const [open, setOpen] = React.useState(false);

  const pressed = useEditorSelector(
    (editor) =>
      someList(editor, [
        ListStyleType.Decimal,
        ListStyleType.LowerAlpha,
        ListStyleType.UpperAlpha,
        ListStyleType.LowerRoman,
        ListStyleType.UpperRoman,
      ]),
    []
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={pressed}
          tooltip="Numbered list"
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.Decimal,
              });
              setOpen(false);
            }}
          >
            Decimal (1, 2, 3)
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.LowerAlpha,
              });
              setOpen(false);
            }}
          >
            Lower Alpha (a, b, c)
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.UpperAlpha,
              });
              setOpen(false);
            }}
          >
            Upper Alpha (A, B, C)
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.LowerRoman,
              });
              setOpen(false);
            }}
          >
            Lower Roman (i, ii, iii)
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              toggleList(editor, {
                listStyleType: ListStyleType.UpperRoman,
              });
              setOpen(false);
            }}
          >
            Upper Roman (I, II, III)
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TodoListToolbarButton(
  props: React.ComponentProps<typeof ToolbarButton>
) {
  const state = useIndentTodoToolBarButtonState({ nodeType: 'todo' });
  const { props: buttonProps } = useIndentTodoToolBarButton(state);

  return (
    <ToolbarButton {...props} {...buttonProps} tooltip="Todo">
      <ListTodoIcon />
    </ToolbarButton>
  );
}