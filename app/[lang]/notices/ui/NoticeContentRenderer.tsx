'use client';

// Tiptap 렌더링 스타일은 tips 모듈과 동일한 SCSS 번들을 재사용한다.
// 셀렉터가 `.tiptap.ProseMirror` 기준이라 한 번 import 되면 모든 위치에 적용된다.
import '@/entities/tip/ui/detail/styles/tip-content.scss';

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

interface NoticeContentRendererProps {
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

// table cell/header의 colspan/rowspan을 React 속성으로 변환
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

export function NoticeContentRenderer({ content }: NoticeContentRendererProps) {
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
    <div className='notice-content'>
      <div className='tiptap ProseMirror'>
        <Fragment>{rendered}</Fragment>
      </div>
    </div>
  );
}
