import { useState, useCallback, useEffect } from 'react';
import { Post, PostGetResponse } from '@/types/api/public/posts';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';

function useBlogsList() {
  const [blogsList, setBlogsList] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getBlogsList = useCallback(
    async (keyword?: string, pageNum?: number) => {
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.append('keyword', keyword);
      if (pageNum) queryParams.append('page', pageNum.toString());

      try {
        const response = await get<PostGetResponse>(
          `${API_ENDPOINTS.blogs.get}?${queryParams.toString()}`
        );
        setBlogsList(response.posts);
        setTotalCount(response.total_count);
        setTotalPages(response.total_pages);
        if (pageNum) {
          setPage(pageNum);
        }
      } catch {
        throw new Error('記事の取得に失敗しました...');
      }
    },
    []
  );

  useEffect(() => {
    getBlogsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { blogsList, totalCount, totalPages, page, getBlogsList };
}

export default useBlogsList;
