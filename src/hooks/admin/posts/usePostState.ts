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
  const postTitleHooks = usePostTitle();
  const postContentHooks = usePostContent();
  const thumbnailHooks = useThumbnail({
    showError: errorModalHooks.showError,
  });
  const tagsHooks = useTags();

  const state: PostEditorState = useMemo(
    () => ({
      // UI状態
      isPreview: onClickPreviewHooks.isPreview,
      // 基本情報
      title: postTitleHooks.title,
      content: postContentHooks.content,
      // サムネイル情報
      thumbnailUrl: thumbnailHooks.thumbnailUrl,
      imageId: thumbnailHooks.imageId,
      altText: thumbnailHooks.altText,
      isLoading: thumbnailHooks.isLoading,
      progress: thumbnailHooks.progress,
      loadingType: thumbnailHooks.loadingType,
      isAlertOpen: thumbnailHooks.isAlertOpen,
      previewImageUrl: thumbnailHooks.previewImageUrl,
      // タグ情報
      tags: tagsHooks.tags,
      inputValue: tagsHooks.inputValue,
      // エラーモーダル情報
      isErrorModalOpen: errorModalHooks.isOpen,
      errorMessage: errorModalHooks.errorMessage,
    }),
    [
      postTitleHooks.title,
      postContentHooks.content,
      thumbnailHooks.thumbnailUrl,
      thumbnailHooks.imageId,
      thumbnailHooks.altText,
      thumbnailHooks.isLoading,
      thumbnailHooks.progress,
      thumbnailHooks.loadingType,
      thumbnailHooks.isAlertOpen,
      thumbnailHooks.previewImageUrl,
      tagsHooks.tags,
      tagsHooks.inputValue,
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
    postTitleHooks.setTitle('');
    postContentHooks.setContent('');
    thumbnailHooks.setThumbnailUrl(null);
    // tagsとisPreviewのリセットは、必要に応じて各フックにリセット機能を追加
  }, [postTitleHooks.setTitle, postContentHooks.setContent, thumbnailHooks]);

  const actions: PostEditorActions = useMemo(
    () => ({
      // サムネイル関連
      setThumbnailUrl: thumbnailHooks.setThumbnailUrl,
      setImageId: thumbnailHooks.setImageId,
      setAltText: thumbnailHooks.setAltText,
      // タグ関連
      addTag: tagsHooks.addTag,
      removeTag: tagsHooks.removeTag,
      setInputValue: tagsHooks.setInputValue,
      // UI状態関連
      handleThumbnailClick: thumbnailHooks.handleThumbnailClick,
      handleFileChange: thumbnailHooks.handleFileChange,
      handleDeleteThumbnail: thumbnailHooks.handleDeleteThumbnail,
      handleConfirmUpload: thumbnailHooks.handleConfirmUpload,
      handleCancelUpload: thumbnailHooks.handleCancelUpload,
      handleAlertOpenChange: thumbnailHooks.handleAlertOpenChange,
      // 基本情報関連
      setTitle: postTitleHooks.setTitle,
      setContent: postContentHooks.setContent,
      handleContentKeyDown: postContentHooks.handleKeyDown,
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
      postTitleHooks.setTitle,
      postContentHooks.setContent,
      postContentHooks.handleKeyDown,
      thumbnailHooks.setThumbnailUrl,
      thumbnailHooks.setImageId,
      thumbnailHooks.setAltText,
      onClickPreviewHooks.togglePreview,
      saveDraft,
      publish,
      reset,
      // タグ関連
      tagsHooks.addTag,
      tagsHooks.removeTag,
      tagsHooks.setInputValue,
      // UI状態関連
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
