'use client';

import Search from '@/components/features/public/blogs/Search';
import useBlogsList from '@/hooks/public/blogs/useBlogsList';
import Blog from '@/components/features/public/blogs/Blog';
import Keyword from '@/components/features/public/blogs/Keyword';

function BlogsMain() {
  const { blogsList, keyword } = useBlogsList();

  return (
    <div className="h-full w-full px-2">
      <Search />
      <Keyword keyword={keyword} />
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
