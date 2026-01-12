import React from 'react';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen bg-public-main">{children}</div>;
}

export default PublicLayout;
