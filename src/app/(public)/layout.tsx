import React from 'react';
import BackGroundImage from '@/components/features/public/common/BackGroundImage';
import PublicHeader from '@/components/features/public/common/PublicHeader';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-public-main fixed inset-0 overflow-auto flex flex-col">
      <header className="w-full h-15">
        <PublicHeader />
      </header>
      <main className="w-full h-full flex-1">{children}</main>
      <BackGroundImage />
    </div>
  );
}

export default PublicLayout;
