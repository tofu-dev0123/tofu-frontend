'use client';

import React, { createContext, useContext } from 'react';
import type { PostEditorContextValue } from '@/types/admin/posts';
import { usePostEditState } from '@/hooks/admin/posts/usePostEditState';

const PostEditContext = createContext<PostEditorContextValue | undefined>(
  undefined
);

export interface PostEditInitialData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
  tags: string[];
}

interface PostEditProviderProps {
  children: React.ReactNode;
  postId: number;
  initialData: PostEditInitialData;
}

export function PostEditProvider({
  children,
  postId,
  initialData,
}: PostEditProviderProps) {
  const value = usePostEditState({ postId, initialData });

  return (
    <PostEditContext.Provider value={value}>
      {children}
    </PostEditContext.Provider>
  );
}

export function usePostEdit(): PostEditorContextValue {
  const context = useContext(PostEditContext);
  if (context === undefined) {
    throw new Error('usePostEdit must be used within a PostEditProvider');
  }
  return context;
}

