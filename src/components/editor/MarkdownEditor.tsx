'use client';

import { useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
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

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        markdown(),
        keymap.of([{ key: 'Enter', run: insertNewlineContinueMarkup }]),
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
