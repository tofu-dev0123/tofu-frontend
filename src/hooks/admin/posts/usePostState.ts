'use client';

import { useCallback, useMemo } from 'react';
import type { PostEditorState, PostEditorActions } from '@/types/admin/posts';
import { useOnClickPreview } from './useOnClickPreview';
import { usePostTitle } from './usePostTitle';
import { usePostContent } from './usePostContent';
import { useThumbnail } from './useThumbnail';
import { useTags } from './useTags';

export function usePostState() {
  const { isPreview, togglePreview } = useOnClickPreview();
  const { title, setTitle } = usePostTitle();
  const { content, setContent } = usePostContent();
  const { thumbnailUrl, setThumbnailUrl } = useThumbnail();
  const { tags, addTag, removeTag } = useTags();

  const state: PostEditorState = useMemo(
    () => ({
      title,
      content,
      thumbnailUrl,
      tags,
      isPreview,
      category: undefined,
      publishedAt: null,
      status: 'draft',
    }),
    [title, content, thumbnailUrl, tags, isPreview]
  );

  const saveDraft = useCallback(() => {
    console.log('save draft', state);
    // TODO: API連携を実装
  }, [state]);

  const publish = useCallback(() => {
    console.log('publish', state);
    // TODO: API連携を実装
  }, [state]);

  const reset = useCallback(() => {
    setTitle('');
    setContent('');
    setThumbnailUrl(null);
    // tagsとisPreviewのリセットは、必要に応じて各フックにリセット機能を追加
  }, [setTitle, setContent, setThumbnailUrl]);

  const actions: PostEditorActions = useMemo(
    () => ({
      setTitle,
      setContent,
      setThumbnailUrl,
      addTag,
      removeTag,
      togglePreview,
      saveDraft,
      publish,
      reset,
    }),
    [
      setTitle,
      setContent,
      setThumbnailUrl,
      addTag,
      removeTag,
      togglePreview,
      saveDraft,
      publish,
      reset,
    ]
  );

  return {
    state,
    actions,
  };
}

