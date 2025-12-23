'use client';

import useSummary from '@/hooks/admin/home/useSummary';
import { useEffect } from 'react';

function useHome() {
  const { totalPosts, publishedPosts, draftPosts, errorMessage, getSummary } =
    useSummary();

  useEffect(() => {
    // 初期処理
    getSummary();
  }, []);

  return { totalPosts, publishedPosts, draftPosts, errorMessage };
}

export default useHome;
