'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import logoutIcon from '@/assets/images/logout-icon.png';
import useHeader from '@/hooks/admin/common/useHeader';
import {
  NAVIGATION_ITEMS,
  getActiveIndex,
} from '@/constants/admin/navigationItem';
interface NavigationProps {
  loginFlag: boolean;
  handleClickLogout?: () => void;
  keyword?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch?: () => void;
}

function Navigation({ loginFlag = false, handleClickLogout }: NavigationProps) {
  const { handleClickLogo } = useHeader();
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = getActiveIndex(pathname);

  // アイコンクリックハンドラー
  const handleIconClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="w-full h-full py-2 flex flex-col justify-start items-center">
      {/* ロゴ */}
      <div className="flex items-center cursor-pointer gap-4">
        <span
          className="text-2xl font-bold cursor-pointer"
          onClick={handleClickLogo}
        >
          Tofu Blog
        </span>
      </div>

      {/* 検索バー */}
      {/* <div className="flex items-center w-full px-4">
        <InputGroup className="rounded-full">
          <InputGroupInput
            placeholder="Search..."
            value={keyword}
            onChange={handleInputChange}
          />
          <InputGroupAddon className="rounded-full" onClick={handleSearch}>
            <SearchIcon className="cursor-pointer" />
          </InputGroupAddon>
        </InputGroup>
      </div> */}

      {/* ナビゲーションアイコン */}
      <div className="flex flex-1 justify-center items-center w-full">
        {loginFlag && (
          <div className="w-15 mx-auto flex flex-col justify-center items-center gap-10 border border-gray-300/50 rounded-full px-2 py-8 bg-white relative">
            {/* アニメーション背景 */}
            {activeIndex >= 0 && (
              <div
                className="absolute top-0 left-0 w-10 h-10 bg-gray-200 rounded-full transition-transform duration-300 ease-in-out z-0"
                style={{
                  transform: `translateY(${22 + activeIndex * 60}px)`,
                  left: '50%',
                  marginLeft: '-20px',
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
        )}
      </div>
    </nav>
  );
}

export default Navigation;
