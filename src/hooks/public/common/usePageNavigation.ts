'use client';

import { usePathname } from 'next/navigation';

function usePageNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isTop = pathname === '/';

  return {
    pathname,
    isActive,
    isTop,
  };
}

export default usePageNavigation;
