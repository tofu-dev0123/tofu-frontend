import { Suspense } from 'react';
import BlogsMain from '@/components/features/public/blogs/BlogsMain';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import type { PostGetResponse } from '@/types/api/public/posts';

type Props = {
  searchParams: Promise<{ keyword?: string; page?: string }>;
};

async function BlogsList({ searchParams }: Props) {
  const { keyword, page } = await searchParams;
  const queryParams = new URLSearchParams();
  if (keyword) queryParams.append('keyword', keyword);
  if (page) queryParams.append('page', page);
  const url = queryParams.toString()
    ? `${API_ENDPOINTS.blogs.get}?${queryParams.toString()}`
    : API_ENDPOINTS.blogs.get;

  const response = await get<PostGetResponse>(url);

  return (
    <BlogsMain
      blogsList={response.posts}
      keyword={keyword ?? null}
      totalCount={response.total_count}
      page={response.page}
      totalPages={response.total_pages}
    />
  );
}

export default function Page({ searchParams }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsList searchParams={searchParams} />
    </Suspense>
  );
}
