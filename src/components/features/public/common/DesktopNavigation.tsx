'use client';

import { PUBLIC_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/public/common/useIsMobile';

function DesktopNavigation({ isTop }: { isTop: boolean }) {
  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: isTop ? 1 : 0, display: isTop ? 'flex' : 'none' }}
      transition={{ duration: 1 }}
      className="flex items-center justify-start gap-10"
    >
      {PUBLIC_NAVIGATION_ITEMS.map((item) => (
        <li
          key={item.label}
          className="list-none text-lg font-semibold tracking-[0.3em] font-sub-logo cursor-pointer hover:text-black hover:translate-y-[-1px] transition-all duration-300 text-black/50"
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </motion.nav>
  );
}

export default DesktopNavigation;
