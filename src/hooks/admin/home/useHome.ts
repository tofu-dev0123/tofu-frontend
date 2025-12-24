'use client';

import useSummary from '@/hooks/admin/home/useSummary';
import { useEffect, useState } from 'react';
import useErrorModal from '../common/useErrorModal';

function useHome() {
  // エラーモーダル状態管理フック
  const errorModalHook = useErrorModal();

  // サマリの状態管理フック
  const { totalPosts, publishedPosts, draftPosts, getSummary } = useSummary({
    setErrorMessage: errorModalHook.setErrorMessage,
  });

  const handleClickCreate = () => {
    console.log('create');
  };

  useEffect(() => {
    // 初期処理
    getSummary();
  }, []);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    errorModalHook,
    handleClickCreate,
  };
}

export default useHome;
