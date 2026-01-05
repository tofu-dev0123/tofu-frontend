'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useErrorModal from '@/hooks/admin/common/useErrorModal';
import useSearchPost from '@/hooks/admin/posts/useSearchPost';

function usePostList() {
  const searchParams = useSearchParams();
  const { showError } = useErrorModal();
  const searchPostHook = useSearchPost();
  const [displayedKeyword, setDisplayedKeyword] = useState<string>('');

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
    setTotalCount: searchPostHook.setTotalCount,
    setTotalPages: searchPostHook.setTotalPages,
    setPostList: searchPostHook.setPostList,
    setKeyword: searchPostHook.setKeyword,
    handleSearch: searchPostHook.handleSearch,
    handleInputChange: searchPostHook.handleInputChange,
  };
}

export default usePostList;
