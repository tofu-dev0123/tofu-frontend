'use client';

import { PUBLIC_NAVIGATION_ITEMS } from '@/constants/public/navigationItems';
import Link from 'next/link';

function DesktopNavigation({
  isActive,
}: {
  isActive: (href: string) => boolean;
}) {
  return (
    <nav className="flex items-center justify-start gap-10">
      {PUBLIC_NAVIGATION_ITEMS.map((item) => (
        <li
          key={item.label}
          className={`list-none text-lg font-semibold tracking-[0.3em] font-sub-logo cursor-pointer hover:text-black hover:translate-y-[-1px] transition-all duration-300 ${isActive(item.href) ? 'text-black' : 'text-black/50'}`}
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </nav>
  );
}

export default DesktopNavigation;
