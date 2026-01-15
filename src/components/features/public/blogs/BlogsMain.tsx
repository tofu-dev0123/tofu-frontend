'use client';

import Search from '@/components/features/public/blogs/Search';
import useBlogsList from '@/hooks/public/blogs/useBlogsList';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils/dateFormat';
import { useRouter } from 'next/navigation';

function BlogsMain() {
  const router = useRouter();
  const { blogsList, totalCount, totalPages, page, getBlogsList } =
    useBlogsList();
  const handleSearch = (value: string) => {
    getBlogsList(value);
  };

  return (
    <div className="h-full w-full">
      <Search handleSearch={handleSearch} />
      <div className="flex-1 overflow-y-auto py-4">
        <hr className="w-hul border-black/10" />
        {blogsList.map((blog) => (
          <div key={blog.post_id}>
            <div
              className="hover:bg-gray-100/50 transition-all duration-300 cursor-pointer flex items-center justify-between"
              onClick={() => {
                router.push(`/blogs/${blog.slug}`);
              }}
            >
              <div className="h-50 w-full flex items-center justify-between p-4">
                <div className="flex flex-col gap-1 h-full justify-center">
                  <div className="lg:text-lg text-base font-bold font-sub-logo tracking-[0.05em]">
                    {blog.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDateTime(blog.published_at)}
                  </div>
                </div>
                <div className="h-full p-2 aspect-video relative">
                  <Image
                    src={blog.thumbnail_url}
                    alt={blog.title}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <hr className="w-hul border-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsMain;
