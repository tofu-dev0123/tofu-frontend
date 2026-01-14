import BackGroundImage from '@/components/features/public/common/BackGroundImage';
import Logo from '@/components/features/public/common/Logo';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col relative">
      <div className="w-1/2 h-[70%] absolute top-1/2 left-1/2 -translate-y-1/2">
        <BackGroundImage />
      </div>
      <header className="w-full h-15 lg:mt-30">
        <div className="lg:pl-[10%] flex lg:items-end items-center justify-start lg:ml-0 ml-2">
          <Logo />
        </div>
      </header>
      <div className="w-1/2 flex flex-col items-start justify-center lg:mr-0 mr-2 translate-y-[90px] lg:pl-[10%]">
        <p className="text-lg font-sub-logo font-semibold">
          ただいまメンテナンス中です...
        </p>
        <div className="flex justify-center items-start mt-10">
          <button className="text-lg font-sub-logo font-semibold border-2 bg-black text-white px-4 py-2 hover:bg-white hover:text-black transition-all duration-300">
            <Link href="/">Topに戻る</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
