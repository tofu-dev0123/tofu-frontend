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
import useErrorModal from '@/hooks/admin/common/useErrorModal';

export function usePostState() {
  const errorModalHooks = useErrorModal();
  const onClickPreviewHooks = useOnClickPreview();
  const { title, setTitle } = usePostTitle();
  const { content, setContent } = usePostContent();
  const thumbnailHooks = useThumbnail({
    setErrorMessage: errorModalHooks.setErrorMessage,
  });
  const { tags, addTag, removeTag } = useTags();

  const state: PostEditorState = useMemo(
    () => ({
      title,
      content,
      thumbnailUrl: thumbnailHooks.thumbnailUrl,
      imageId: thumbnailHooks.imageId,
      altText: thumbnailHooks.altText,
      isLoading: thumbnailHooks.isLoading,
      progress: thumbnailHooks.progress,
      loadingType: thumbnailHooks.loadingType,
      tags,
    }),
    [
      title,
      content,
      thumbnailHooks.thumbnailUrl,
      thumbnailHooks.imageId,
      thumbnailHooks.altText,
      thumbnailHooks.isLoading,
      thumbnailHooks.progress,
      thumbnailHooks.loadingType,
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
      setImageId: thumbnailHooks.setImageId,
      setAltText: thumbnailHooks.setAltText,
      handleThumbnailClick: thumbnailHooks.handleThumbnailClick,
      handleFileChange: thumbnailHooks.handleFileChange,
      handleDeleteThumbnail: thumbnailHooks.handleDeleteThumbnail,
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
      thumbnailHooks.setImageId,
      thumbnailHooks.setAltText,
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
      isPreview: onClickPreviewHooks.isPreview,
      thumbnailInputRef: thumbnailHooks.thumbnailInputRef,
    }),
    [thumbnailHooks.thumbnailInputRef, onClickPreviewHooks.isPreview]
  );

  return {
    state,
    actions,
    ui,
  };
}
