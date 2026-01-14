import Logo from '@/components/features/public/common/Logo';
import BackGroundImage from '@/components/features/public/common/BackGroundImage';
import Link from 'next/link';

export default function NotFound() {
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
        <p className="lg:text-[110px] text-[80px] font-sub-logo font-semibold lg:translate-y-[30px] translate-y-[20px]">
          404
        </p>
        <p className="lg:text-lg text-md font-sub-logo font-semibold">
          お探しのページが見つかりませんでした。
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
