'use client';

import { useEffect, useRef } from 'react';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import {
  markdown,
  insertNewlineContinueMarkup,
} from '@codemirror/lang-markdown';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const removeOutline = EditorView.baseTheme({
    '&.cm-editor': {
      outline: 'none',
    },
    '&.cm-editor.cm-focused': {
      outline: 'none',
    },
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        markdown(),
        keymap.of([{ key: 'Enter', run: insertNewlineContinueMarkup }]),
        removeOutline,
        EditorView.theme({
          '&': {
            fontSize: '1rem', // text-md
            fontWeight: 'bold', // font-bold
            border: 'none', // border-none
            outline: 'none', // focus:outline-none
            resize: 'none', // resize-none
            width: '100%',
            height: '100%',
            fontFamily: 'inherit', // 他の部分と同じフォントを継承
            letterSpacing: '0.05em', // 文字間隔を少し広げる
          },
          '.cm-content': {
            padding: 0,
            minHeight: '20rem', // minRows={20} 相当
            fontFamily: 'inherit', // 他の部分と同じフォントを継承
            lineHeight: '1.5', // 読みやすい行間を設定
            letterSpacing: '0.05em', // 文字間隔を少し広げる
          },
          '.cm-line': {
            fontFamily: 'inherit', // 他の部分と同じフォントを継承
            lineHeight: '1.5', // 読みやすい行間を設定
            padding: '0.125rem 0', // 行間を広げるためのパディング
            letterSpacing: '0.05em', // 文字間隔を少し広げる
          },
          '.cm-focused': {
            outline: 'none',
          },
          '.cm-placeholder': {
            color: '#9ca3af', // text-gray-400
            fontFamily: 'inherit', // 他の部分と同じフォントを継承
          },
        }),
        placeholder('本文'),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            onChange(v.state.doc.toString());
          }
        }),
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: containerRef.current,
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
