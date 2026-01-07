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
    errorModalHook,
    searchPostHook,
  } = useDashboard();

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100/50">
        {/* ヘッダー: 上部全幅、2列をまたぐ */}
        <header className="w-full">
          <Header
            loginFlag={true}
            handleClickLogout={handleClickLogout}
            keyword={searchPostHook.keyword}
            handleInputChange={searchPostHook.handleInputChange}
            handleSearch={searchPostHook.handleSearch}
          />
        </header>
        {/* メインコンテンツ: 右側、残りのスペース */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <ErrorModal
        isOpen={errorModalHook.isOpen}
        errorMessage={errorModalHook.errorMessage}
        onClose={errorModalHook.onClose}
      />
    </>
  );
}
