import { useState, useCallback } from 'react';
import { Post, PostGetResponse } from '@/types/api/public/posts';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';

function useBlogsList() {
  const [blogsList, setBlogsList] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getBlogsList = useCallback(async () => {
    try {
      const response = await get<PostGetResponse>(API_ENDPOINTS.blogs.get);
      setBlogsList(response.posts);
      setTotalCount(response.total_count);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { blogsList, totalCount, totalPages, page, getBlogsList };
}

export default useBlogsList;
