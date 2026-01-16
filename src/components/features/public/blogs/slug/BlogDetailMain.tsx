'use client';

import useBlogDetail from '@/hooks/public/blogs/useBlogDetail';
import { motion } from 'framer-motion';
import Loading from '@/components/features/public/common/Loading';
import Back from '@/components/features/public/common/Back';
import Links from '@/components/features/public/blogs/slug/Links';
import BlogContent from '@/components/features/public/blogs/slug/BlogContent';
import BlogFooter from '@/components/features/public/blogs/slug/BlogFooter';

function BlogDetailMain({ slug }: { slug: string }) {
  const { blogDetail, isLoading } = useBlogDetail(slug);

  if (!blogDetail) return;

  return (
    <>
      {isLoading ? (
        <div className="w-full full relative">
          <Loading />
        </div>
      ) : (
        <motion.div
          className="w-full min-h-screen flex flex-col mb-20 lg:px-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Back href="/blogs" />
          <Links position="right" title={blogDetail.title} />
          <BlogContent blogDetail={blogDetail} />
          <BlogFooter title={blogDetail.title} />
        </motion.div>
      )}
    </>
  );
}

export default BlogDetailMain;
