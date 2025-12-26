import type { RefObject } from 'react';

export interface PostEditorState {
  // 基本情報
  title: string;
  content: string;

  // サムネイル情報
  thumbnailUrl: string | null;
  imageId: number | null;
  altText: string | null;

  // タグ情報
  tags: string[];
}

export interface PostEditorActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setThumbnailUrl: (url: string | null) => void;
  setImageId: (id: number | null) => void;
  setAltText: (text: string | null) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  togglePreview: () => void;
  saveDraft: () => void;
  publish: () => void;
  reset: () => void;
  handleThumbnailClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteThumbnail: () => void;
}

export interface PostEditorUI {
  // UI状態
  isPreview: boolean;

  // サムネイル情報
  thumbnailInputRef: RefObject<HTMLInputElement | null>;
}

export interface PostEditorContextValue {
  state: PostEditorState;
  actions: PostEditorActions;
  ui: PostEditorUI;
}
