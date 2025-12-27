import type { RefObject } from 'react';

export interface PostEditorState {
  // UI状態
  isPreview: boolean;
  // 基本情報
  title: string;
  content: string;

  // サムネイル情報
  thumbnailUrl: string | null;
  imageId: number | null;
  altText: string | null;
  isLoading: boolean;
  progress: number;
  loadingType: 'upload' | 'delete' | null;
  isAlertOpen: boolean;
  previewImageUrl: string | null;

  // タグ情報
  tags: string[];
  inputValue: string;

  // エラーモーダル情報
  isErrorModalOpen: boolean;
  errorMessage: string[];
}

export interface PostEditorActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setThumbnailUrl: (url: string | null) => void;
  setImageId: (id: number | null) => void;
  setAltText: (text: string | null) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
  setInputValue: (value: string) => void;
  togglePreview: () => void;
  saveDraft: () => void;
  publish: () => void;
  reset: () => void;
  handleThumbnailClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteThumbnail: () => void;
  handleConfirmUpload: () => void;
  handleCancelUpload: () => void;
  handleAlertOpenChange: (open: boolean) => void;
  showError: (message: string[]) => void;
  setIsOpen: (open: boolean) => void;
  onClose: () => void;
}

export interface PostEditorUI {
  // サムネイル情報
  thumbnailInputRef: RefObject<HTMLInputElement | null>;
}

export interface PostEditorContextValue {
  state: PostEditorState;
  actions: PostEditorActions;
  ui: PostEditorUI;
}
