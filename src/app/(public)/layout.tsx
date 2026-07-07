import React from 'react';
import PublicShell from '@/components/features/public/common/PublicShell';
import PublicMotionConfig from '@/components/features/public/common/PublicMotionConfig';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicMotionConfig>
      <PublicShell>{children}</PublicShell>
    </PublicMotionConfig>
  );
}

export default PublicLayout;
