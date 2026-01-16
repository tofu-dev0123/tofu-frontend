'use client';

import Logo from '@/components/features/public/common/Logo';
import { motion } from 'framer-motion';
import DesktopNavigation from '@/components/features/public/common/DesktopNavigation';
import useIsMobile from '@/hooks/public/common/useIsMobile';
import MobileNavigation from '@/components/features/public/common/MobileNavigation';
import { useLoading } from '@/contexts/public/LoadingContext';

function PublicHeader({
  isTop,
  isActive,
}: {
  isTop: boolean;
  isActive: (href: string) => boolean;
}) {
  const { isLoading } = useLoading();
  const isMobile = useIsMobile();

  return (
    !isLoading && (
      <motion.div
        key={`header-${isTop}`}
        className="w-full h-full flex items-center justify-between"
        initial={{ opacity: isTop ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: isTop ? 2 : 0 }}
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
