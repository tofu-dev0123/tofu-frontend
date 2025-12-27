'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { uploadFile, del } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { ImagesUploadResponse } from '@/types/api/imagesUpload';
import { ImagesDeleteResponse } from '@/types/api/imagesDelete';
import { exceptErrorHandling } from '@/lib/utils/exceptErrorHandling';

interface UseThumbnailProps {
  setErrorMessage: (message: string[]) => void;
}

export function useThumbnail({ setErrorMessage }: UseThumbnailProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingType, setLoadingType] = useState<'upload' | 'delete' | null>(
    null
  );
  const [imageId, setImageId] = useState<number | null>(null);
  const [thumbnailUrl, setThumbnailUrlState] = useState<string | null>(null);
  const [altText, setAltText] = useState<string | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const pendingFileRef = useRef<File | null>(null);

  // プログレスバーのアニメーション
  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5; // 50msごとに2.5%増加（50ms × 40回 = 2秒で100%）
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleThumbnailClick = () => {
    thumbnailInputRef.current?.click();
  };

  // ファイル選択でアラートを表示する
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      pendingFileRef.current = file;
      setIsAlertOpen(true);
    },
    []
  );

  const setThumbnailUrl = useCallback((url: string | null) => {
    setThumbnailUrlState(url);
  }, []);

  // 画像を削除する
  const handleDeleteThumbnail = useCallback(async () => {
    if (!imageId) return;
    setIsLoading(true);
    setLoadingType('delete');
    const startTime = Date.now();
    const MIN_LOADING_TIME = 2000; // 最低2秒間

    try {
      await del<ImagesDeleteResponse>(API_ENDPOINTS.images.delete(imageId));

      setThumbnailUrl(null);
      setImageId(null);
      setAltText(null);
      // ファイル入力の値をリセット
      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = '';
      }
    } catch (error) {
      exceptErrorHandling(error, setErrorMessage);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
      setIsLoading(false);
      setLoadingType(null);
    }
  }, [imageId, setErrorMessage]);

  // アラートの保存ボタン押下時にアップロード処理を実行
  const handleConfirmUpload = useCallback(async () => {
    const file = pendingFileRef.current;
    if (!file) {
      setIsAlertOpen(false);
      return;
    }

    setIsAlertOpen(false);
    setIsLoading(true);
    setLoadingType('upload');
    const startTime = Date.now();
    const MIN_LOADING_TIME = 2000; // 最低2秒間

    try {
      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('alt_text', file.name);

      const response = await uploadFile<ImagesUploadResponse>(
        API_ENDPOINTS.images.post,
        formData
      );
      setThumbnailUrl(response.url);
      setImageId(response.image_id);
      setAltText(response.alt_text);
      pendingFileRef.current = null;
    } catch (error) {
      exceptErrorHandling(error, setErrorMessage);
      pendingFileRef.current = null;
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
      setIsLoading(false);
      setLoadingType(null);
    }
  }, [setErrorMessage, setThumbnailUrl]);

  // アラートのキャンセルボタン押下時の処理
  const handleCancelUpload = useCallback(() => {
    pendingFileRef.current = null;
    // ファイル入力の値をリセット
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  }, []);

  // アラートの開閉を制御する（ダイアログの外側クリックやESCキーで閉じられた場合の処理）
  const handleAlertOpenChange = useCallback((open: boolean) => {
    setIsAlertOpen(open);
    if (!open && pendingFileRef.current) {
      // アラートが閉じられたときに、まだファイルが残っている場合はキャンセル処理を実行
      pendingFileRef.current = null;
      // ファイル入力の値をリセット
      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = '';
      }
    }
  }, []);

  return {
    thumbnailUrl,
    altText,
    imageId,
    isLoading,
    progress,
    loadingType,
    isAlertOpen,
    thumbnailInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleDeleteThumbnail,
    handleConfirmUpload,
    handleCancelUpload,
    handleAlertOpenChange,
    setThumbnailUrl,
    setImageId,
    setAltText,
  };
}
