'use client';

import { useState, useCallback, useRef } from 'react';
import { uploadFile } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { ImagesUploadResponse } from '@/types/api/imagesUpload';
import { exceptErrorHandling } from '@/lib/utils/exceptErrorHandling';

interface UseThumbnailProps {
  setErrorMessage: (message: string[]) => void;
}

export function useThumbnail({ setErrorMessage }: UseThumbnailProps) {
  const [thumbnailUrl, setThumbnailUrlState] = useState<string | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailClick = () => {
    thumbnailInputRef.current?.click();
  };

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('alt_text', file.name);

        const response = await uploadFile<ImagesUploadResponse>(
          API_ENDPOINTS.images.post,
          formData
        );
        setThumbnailUrl(response.url);
      } catch (error) {
        exceptErrorHandling(error, setErrorMessage);
      }
    },
    []
  );

  const setThumbnailUrl = useCallback((url: string | null) => {
    setThumbnailUrlState(url);
  }, []);

  return {
    thumbnailUrl,
    setThumbnailUrl,
    handleThumbnailClick,
    thumbnailInputRef,
    handleFileChange,
  };
}
