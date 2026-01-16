import { useState, useCallback, useEffect } from 'react';
import { Post, PostGetResponse } from '@/types/api/public/posts';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { useSearchParams } from 'next/navigation';

function useBlogsList() {
  const [blogsList, setBlogsList] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const paramsKeyword = searchParams.get('keyword');
  const paramsPage = searchParams.get('page');

  const getBlogsList = useCallback(
    async (keyword: string | null, pageNum: number | null) => {
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
        setPage(response.page);
      } catch {
        throw new Error('記事の取得に失敗しました...');
      }
    },
    []
  );

  useEffect(() => {
    if (paramsKeyword) {
      setKeyword(paramsKeyword);
    }
    if (paramsPage) {
      setPage(parseInt(paramsPage));
    }
    getBlogsList(paramsKeyword || null, paramsPage ? parseInt(paramsPage) : 1);
  }, [paramsKeyword, paramsPage]);

  return { blogsList, totalCount, totalPages, page, keyword, getBlogsList };
}

export default useBlogsList;
