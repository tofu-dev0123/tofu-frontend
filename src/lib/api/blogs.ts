import { cache } from 'react';
import { PostDetailResponse } from '@/types/api/public/posts';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { get } from '@/lib/api/http';

/**
 * 記事詳細を取得する。
 * generateMetadata と Page で同一リクエストになるため cache() で重複排除する。
 */
export const getBlogDetail = cache(
  async (slug: string): Promise<PostDetailResponse> => {
    const response = await get<PostDetailResponse>(
      API_ENDPOINTS.blogs.detail(slug)
    );
    return response;
  }
);
