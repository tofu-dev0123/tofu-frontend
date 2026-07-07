'use client';

import { PUBLIC_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/public/common/useIsMobile';
import { useState } from 'react';
import { hasStartedSession } from '@/lib/publicSession';

function DesktopNavigation() {
  const isMobile = useIsMobile();
  const [isInitialVisit] = useState(() => !hasStartedSession());
  if (isMobile) return null;

  return (
    <motion.nav
      initial={{ opacity: isInitialVisit ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: isInitialVisit ? 1.0 : 0,
        delay: isInitialVisit ? 1.5 : 0,
      }}
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
