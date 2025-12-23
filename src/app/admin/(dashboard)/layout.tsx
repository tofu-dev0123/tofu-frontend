'use client';

import type { ReactNode } from 'react';
import Header from '@/components/features/admin/common/Header';
import Navigation from '@/components/features/admin/common/Navigation';
import useDashboard from '@/hooks/admin/common/useDashboard';
import ErrorModal from '@/components/features/admin/common/ErrorModal';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const {
    isMenuOpen,
    handleClickMenu,
    handleClickLogout,
    errorMessage,
    isErrorModalOpen,
    setIsErrorModalOpen,
  } = useDashboard();

  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
        {/* ヘッダー: 上部全幅、2列をまたぐ */}
        <header className="col-span-2">
          <Header
            loginFlag={true}
            handleClickMenu={handleClickMenu}
            handleClickLogout={handleClickLogout}
          />
        </header>

        {/* ナビゲーション: 左側、固定幅 */}
        <aside className="row-start-2">
          <Navigation isOpen={isMenuOpen} />
        </aside>

        {/* メインコンテンツ: 右側、残りのスペース */}
        <main className="row-start-2 overflow-auto">{children}</main>
      </div>
      <ErrorModal isOpen={isErrorModalOpen} errorMessage={errorMessage} />
    </>
  );
}
