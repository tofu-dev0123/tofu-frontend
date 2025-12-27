'use client';

import { useState, useCallback } from 'react';

export function usePostContent() {
  const [content, setContentState] = useState('');

  const setContent = useCallback((newContent: string) => {
    setContentState(newContent);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Enter') return;

      const textarea = e.currentTarget;
      const value = textarea.value;
      const cursor = textarea.selectionStart;

      const before = value.slice(0, cursor);
      const after = value.slice(cursor);

      const lines = before.split('\n');
      const currentLine = lines[lines.length - 1];

      // 箇条書き
      const bulletMatch = currentLine.match(/^(\s*)([-*])\s+(.*)$/);
      if (bulletMatch) {
        if (bulletMatch[3].trim() === '') return;

        e.preventDefault();
        const indent = bulletMatch[1];
        const bullet = bulletMatch[2];

        const newContent = before + '\n' + `${indent}${bullet} ` + after;
        setContent(newContent);

        // カーソル位置を設定（状態更新後にDOMが更新されるため非同期で処理）
        setTimeout(() => {
          const newCursor = cursor + indent.length + 3;
          textarea.selectionStart = textarea.selectionEnd = newCursor;
        }, 0);
        return;
      }

      // 数字付き
      const numberMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/);
      if (numberMatch) {
        if (numberMatch[3].trim() === '') return;

        e.preventDefault();
        const indent = numberMatch[1];
        const nextNumber = Number(numberMatch[2]) + 1;

        const newContent = before + '\n' + `${indent}${nextNumber}. ` + after;
        setContent(newContent);

        // カーソル位置を設定（状態更新後にDOMが更新されるため非同期で処理）
        setTimeout(() => {
          const newCursor = cursor + indent.length + `${nextNumber}. `.length;
          textarea.selectionStart = textarea.selectionEnd = newCursor;
        }, 0);
      }
    },
    [setContent]
  );

  return { content, setContent, handleKeyDown };
}
