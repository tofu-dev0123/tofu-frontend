'use client';

import { useState, useEffect } from 'react';
import type { PostDetailResponse } from '@/types/api/public/posts';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';

function useBlogDetail(slug: string) {
  const [blogDetail, setBlogDetail] = useState<PostDetailResponse | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchBlogDetail = async (slug: string) => {
      try {
        const blogDetail = await get<PostDetailResponse>(
          API_ENDPOINTS.blogs.detail(slug)
        );
        setBlogDetail(blogDetail);
      } catch (error) {
        throw new Error('ブログの詳細情報の取得に失敗しました');
      }
    };
    fetchBlogDetail(slug);
  }, [slug]);

  return { blogDetail };
}

export default useBlogDetail;
