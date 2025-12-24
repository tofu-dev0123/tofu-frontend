'use client';

import useSummary from '@/hooks/admin/home/useSummary';
import usePostList from '@/hooks/admin/home/usePostList';
import { useEffect } from 'react';
import useErrorModal from '../common/useErrorModal';

function useHome() {
  // エラーモーダル状態管理フック
  const errorModalHook = useErrorModal();

  // サマリの状態管理フック
  const { totalPosts, publishedPosts, draftPosts, getSummary } = useSummary({
    setErrorMessage: errorModalHook.setErrorMessage,
  });

  // 投稿一覧の状態管理フック
  const { postList, totalCount, totalPages, getPostList } = usePostList({
    setErrorMessage: errorModalHook.setErrorMessage,
  });

  const handleClickCreate = () => {
    console.log('create');
  };

  useEffect(() => {
    // 初期処理
    getSummary();
    getPostList({ limit: 6 });
  }, []);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    errorModalHook,
    handleClickCreate,
    postList,
    totalCount,
    totalPages,
  };
}

export default useHome;
