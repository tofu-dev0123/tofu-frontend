'use client';

import { PUBLIC_SIDEBAR_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/public/common/useIsMobile';

function SidebarNavigation({
  isActive,
}: {
  isActive: (href: string) => boolean;
}) {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <motion.nav
      className="absolute left-[10%] top-10 h-full w-[10%] py-10 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ul className="h-full flex flex-col gap-10 border-r border-black/10">
        {PUBLIC_SIDEBAR_NAVIGATION_ITEMS.map((item) => (
          <li
            key={item.label}
            className={`list-none text-lg font-sub-logo opacity-50 transition-all duration-500 hover:opacity-100 hover:translate-x-1 ${isActive(item.href) ? 'opacity-100 font-bold' : 'opacity-50'}`}
          >
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export default SidebarNavigation;
