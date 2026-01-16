'use client';

import Search from '@/components/features/public/blogs/Search';
import useBlogsList from '@/hooks/public/blogs/useBlogsList';
import Blog from '@/components/features/public/blogs/Blog';

function BlogsMain() {
  const { blogsList, totalCount, totalPages, page, getBlogsList } =
    useBlogsList();
  const handleSearch = (value: string) => {
    getBlogsList(value);
  };

  return (
    <div className="h-full w-full px-2">
      <Search handleSearch={handleSearch} />
      <div className="flex-1 overflow-y-auto py-4">
        {blogsList.map((blog, index) => (
          <div key={blog.post_id}>
            <Blog blog={blog} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsMain;
