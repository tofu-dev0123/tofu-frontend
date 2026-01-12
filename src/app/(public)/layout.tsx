import React from 'react';
import Image from 'next/image';
import tofuIconImage from '@/assets/images/tofu-icon.png';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-public-main">
      <div className="w-full h-full opacity-5 fixed lg:left-1/2 lg:-translate-x-1/3">
        <Image
          src={tofuIconImage}
          alt="tofu icon"
          fill
          className="lg:object-contain object-cover"
        />
      </div>
      {children}
    </div>
  );
}

export default PublicLayout;
