'use client';

import Link from 'next/link';
import { PUBLIC_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';

function DesktopNavigation() {
  return (
    <div className="flex items-center justify-start gap-10">
      {PUBLIC_NAVIGATION_ITEMS.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="text-lg font-semibold tracking-[0.3em] font-sub-logo text-black/50 hover:text-black hover:translate-y-[-1px] transition-all duration-300"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default DesktopNavigation;
