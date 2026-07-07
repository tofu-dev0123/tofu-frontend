'use client';

import Blog from '@/components/features/public/blogs/Blog';
import Pagination from '@/components/features/public/blogs/Pagination';
import { motion } from 'framer-motion';
import type { Post } from '@/types/api/public/posts';

type Props = {
  blogsList: Post[];
  keyword: string | null;
  totalCount: number;
  page: number;
  totalPages: number;
};

function BlogsMain({
  blogsList,
  keyword,
  totalCount,
  page,
  totalPages,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {totalCount === 0 ? (
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
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} keyword={keyword} />
          )}
        </div>
      )}
    </motion.div>
  );
}

export default BlogsMain;
