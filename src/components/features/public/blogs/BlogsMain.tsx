'use client';

import Search from '@/components/features/public/blogs/Search';
import useBlogsList from '@/hooks/public/blogs/useBlogsList';
import Blog from '@/components/features/public/blogs/Blog';
import Keyword from '@/components/features/public/blogs/Keyword';
import { motion } from 'framer-motion';
import Loading from '@/components/features/public/common/Loading';

function BlogsMain() {
  const { isLoading, blogsList, keyword, totalCount } = useBlogsList();

  return (
    <motion.div
      className="h-full w-full px-2 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Search />
      <Keyword keyword={keyword} />
      {isLoading ? (
        <Loading />
      ) : totalCount === 0 ? (
        <div className="w-full flex items-center py-4">
          <p className="text-sm text-gray-500 font-sub-logo">
            条件に一致する記事はありませんでした...
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto py-4">
          {blogsList.map((blog, index) => (
            <div key={blog.post_id}>
              <Blog blog={blog} index={index} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default BlogsMain;
