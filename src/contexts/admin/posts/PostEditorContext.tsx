'use client';

import React, { createContext, useContext } from 'react';
import type { PostEditorContextValue } from '@/types/admin/posts';
import { usePostEditorContext } from '@/hooks/admin/posts/usePostEditorContext';

const PostEditorContext = createContext<PostEditorContextValue | undefined>(
  undefined
);

interface PostEditorProviderProps {
  children: React.ReactNode;
}

export function PostEditorProvider({
  children,
}: PostEditorProviderProps) {
  const value = usePostEditorContext();

  return (
    <PostEditorContext.Provider value={value}>
      {children}
    </PostEditorContext.Provider>
  );
}

export function usePostEditor(): PostEditorContextValue {
  const context = useContext(PostEditorContext);
  if (context === undefined) {
    throw new Error('usePostEditor must be used within a PostEditorProvider');
  }
  return context;
}
