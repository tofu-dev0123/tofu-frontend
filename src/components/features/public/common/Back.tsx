'use client';

import Image from 'next/image';
import backIcon from '@/assets/images/back-icon.png';
import { useRouter } from 'next/navigation';
import Tooltip from '@/components/features/public/common/Tooltip';

function Back({ href }: { href: string }) {
  const router = useRouter();

  return (
    <div className="w-full h-10 flex justify-start items-center mb-4">
      <Tooltip content="一覧画面に戻る" placement="bottom">
        <button
          onClick={() => router.push(href)}
          className="opacity-50 hover:cursor-pointer hover:opacity-100 duration-200"
        >
          <Image src={backIcon} alt="back" width={16} height={16} />
        </button>
      </Tooltip>
    </div>
  );
}

export default Back;
