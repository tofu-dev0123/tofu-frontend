import Image from 'next/image';
import logoImage from '@/assets/images/tofu-logo.png';

function Logo() {
  return (
    <div className="lg:w-40 w-20 lg:h-15 h-10 relative">
      <Image src={logoImage} alt="logo" fill className="object-contain" />
    </div>
  );
}

export default Logo;
