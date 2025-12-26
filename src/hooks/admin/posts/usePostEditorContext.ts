'use client';

import { useMemo } from 'react';
import type { PostEditorContextValue } from '@/types/admin/posts';
import { usePostState } from './usePostState';

export function usePostEditorContext(): PostEditorContextValue {
  const { state, actions } = usePostState();

  return useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
  );
}

