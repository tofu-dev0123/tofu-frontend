'use client';

import type { ReactNode } from 'react';
import useDashboard from '@/hooks/admin/common/useDashboard';
import ErrorModal from '@/components/features/admin/common/ErrorModal';
import Navigation from '@/components/features/admin/common/Navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { handleClickLogout, errorModalHook, searchPostHook } = useDashboard();

  return (
    <>
      <div className="w-full h-screen flex bg-gray-100">
        {/* ヘッダー: 上部全幅、2列をまたぐ */}
        <aside className="h-full w-40">
          <Navigation
            loginFlag={true}
            handleClickLogout={handleClickLogout}
            keyword={searchPostHook.keyword}
            handleInputChange={searchPostHook.handleInputChange}
            handleSearch={searchPostHook.handleSearch}
          />
        </aside>
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
