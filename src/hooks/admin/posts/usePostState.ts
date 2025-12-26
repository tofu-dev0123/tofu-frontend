'use client';

import { useCallback, useMemo } from 'react';
import type {
  PostEditorState,
  PostEditorActions,
  PostEditorUI,
} from '@/types/admin/posts';
import { useOnClickPreview } from './useOnClickPreview';
import { usePostTitle } from './usePostTitle';
import { usePostContent } from './usePostContent';
import { useThumbnail } from './useThumbnail';
import { useTags } from './useTags';

export function usePostState() {
  const onClickPreviewHooks = useOnClickPreview();
  const { title, setTitle } = usePostTitle();
  const { content, setContent } = usePostContent();
  const thumbnailHooks = useThumbnail();
  const { tags, addTag, removeTag } = useTags();

  const state: PostEditorState = useMemo(
    () => ({
      title,
      content,
      thumbnailUrl: thumbnailHooks.thumbnailUrl,
      tags,
      isPreview: onClickPreviewHooks.isPreview,
      category: undefined,
      publishedAt: null,
      status: 'draft',
    }),
    [
      title,
      content,
      thumbnailHooks.thumbnailUrl,
      tags,
      onClickPreviewHooks.isPreview,
    ]
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
    thumbnailHooks.setThumbnailUrl(null);
    // tagsとisPreviewのリセットは、必要に応じて各フックにリセット機能を追加
  }, [setTitle, setContent, thumbnailHooks.setThumbnailUrl]);

  const actions: PostEditorActions = useMemo(
    () => ({
      // サムネイル関連
      setThumbnailUrl: thumbnailHooks.setThumbnailUrl,
      handleThumbnailClick: thumbnailHooks.handleThumbnailClick,
      handleFileChange: thumbnailHooks.handleFileChange,
      // 基本情報関連
      setTitle,
      setContent,
      addTag,
      removeTag,
      togglePreview: onClickPreviewHooks.togglePreview,
      saveDraft,
      publish,
      reset,
    }),
    [
      setTitle,
      setContent,
      thumbnailHooks.setThumbnailUrl,
      addTag,
      removeTag,
      onClickPreviewHooks.togglePreview,
      saveDraft,
      publish,
      reset,
      thumbnailHooks.handleThumbnailClick,
      thumbnailHooks.handleFileChange,
    ]
  );

  const ui: PostEditorUI = useMemo(
    () => ({
      thumbnailInputRef: thumbnailHooks.thumbnailInputRef,
    }),
    [thumbnailHooks.thumbnailInputRef]
  );

  return {
    state,
    actions,
    ui,
  };
}
