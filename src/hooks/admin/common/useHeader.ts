'use client';

import { useRouter } from 'next/navigation';

function useHeader() {
  const router = useRouter();

  // ロゴクリック処理
  const handleClickLogo = () => {
    router.push('/admin/home');
  };

  return { handleClickLogo };
}

export default useHeader;
