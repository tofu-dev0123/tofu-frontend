import type { RefObject } from 'react';

export interface PostEditorState {
  // 基本情報
  title: string;
  content: string;
  thumbnailUrl: string | null;
  tags: string[];

  // UI状態
  isPreview: boolean;

  // メタデータ（将来的な拡張用）
  category?: string;
  publishedAt?: Date | null;
  status?: 'draft' | 'published';
}

export interface PostEditorActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setThumbnailUrl: (url: string | null) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  togglePreview: () => void;
  saveDraft: () => void;
  publish: () => void;
  reset: () => void;
  handleThumbnailClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PostEditorUI {
  thumbnailInputRef: RefObject<HTMLInputElement | null>;
}

export interface PostEditorContextValue {
  state: PostEditorState;
  actions: PostEditorActions;
  ui: PostEditorUI;
}
