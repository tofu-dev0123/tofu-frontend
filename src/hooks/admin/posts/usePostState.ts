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
    showError: errorModalHooks.showError,
  });
  const { tags, addTag, removeTag } = useTags();

  const state: PostEditorState = useMemo(
    () => ({
      isPreview: onClickPreviewHooks.isPreview,
      title,
      content,
      thumbnailUrl: thumbnailHooks.thumbnailUrl,
      imageId: thumbnailHooks.imageId,
      altText: thumbnailHooks.altText,
      isLoading: thumbnailHooks.isLoading,
      progress: thumbnailHooks.progress,
      loadingType: thumbnailHooks.loadingType,
      isAlertOpen: thumbnailHooks.isAlertOpen,
      previewImageUrl: thumbnailHooks.previewImageUrl,
      tags,
      isErrorModalOpen: errorModalHooks.isOpen,
      errorMessage: errorModalHooks.errorMessage,
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
      thumbnailHooks.isAlertOpen,
      thumbnailHooks.previewImageUrl,
      tags,
      onClickPreviewHooks.isPreview,
      errorModalHooks.isOpen,
      errorModalHooks.errorMessage,
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
  }, [setTitle, setContent, thumbnailHooks]);

  const actions: PostEditorActions = useMemo(
    () => ({
      // サムネイル関連
      setThumbnailUrl: thumbnailHooks.setThumbnailUrl,
      setImageId: thumbnailHooks.setImageId,
      setAltText: thumbnailHooks.setAltText,
      handleThumbnailClick: thumbnailHooks.handleThumbnailClick,
      handleFileChange: thumbnailHooks.handleFileChange,
      handleDeleteThumbnail: thumbnailHooks.handleDeleteThumbnail,
      handleConfirmUpload: thumbnailHooks.handleConfirmUpload,
      handleCancelUpload: thumbnailHooks.handleCancelUpload,
      handleAlertOpenChange: thumbnailHooks.handleAlertOpenChange,
      // 基本情報関連
      setTitle,
      setContent,
      addTag,
      removeTag,
      togglePreview: onClickPreviewHooks.togglePreview,
      saveDraft,
      publish,
      reset,
      // エラーモーダル関連
      showError: errorModalHooks.showError,
      setIsOpen: errorModalHooks.setIsOpen,
      onClose: errorModalHooks.onClose,
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
      thumbnailHooks.handleDeleteThumbnail,
      thumbnailHooks.handleConfirmUpload,
      thumbnailHooks.handleCancelUpload,
      thumbnailHooks.handleAlertOpenChange,
      // エラーモーダル関連
      errorModalHooks.showError,
      errorModalHooks.setIsOpen,
      errorModalHooks.onClose,
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
