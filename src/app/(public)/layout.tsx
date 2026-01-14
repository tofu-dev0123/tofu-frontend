'use client';

import React from 'react';
import PublicHeader from '@/components/features/public/common/PublicHeader';
import usePageNavigation from '@/hooks/public/common/usePageNavigation';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/public/common/useIsMobile';

function PublicLayout({ children }: { children: React.ReactNode }) {
  const { isTop, isActive } = usePageNavigation();
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-screen bg-public-main fixed inset-0 overflow-auto flex flex-col">
      <motion.header
        className="w-full h-15"
        animate={{
          marginTop: isTop ? (isMobile ? 0 : 120) : 0, // lg:mt-30 相当（pxで制御）
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <PublicHeader isTop={isTop} isActive={isActive} />
      </motion.header>
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}

export default PublicLayout;
