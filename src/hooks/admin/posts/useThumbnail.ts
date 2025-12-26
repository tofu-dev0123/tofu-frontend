'use client';

import { useState, useCallback } from 'react';

export function useThumbnail() {
  const [thumbnailUrl, setThumbnailUrlState] = useState<string | null>(null);

  const setThumbnailUrl = useCallback((url: string | null) => {
    setThumbnailUrlState(url);
  }, []);

  return { thumbnailUrl, setThumbnailUrl };
}

