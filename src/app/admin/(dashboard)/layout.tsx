'use client';

import type { ReactNode } from 'react';
import useDashboard from '@/hooks/admin/common/useDashboard';
import ErrorModal from '@/components/features/admin/common/ErrorModal';
import Navigation from '@/components/features/admin/common/Navigation';
import Title from '@/components/features/admin/common/Title';
import { usePathname } from 'next/navigation';
import { getPageTitle } from '@/constants/admin/pageTitle';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { handleClickLogout, errorModalHook, searchPostHook } = useDashboard();

  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="w-full h-screen bg-gray-100/50">
      {/* ナビゲーション サイドに固定で配置 */}
      <aside className="fixed top-0 left-0 h-full w-40">
        <Navigation
          loginFlag={true}
          handleClickLogout={handleClickLogout}
          keyword={searchPostHook.keyword}
          handleInputChange={searchPostHook.handleInputChange}
          handleSearch={searchPostHook.handleSearch}
        />
      </aside>
      {/* メインコンテンツ */}
      <div className="w-full h-full flex flex-col justify-center items-center">
        <main className="flex-1 overflow-auto">
          <Title title={pageTitle} />
          {children}
        </main>
      </div>
      <ErrorModal
        isOpen={errorModalHook.isOpen}
        errorMessage={errorModalHook.errorMessage}
        onClose={errorModalHook.onClose}
      />
    </div>
  );
}
