'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import logoutIcon from '@/assets/images/logout-icon.png';
import useHeader from '@/hooks/admin/common/useHeader';
import {
  NAVIGATION_ITEMS,
  getActiveIndex,
} from '@/constants/admin/navigationItem';
import { DISPLAY_SIZE } from '@/constants/admin/displaySize';
interface NavigationProps {
  handleClickLogout?: () => void;
  keyword?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch?: () => void;
}

function Navigation({ handleClickLogout }: NavigationProps) {
  const { handleClickLogo } = useHeader();
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = getActiveIndex(pathname);

  // アイコンクリックハンドラー
  const handleIconClick = (path: string) => {
    router.push(path);
  };

  const isMobile = window.innerWidth < DISPLAY_SIZE.MOBILE;

  return (
    <nav className="w-full h-full py-2 flex lg:flex-col justify-start items-center">
      {/* ロゴ */}
      <div className="flex items-center cursor-pointer gap-4 p-2">
        <span
          className="text-2xl font-bold cursor-pointer"
          onClick={handleClickLogo}
        >
          Tofu Blog
        </span>
      </div>

      {/* ナビゲーションアイコン */}
      <div className="flex flex-1 justify-center items-center w-full p-2">
        <div className="lg:w-15 mx-auto flex lg:flex-col justify-center items-center gap-10 shadow-lg border border-gray-300/50 rounded-full lg:px-2 lg:py-8 bg-white relative px-6 py-4">
          {/* アニメーション背景 */}
          {activeIndex >= 0 && (
            <div
              className="absolute top-0 left-0 w-10 h-10 bg-gray-200 rounded-full transition-transform duration-300 ease-in-out z-0"
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
              className="cursor-pointer hover:opacity-60 duration-200 z-10"
              onClick={() => handleIconClick(item.path)}
            />
          ))}

          {/* ログアウトアイコン */}
          <Image
            src={logoutIcon}
            alt="logout"
            width={20}
            height={20}
            className="cursor-pointer hover:opacity-60 duration-200"
            onClick={handleClickLogout}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
