'use client';

import { useState, useEffect } from 'react';

function useIsMobile() {
  // 初期値は常にfalseにして、SSRとクライアントで一貫性を保つ
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // クライアント側でのみ実行される
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // 初回レンダリング時に値を設定
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export default useIsMobile;
