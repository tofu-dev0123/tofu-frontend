'use client';

import React, { useEffect } from 'react';
import PublicHeader from '@/components/features/public/common/PublicHeader';
import usePageNavigation from '@/hooks/public/common/usePageNavigation';
import useIsMobile from '@/hooks/public/common/useIsMobile';
import { markSessionStarted } from '@/lib/publicSession';

function PublicShell({ children }: { children: React.ReactNode }) {
  const { isTop, isActive } = usePageNavigation();
  const isMobile = useIsMobile();

  useEffect(() => {
    markSessionStarted();
  }, []);

  return (
    <div className="w-full h-screen bg-public-main fixed inset-0 overflow-auto flex flex-col">
      <header className={`w-full h-15 ${isTop && !isMobile ? 'mt-30' : ''}`}>
        <PublicHeader isTop={isTop} isActive={isActive} />
      </header>
      <main className="w-full flex-1">{children}</main>
    </div>
  );
}

export default PublicShell;
