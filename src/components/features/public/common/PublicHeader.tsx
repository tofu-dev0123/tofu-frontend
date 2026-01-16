'use client';

import Logo from '@/components/features/public/common/Logo';
import { motion } from 'framer-motion';
import DesktopNavigation from '@/components/features/public/common/DesktopNavigation';
import useIsMobile from '@/hooks/public/common/useIsMobile';
import MobileNavigation from '@/components/features/public/common/MobileNavigation';
import { useState, useEffect } from 'react';

function PublicHeader({
  isTop,
  isActive,
}: {
  isTop: boolean;
  isActive: (href: string) => boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isTop) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  }, [isTop]);

  return (
    !isLoading && (
      <motion.div
        className="w-full h-full flex items-center justify-between"
        initial={{ opacity: isTop ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="w-1/2 h-full lg:pl-[10%] flex lg:items-end items-center justify-start lg:ml-0 ml-2">
          <Logo />
        </div>
        <div className="w-1/2 h-full flex lg:items-end items-center lg:justify-start justify-end lg:mr-0 mr-2">
          {isMobile ? (
            <MobileNavigation isActive={isActive} />
          ) : (
            <DesktopNavigation isTop={isTop} />
          )}
        </div>
      </motion.div>
    )
  );
}

export default PublicHeader;
