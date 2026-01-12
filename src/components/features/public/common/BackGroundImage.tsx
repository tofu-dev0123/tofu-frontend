import Image from 'next/image';
import tofuIconImage from '@/assets/images/tofu-icon.png';

function BackGroundImage() {
  return (
    <div className="w-full h-screen py-10 opacity-5 fixed lg:left-1/2 lg:-translate-x-1/3">
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
