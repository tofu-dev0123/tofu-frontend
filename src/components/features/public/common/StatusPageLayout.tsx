'use client';

import React from 'react';
import BackGroundImage from '@/components/features/public/common/BackGroundImage';
import Logo from '@/components/features/public/common/Logo';
import { useRouter } from 'next/navigation';

interface StatusPageLayoutProps {
  children: React.ReactNode;
  buttonText: string;
  buttonLink?: string;
  onClick?: () => void;
}

function StatusPageLayout({
  children,
  buttonText,
  buttonLink,
  onClick,
}: StatusPageLayoutProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (buttonLink) {
      router.push(buttonLink);
    } else {
      router.push('/');
    }
  };
  return (
    <div className="w-full h-screen flex flex-col relative">
      <div className="lg:w-1/2 w-full h-[70%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:translate-x-0">
        <BackGroundImage />
      </div>
      <header className="w-full h-15 lg:mt-30">
        <div className="h-full lg:pl-[10%] flex lg:items-end items-center justify-start lg:ml-0 ml-2">
          <Logo />
        </div>
      </header>
      <div className="lg:w-1/2 w-full flex flex-col items-start justify-center lg:mr-0 mr-2 translate-y-[90px] lg:pl-[10%] pl-4">
        {children}
        <div className="flex justify-center items-start mt-10">
          <button
            onClick={handleClick}
            className="text-lg font-sub-logo font-semibold border-2 bg-black text-white px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatusPageLayout;
