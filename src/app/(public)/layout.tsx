'use client';

import React from 'react';
import PublicHeader from '@/components/features/public/common/PublicHeader';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const isTop = pathname === '/';
  return (
    <div className="w-full h-screen bg-public-main fixed inset-0 overflow-auto flex flex-col">
      <motion.header
        className="w-full h-15"
        animate={{
          marginTop: isTop ? 120 : 0, // lg:mt-30 相当（pxで制御）
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <PublicHeader isActive={isActive} isTop={isTop} />
      </motion.header>
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}

export default PublicLayout;
