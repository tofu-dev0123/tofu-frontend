'use client';

import Link from 'next/link';
import { PUBLIC_SIDEBAR_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';
import { useState } from 'react';
import HamburgerMenu from '@/components/features/public/common/HamburgerMenu';
import { motion } from 'framer-motion';

function MobileNavigation({
  isActive,
}: {
  isActive: (href: string) => boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-start gap-10">
      <motion.nav
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '120%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-2/5 h-full flex flex-col gap-10 bg-public-main pt-30 pl-8 fixed top-0 right-0 z-20 border-l border-black/10"
      >
        {PUBLIC_SIDEBAR_NAVIGATION_ITEMS.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            onClick={handleClickMenu}
            className={`text-lg font-sub-logo ${isActive(item.href) ? 'opacity-100 font-bold' : 'opacity-50'}`}
          >
            {item.label}
          </Link>
        ))}
      </motion.nav>
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '120%' }}
        transition={{ duration: 1 }}
        className="w-full h-full fixed top-0 left-0 z-10"
        onClick={handleClickMenu}
      ></motion.div>
      <div className="w-12 h-12 flex items-center justify-center z-30">
        <HamburgerMenu onClick={handleClickMenu} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default MobileNavigation;
