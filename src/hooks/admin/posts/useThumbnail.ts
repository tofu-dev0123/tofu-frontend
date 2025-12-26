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
  const [progress, setProgress] = useState(0);
  const [loadingType, setLoadingType] = useState<'upload' | 'delete' | null>(
    null
  );
  const [imageId, setImageId] = useState<number | null>(null);
  const [thumbnailUrl, setThumbnailUrlState] = useState<string | null>(null);
  const [altText, setAltText] = useState<string | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

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

  // ファイル選択で画像をアップロードする
  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
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
      } catch (error) {
        exceptErrorHandling(error, setErrorMessage);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
        setIsLoading(false);
        setLoadingType(null);
      }
    },
    [setErrorMessage]
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

  return {
    thumbnailUrl,
    altText,
    imageId,
    isLoading,
    progress,
    loadingType,
    thumbnailInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleDeleteThumbnail,
    setThumbnailUrl,
    setImageId,
    setAltText,
  };
}
