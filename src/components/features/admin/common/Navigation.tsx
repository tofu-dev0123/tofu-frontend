'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import logoutIcon from '@/assets/images/logout-icon.png';
import {
  NAVIGATION_ITEMS,
  getActiveIndex,
} from '@/constants/admin/navigationItem';
import useCheckMobile from '@/hooks/admin/common/useCheckMobile';

interface NavigationProps {
  handleClickLogout?: () => void;
}

function Navigation({ handleClickLogout }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useCheckMobile();

  const activeIndex = getActiveIndex(pathname);

  // アイコンクリックハンドラー
  const handleIconClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="w-full lg:w-15 h-20 px-4 flex lg:flex-col justify-center items-center mx-auto fixed bottom-5 lg:top-[50%] lg:translate-y-[-50%] lg:left-20 lg:translate-x-[-50%] z-50">
      <div className="lg:w-15 mx-auto bg-white flex lg:flex-col justify-center items-center gap-15 shadow-lg border border-gray-300/50 rounded-full lg:px-2 lg:py-8 bg-white relative py-4 px-10">
        {/* アニメーション背景 */}
        {activeIndex >= 0 && !isMobile && (
          <div
            className="absolute bottom-0 left-0 w-10 h-10 bg-gray-200 rounded-full transition-transform duration-300 ease-in-out z-0"
            style={{
              transform: isMobile
                ? `translateX(${14 + activeIndex * 60}px)`
                : `translateY(${22 + activeIndex * 60}px)`,
              top: isMobile ? '50%' : '0',
              left: isMobile ? '0' : '50%',
              marginTop: isMobile ? '-20px' : '0',
              marginLeft: isMobile ? '0' : '-20px',
            }}
          />
        )}

        {/* ナビゲーションアイコン */}
        {NAVIGATION_ITEMS.map((item) => (
          <Image
            key={item.path}
            src={item.icon}
            alt={item.alt}
            width={20}
            height={20}
            className="cursor-pointer hover:opacity-60"
            onClick={() => handleIconClick(item.path)}
          />
        ))}

        {/* ログアウトアイコン */}
        <Image
          src={logoutIcon}
          alt="logout"
          width={20}
          height={20}
          className="cursor-pointer hover:opacity-60"
          onClick={handleClickLogout}
        />
      </div>
    </nav>
  );
}

export default Navigation;
