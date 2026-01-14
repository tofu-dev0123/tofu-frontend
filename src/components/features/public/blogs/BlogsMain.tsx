'use client';

import BlogsList from '@/components/features/public/blogs/BlogsList';
import SidebarNavigation from '@/components/features/public/common/SidebarNavigation';
import usePageNavigation from '@/hooks/public/common/usePageNavigation';
import { motion } from 'framer-motion';

function BlogsMain() {
  const { isActive } = usePageNavigation();
  return (
    <motion.div
      className="h-full w-full pt-10 flex relative justify-center items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
    >
      <SidebarNavigation isActive={isActive} />
      <BlogsList />
    </motion.div>
  );
}

export default BlogsMain;
