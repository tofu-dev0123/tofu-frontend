'use client';

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
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

function Navigation({
  loginFlag = false,
  handleClickLogout,
  keyword,
  handleInputChange,
  handleSearch,
}: NavigationProps) {
  const { handleClickLogo } = useHeader();

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
          <div className="w-15 mx-auto flex flex-col justify-center items-center gap-10 border border-gray-300/50 rounded-full px-2 py-8 bg-white">
            <Image
              src={homeGrayIcon}
              alt="home"
              width={20}
              height={20}
              className="cursor-pointer hover:opacity-60 duration-200"
            />
            <Image
              src={listIcon}
              alt="list"
              width={20}
              height={20}
              className="cursor-pointer hover:opacity-60 duration-200"
            />
            <Image
              src={addIcon}
              alt="add"
              width={20}
              height={20}
              className="cursor-pointer hover:opacity-60 duration-200"
            />

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
