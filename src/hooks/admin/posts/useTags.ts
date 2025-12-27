'use client';

import { useState, useCallback } from 'react';

export function useTags() {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTagsState] = useState<string[]>([]);

  const addTag = useCallback(() => {
    if (!inputValue.trim()) return;
    setTagsState((prev) => [...prev, inputValue]);
    setInputValue('');
  }, [inputValue]);

  const removeTag = useCallback((tag: string) => {
    setTagsState((prev) => prev.filter((t) => t !== tag));
  }, []);

  return { tags, addTag, removeTag, inputValue, setInputValue };
}
