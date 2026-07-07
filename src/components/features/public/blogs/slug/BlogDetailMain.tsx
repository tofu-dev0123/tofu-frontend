'use client';

import type { PostDetailResponse } from '@/types/api/public/posts';
import { motion } from 'framer-motion';
import Back from '@/components/features/public/common/Back';
import Links from '@/components/features/public/blogs/slug/Links';
import BlogContent from '@/components/features/public/blogs/slug/BlogContent';
import BlogFooter from '@/components/features/public/blogs/slug/BlogFooter';

function BlogDetailMain({ blogDetail }: { blogDetail: PostDetailResponse }) {
  return (
    <motion.div
      className="w-full min-h-screen flex flex-col mb-20 lg:px-20 px-2"
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
  );
}

export default BlogDetailMain;
