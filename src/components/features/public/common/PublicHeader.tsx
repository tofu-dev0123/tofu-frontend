'use client';

import Logo from '@/components/features/public/common/Logo';
import { motion } from 'framer-motion';
import DesktopNavigation from '@/components/features/public/common/DesktopNavigation';
import useIsMobile from '@/hooks/public/common/useIsMobile';
import MobileNavigation from '@/components/features/public/common/MobileNavigation';

function PublicHeader({
  isTop,
  isActive,
}: {
  isTop: boolean;
  isActive: (href: string) => boolean;
}) {
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-full flex items-center justify-between">
      <motion.div
        className="w-1/2 h-full lg:pl-[10%] flex lg:items-end items-center justify-start lg:ml-0 ml-2"
        initial={{ opacity: isTop ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isTop ? 1.0 : 0.3, delay: isTop ? 1.5 : 0 }}
      >
        <Logo />
      </motion.div>
      <div className="w-1/2 h-full flex lg:items-end items-center lg:justify-start justify-end lg:mr-0 mr-2">
        {isMobile ? (
          <MobileNavigation isActive={isActive} />
        ) : (
          isTop && <DesktopNavigation />
        )}
      </div>
    </div>
  );
}

export default PublicHeader;
