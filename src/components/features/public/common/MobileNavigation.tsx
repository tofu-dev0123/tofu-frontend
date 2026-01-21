'use client';

import Link from 'next/link';
import { PUBLIC_SIDEBAR_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';
import { useState } from 'react';
import HamburgerMenu from '@/components/features/public/common/HamburgerMenu';
import { motion } from 'framer-motion';
import PublicFooter from './PublicFooter';

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
        initial={{ opacity: 0, x: '120%' }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '120%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-2/5 h-screen  bg-public-main py-[20%] pl-8 fixed top-0 right-0 z-20 border-l border-black/10 flex flex-col justify-between"
      >
        <ul className="flex flex-col gap-10">
          {PUBLIC_SIDEBAR_NAVIGATION_ITEMS.map((item) => (
            <li
              key={item.href}
              className="w-full flex items-center justify-start list-none"
            >
              <Link
                href={item.href}
                onClick={handleClickMenu}
                className={`text-lg font-sub-logo ${isActive(item.href) ? 'opacity-100 font-bold' : 'opacity-50'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <PublicFooter />
      </motion.nav>
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '120%' }}
        transition={{ duration: 1 }}
        className="w-full h-full z-10"
        onClick={handleClickMenu}
      ></motion.div>
      <div className="fixed top-0 right-0 w-12 h-12 flex items-center justify-center z-30">
        <HamburgerMenu onClick={handleClickMenu} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default MobileNavigation;
