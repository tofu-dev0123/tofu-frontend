'use client';

import { useState, useCallback } from 'react';

export function useTags() {
  const [tags, setTagsState] = useState<string[]>([]);

  const addTag = useCallback((tag: string) => {
    if (!tag.trim()) return;
    setTagsState((prev) => {
      if (prev.includes(tag)) return prev;
      return [...prev, tag];
    });
  }, []);

  const removeTag = useCallback((tag: string) => {
    setTagsState((prev) => prev.filter((t) => t !== tag));
  }, []);

  return { tags, addTag, removeTag };
}

