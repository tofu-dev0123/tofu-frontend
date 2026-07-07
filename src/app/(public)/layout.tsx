import React from 'react';
import PublicShell from '@/components/features/public/common/PublicShell';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}

export default PublicLayout;
