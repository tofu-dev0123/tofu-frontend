import { PostDetailResponse } from '@/types/api/public/posts';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { get } from '@/lib/api/http';

export const getOgpPost = async (slug: string): Promise<PostDetailResponse> => {
  const response = await get<PostDetailResponse>(
    API_ENDPOINTS.blogs.detail(slug)
  );
  return response;
};
