import { Suspense } from 'react';
import BlogsMain from '@/components/features/public/blogs/BlogsMain';
import BlogsSkeleton from '@/components/features/public/blogs/BlogsSkeleton';
import Search from '@/components/features/public/blogs/Search';
import Keyword from '@/components/features/public/blogs/Keyword';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import type { PostGetResponse } from '@/types/api/public/posts';

type Props = {
  searchParams: Promise<{ keyword?: string; page?: string }>;
};

async function BlogsList({
  keyword,
  page,
}: {
  keyword: string | null;
  page: string | null;
}) {
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
      keyword={keyword}
      totalCount={response.total_count}
      page={response.page}
      totalPages={response.total_pages}
    />
  );
}

export default async function Page({ searchParams }: Props) {
  const { keyword, page } = await searchParams;
  const keywordValue = keyword ?? null;
  const pageValue = page ?? null;

  return (
    <div className="h-full w-full px-2 relative">
      <Search />
      <Keyword keyword={keywordValue} />
      <Suspense
        key={`${keywordValue ?? ''}-${pageValue ?? ''}`}
        fallback={<BlogsSkeleton />}
      >
        <BlogsList keyword={keywordValue} page={pageValue} />
      </Suspense>
    </div>
  );
}
