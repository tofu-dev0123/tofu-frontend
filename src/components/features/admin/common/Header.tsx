'use client';

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import logoutIcon from '@/assets/images/logout-icon.png';
import menuIcon from '@/assets/images/menu-icon.png';
import useHeader from '@/hooks/admin/common/useHeader';

interface HeaderProps {
  loginFlag: boolean;
}

function Header({ loginFlag = false }: HeaderProps) {
  const { handleClickLogo, handleClickMenu } = useHeader();

  return (
    <header className="w-full h-16 bg-white">
      <div className="h-full flex justify-between items-center px-4">
        <div
          className="flex items-center cursor-pointer gap-4"
          onClick={handleClickLogo}
        >
          <span className="text-2xl font-bold">Tofu Blog</span>
          {loginFlag && (
            <div className="flex items-center" onClick={handleClickMenu}>
              <img
                src={menuIcon.src}
                alt="menu"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
        {loginFlag && (
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <InputGroup className="rounded-full">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon
                  className="rounded-full"
                  onClick={() => console.log('click')}
                >
                  <SearchIcon className="cursor-pointer" />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div
              className="flex items-center"
              onClick={() => console.log('click')}
            >
              <img src={logoutIcon.src} alt="logout" width={20} height={20} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
