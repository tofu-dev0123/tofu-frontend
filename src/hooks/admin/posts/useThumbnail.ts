'use client';

import { useState, useCallback, useRef } from 'react';

export function useThumbnail() {
  const [thumbnailUrl, setThumbnailUrlState] = useState<string | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailClick = () => {
    thumbnailInputRef.current?.click();
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      // TODO: API連携を実装
      console.log(file);
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
