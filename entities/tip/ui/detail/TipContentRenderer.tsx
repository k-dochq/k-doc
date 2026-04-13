'use client';

import './styles/tip-content.scss';
import { Fragment, type ReactNode, useMemo } from 'react';
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';
import { type JSONContent } from '@tiptap/core';
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import { Highlight } from '@tiptap/extension-highlight';
import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji';
import { Mention } from '@tiptap/extension-mention';
import { TaskList, TaskItem } from '@tiptap/extension-list';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Typography } from '@tiptap/extension-typography';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Mathematics } from '@tiptap/extension-mathematics';
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table';
import { createLowlight } from 'lowlight';

interface TipContentRendererProps {
  content: JSONContent;
}

const lowlight = createLowlight();

const extensions = [
  StarterKit.configure({ codeBlock: false }),
  Image.configure({ inline: false, allowBase64: true }),
  TextAlign.configure({ types: ['heading', 'paragraph', 'blockquote'] }),
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  Subscript,
  Superscript,
  Typography,
  Mathematics,
  TaskList,
  TaskItem.configure({ nested: true }),
  Table.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
  CodeBlockLowlight.configure({ lowlight }),
  Emoji.configure({
    emojis: gitHubEmojis.filter((e) => !e.name.includes('regional')),
  }),
  Mention,
];

// table cell/header는 colspan/rowspan을 colSpan/rowSpan으로 변환해야 함
const tableCellMapping = (Tag: 'td' | 'th') =>
  function TableCellRenderer({
    node,
    children,
  }: {
    node: { attrs?: Record<string, unknown> };
    children?: ReactNode;
  }) {
    const attrs = node.attrs ?? {};
    const colspan = typeof attrs.colspan === 'number' ? attrs.colspan : undefined;
    const rowspan = typeof attrs.rowspan === 'number' ? attrs.rowspan : undefined;
    return (
      <Tag colSpan={colspan} rowSpan={rowspan}>
        {children}
      </Tag>
    );
  };

const nodeMapping = {
  tableCell: tableCellMapping('td'),
  tableHeader: tableCellMapping('th'),
};

export function TipContentRenderer({ content }: TipContentRendererProps) {
  const rendered = useMemo(
    () =>
      renderToReactElement({
        extensions,
        content,
        options: { nodeMapping },
      }),
    [content],
  );

  return (
    <div className='tip-content'>
      <div className='tiptap ProseMirror'>
        <Fragment>{rendered}</Fragment>
      </div>
    </div>
  );
}
