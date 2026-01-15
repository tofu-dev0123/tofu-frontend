import { useState, useCallback } from 'react';
import { Post, PostGetResponse } from '@/types/api/public/posts';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { useEffect } from 'react';

function useBlogsList() {
  const [blogsList, setBlogsList] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getBlogsList = useCallback(async (keyword?: string, page?: number) => {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append('keyword', keyword);
    if (page) queryParams.append('page', page.toString());

    try {
      const response = await get<PostGetResponse>(
        `${API_ENDPOINTS.blogs.get}?${queryParams.toString()}`
      );
      setBlogsList(response.posts);
      setTotalCount(response.total_count);
      setTotalPages(response.total_pages);
    } catch (error) {
      throw new Error('記事の取得に失敗しました...');
    }
  }, []);

  useEffect(() => {
    getBlogsList();
  }, [getBlogsList]);

  return { blogsList, totalCount, totalPages, page, getBlogsList };
}

export default useBlogsList;
