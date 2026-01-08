'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import logoutIcon from '@/assets/images/logout-icon.png';
import homeGrayIcon from '@/assets/images/home-gray-icon.png';
import listIcon from '@/assets/images/list-icon.png';
import addIcon from '@/assets/images/add-icon.png';
import useHeader from '@/hooks/admin/common/useHeader';

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

  // ナビゲーションアイコンの定義
  const navigationItems = [
    {
      icon: homeGrayIcon,
      alt: 'home',
      path: '/admin/home',
    },
    {
      icon: listIcon,
      alt: 'list',
      path: '/admin/posts',
    },
    {
      icon: addIcon,
      alt: 'add',
      path: '/admin/posts/new',
    },
  ];

  // アクティブなアイコンのインデックスを計算
  const getActiveIndex = (): number => {
    if (pathname === '/admin/home') {
      return 0;
    }
    if (pathname === '/admin/posts/new') {
      return 2;
    }
    if (pathname.startsWith('/admin/posts')) {
      return 1;
    }
    return -1; // アクティブなアイコンがない場合
  };

  const activeIndex = getActiveIndex();

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
            {navigationItems.map((item, index) => (
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
