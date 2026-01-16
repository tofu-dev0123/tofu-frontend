'use client';

import { motion } from 'framer-motion';
import SidebarNavigation from '@/components/features/public/common/SidebarNavigation';
import usePageNavigation from '@/hooks/public/common/usePageNavigation';

function FeatureLayout({ children }: { children: React.ReactNode }) {
  const { isActive } = usePageNavigation();
  return (
    <motion.div
      className="h-full w-full pt-10 flex relative justify-center items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
    >
      <SidebarNavigation isActive={isActive} />
      <div className="h-full lg:w-180 w-full px-2 flex flex-col py-10 mx-auto">
        {children}
      </div>
    </motion.div>
  );
}

export default FeatureLayout;
