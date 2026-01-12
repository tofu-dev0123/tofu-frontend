import Image from 'next/image';
import logoImage from '@/assets/images/tofu-logo.png';

function Logo() {
  return (
    <div className="absolute top-0 left-0 w-40 h-15 z-5 relative">
      <Image src={logoImage} alt="logo" fill className="object-contain" />
    </div>
  );
}

export default Logo;
