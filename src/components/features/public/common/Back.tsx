'use client';

import Image from 'next/image';
import backIcon from '@/assets/images/back-icon.png';
import { useRouter } from 'next/navigation';

function Back({ href }: { href: string }) {
  const router = useRouter();

  return (
    <div className="w-full h-10 flex justify-start items-center mb-4">
      <button
        onClick={() => router.push(href)}
        className="opacity-50 hover:cursor-pointer hover:opacity-100 duration-200"
      >
        <Image src={backIcon} alt="back" width={16} height={16} />
      </button>
    </div>
  );
}

export default Back;
