'use client';

import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { createExtensions } from './extensions';

export function useMarkdownEditor(
  value: string,
  onChange: (value: string) => void,
  isPreview: boolean
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    // プレビューモードの場合はエディタを初期化しない
    if (isPreview || !containerRef.current) return;

    // 既存のエディタがあれば破棄
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const state = EditorState.create({
      doc: value,
      extensions: createExtensions(onChange),
    });

    viewRef.current = new EditorView({
      state,
      parent: containerRef.current,
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPreview]);

  return {
    containerRef,
    viewRef,
  };
}
