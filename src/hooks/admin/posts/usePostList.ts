'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useErrorModal from '@/hooks/admin/common/useErrorModal';
import useSearchPost from '@/hooks/admin/posts/useSearchPost';
import useStatus from '@/hooks/admin/posts/useStatus';
import { PostStatus } from '@/types/api/post';
import usePostDeleteAlert from './usePostDeleteAlert';

function usePostList() {
  const searchParams = useSearchParams();
  const { showError } = useErrorModal();
  const searchPostHook = useSearchPost();
  const statusHook = useStatus();
  const deleteAlertHook = usePostDeleteAlert({ showError });
  const [displayedKeyword, setDisplayedKeyword] = useState<string>('');

  useEffect(() => {
    // 初期処理
    const init = async () => {
      const page = searchParams.get('page');
      const keyword = searchParams.get('keyword');
      const status = searchParams.get('status') as PostStatus | undefined;

      let offset = 0;
      let limit = 10;
      if (page) {
        offset = (parseInt(page) - 1) * limit;
      }

      searchPostHook.search(
        offset,
        limit,
        keyword || undefined,
        status || undefined
      );
      setDisplayedKeyword(keyword || '');
    };

    init();
  }, [searchParams]);

  return {
    totalCount: searchPostHook.totalCount,
    totalPages: searchPostHook.totalPages,
    postList: searchPostHook.postList,
    keyword: searchPostHook.keyword,
    displayedKeyword,
    status: statusHook.status,
    openDeleteAlert: deleteAlertHook.open,
    handleOpenDeleteAlert: deleteAlertHook.handleOpen,
    handleCloseDeleteAlert: deleteAlertHook.handleClose,
    handleDelete: deleteAlertHook.handleDelete,
    setTotalCount: searchPostHook.setTotalCount,
    setTotalPages: searchPostHook.setTotalPages,
    setPostList: searchPostHook.setPostList,
    setKeyword: searchPostHook.setKeyword,
    handleSearch: searchPostHook.handleSearch,
    handleInputChange: searchPostHook.handleInputChange,
    handleStatusChange: statusHook.handleStatusChange,
  };
}

export default usePostList;
