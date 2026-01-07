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

interface HeaderProps {
  loginFlag: boolean;
  handleClickMenu?: () => void;
  handleClickLogout?: () => void;
  keyword?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch?: () => void;
}

function Header({
  loginFlag = false,
  handleClickMenu,
  handleClickLogout,
  keyword,
  handleInputChange,
  handleSearch,
}: HeaderProps) {
  const { handleClickLogo } = useHeader();

  return (
    <header className="w-full h-20 py-2">
      <div className="h-full flex justify-between items-center px-4">
        <div className="flex items-center cursor-pointer gap-4">
          <span
            className="text-2xl font-bold cursor-pointer"
            onClick={handleClickLogo}
          >
            Tofu Blog
          </span>
        </div>
        {loginFlag && (
          <div className="flex items-center gap-4 h-full border border-gray-300/50 rounded-full p-2">
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
            <div className="flex items-center">
              <InputGroup className="rounded-full">
                <InputGroupInput
                  placeholder="Search..."
                  value={keyword}
                  onChange={handleInputChange}
                />
                <InputGroupAddon
                  className="rounded-full"
                  onClick={handleSearch}
                >
                  <SearchIcon className="cursor-pointer" />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        )}
        {loginFlag && (
          <div className="flex items-center">
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
    </header>
  );
}

export default Header;
