import Image from 'next/image';
import tofuIconImage from '@/assets/images/tofu-icon.png';

function BackGroundImage() {
  return (
    <div className="w-full flex-1 opacity-5 -translate-x-[10%] ">
      <div className="w-full h-full relative">
        <Image
          src={tofuIconImage}
          alt="tofu icon"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default BackGroundImage;
