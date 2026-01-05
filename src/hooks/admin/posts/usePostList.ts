'use client';

import { useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { exceptErrorHandling } from '@/lib/utils/exceptErrorHandling';
import { useSearchParams } from 'next/navigation';
import useErrorModal from '@/hooks/admin/common/useErrorModal';
import useSearchPost from '@/hooks/admin/posts/useSearchPost';

function usePostList() {
  const searchParams = useSearchParams();
  const { showError } = useErrorModal();
  const searchPostHook = useSearchPost();

  useEffect(() => {
    // 初期処理
    const init = async () => {
      const page = searchParams.get('page');
      const keyword = searchParams.get('keyword');

      let offset = 0;
      let limit = 10;
      if (page) {
        offset = (parseInt(page) - 1) * limit;
      }

      searchPostHook.search(offset, limit, keyword || undefined);
    };

    init();
  }, [searchParams]);

  return {
    totalCount: searchPostHook.totalCount,
    totalPages: searchPostHook.totalPages,
    postList: searchPostHook.postList,
    keyword: searchPostHook.keyword,
    setTotalCount: searchPostHook.setTotalCount,
    setTotalPages: searchPostHook.setTotalPages,
    setPostList: searchPostHook.setPostList,
    setKeyword: searchPostHook.setKeyword,
    handleSearch: searchPostHook.handleSearch,
    handleInputChange: searchPostHook.handleInputChange,
  };
}

export default usePostList;
