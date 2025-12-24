'use client';

import { useState, useCallback } from 'react';
import type { Post, PostResponse } from '@/types/api/post';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { exceptErrorHandling } from '@/lib/utils/exceptErrorHandling';

interface UsePostListProps {
  setErrorMessage: (message: string[]) => void;
}

function usePostList({ setErrorMessage }: UsePostListProps) {
  const [postList, setPostList] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getPostList = useCallback(async (params: {
    offset?: number;
    limit?: number;
    keyword?: string;
  }) => {
    const { offset, limit, keyword } = params;
    const queryParams = new URLSearchParams();

    if (offset) queryParams.append('offset', offset.toString());
    if (limit) queryParams.append('limit', limit.toString());
    if (keyword) queryParams.append('keyword', keyword);

    try {
      const response = await get<PostResponse>(
        `${API_ENDPOINTS.posts.get}?${queryParams.toString()}`
      );
      setPostList(response.posts);
      setTotalCount(response.total_count);
      setTotalPages(response.total_pages);
    } catch (error) {
      exceptErrorHandling(error, setErrorMessage);
    }
  }, [setErrorMessage]);

  return {
    postList,
    totalCount,
    totalPages,
    getPostList,
  };
}

export default usePostList;
