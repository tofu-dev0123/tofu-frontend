'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
function useHeader() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ハンバーガーメニュークリック処理
  const handleClickMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ロゴクリック処理
  const handleClickLogo = () => {
    router.push('/admin/home');
  };

  return { isMenuOpen, handleClickLogo, handleClickMenu };
}

export default useHeader;
