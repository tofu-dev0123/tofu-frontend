'use client';

import { useMemo } from 'react';
import type { PostEditorContextValue } from '@/types/admin/posts';
import { usePostState } from './usePostState';

export function usePostEditorContext(): PostEditorContextValue {
  const { state, actions, ui } = usePostState();

  return useMemo(
    () => ({
      state,
      actions,
      ui,
    }),
    [state, actions, ui]
  );
}
