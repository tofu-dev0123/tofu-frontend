'use client';

import useSummary from '@/hooks/admin/home/useSummary';
import usePostList from '@/hooks/admin/home/usePostList';
import { useEffect } from 'react';
import useErrorModal from '@/hooks/admin/common/useErrorModal';
import { useRouter } from 'next/navigation';

function useHome() {
  const router = useRouter();

  // エラーモーダル状態管理フック
  const errorModalHook = useErrorModal();

  // サマリの状態管理フック
  const { totalPosts, publishedPosts, draftPosts, getSummary } = useSummary({
    setErrorMessage: errorModalHook.setErrorMessage,
  });

  // 投稿一覧の状態管理フック
  const { postList, getPostList } = usePostList({
    setErrorMessage: errorModalHook.setErrorMessage,
  });

  const handleClickCreate = () => {
    router.push('/admin/posts/new');
  };

  useEffect(() => {
    // 初期処理
    getSummary();
    getPostList({ limit: 6 });
  }, [getSummary, getPostList]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    errorModalHook,
    handleClickCreate,
    postList,
  };
}

export default useHome;
