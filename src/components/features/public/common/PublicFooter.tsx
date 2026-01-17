import Image from 'next/image';
import tofuIcon from '@/assets/images/tofu-icon.png';

function PublicFooter() {
  return (
    <footer className="w-full lg:h-10 h-30 bg-public-main flex lg:flex-row flex-col justify-center items-center lg:mt-10 lg:gap-10 gap-5">
      <div className="w-full lg:w-auto">
        <Image src={tofuIcon} alt="Tofu" width={30} height={30} />
      </div>
      <div className="w-full lg:w-auto flex flex-col lg:flex-row gap-1 justify-center items-start">
        <p className="lg:text-sm text-xs font-sub-logo tracking-[0.05em]">
          &copy; {new Date().getFullYear()} Tofu.
        </p>
        <p className="lg:text-sm text-xs font-sub-logo tracking-[0.05em]">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default PublicFooter;
