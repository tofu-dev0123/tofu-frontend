'use client';

import Link from 'next/link';
import { PUBLIC_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';
import { useState } from 'react';
import HamburgerMenu from '@/components/features/public/common/HamburgerMenu';
import { motion } from 'framer-motion';

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-start gap-10">
      <motion.nav
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '120%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-2/5 h-full flex flex-col gap-10 bg-black/90 shadow-lg pt-30 pl-4 fixed top-0 right-0 z-20"
      >
        {PUBLIC_NAVIGATION_ITEMS.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="text-lg font-bold tracking-[0.3em] font-sub-logo text-public-main"
            onClick={handleClickMenu}
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
