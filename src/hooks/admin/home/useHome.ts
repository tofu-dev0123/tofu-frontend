'use client';

import useSummary from '@/hooks/admin/home/useSummary';
import usePostList from '@/hooks/admin/home/usePostList';
import { useEffect } from 'react';
import useErrorModal from '@/hooks/admin/common/useErrorModal';
import { useRouter } from 'next/navigation';
import { PostStatus } from '@/types/api/post';

function useHome() {
  const router = useRouter();

  // エラーモーダル状態管理フック
  const errorModalHook = useErrorModal();

  // サマリの状態管理フック
  const { totalPosts, publishedPosts, draftPosts, getSummary } = useSummary({
    showError: errorModalHook.showError,
  });

  // 投稿一覧の状態管理フック
  const { postList, getPostList } = usePostList({
    showError: errorModalHook.showError,
  });

  const handleClickCreate = () => {
    router.push('/admin/posts/new');
  };

  const handleClickPost = (postId: number) => {
    router.push(`/admin/posts/${postId}/edit`);
  };

  useEffect(() => {
    // 初期処理
    getSummary();
    getPostList({ limit: 6, status: 'PUBLISHED' as PostStatus });
  }, [getSummary, getPostList]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    errorModalHook,
    handleClickCreate,
    handleClickPost,
    postList,
  };
}

export default useHome;
