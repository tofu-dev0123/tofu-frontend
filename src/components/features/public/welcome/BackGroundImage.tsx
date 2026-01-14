import Image from 'next/image';
import tofuIconImage from '@/assets/images/tofu-icon.png';

function BackGroundImage() {
  return (
    <div className="w-full lg:flex-1 h-full opacity-5 lg:-translate-x-[10%] ">
      <div className="w-full h-full relative lg:scale-100 scale-125">
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
