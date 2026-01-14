import Image from 'next/image';
import logoImage from '@/assets/images/tofu-logo.png';
import Link from 'next/link';

function Logo() {
  return (
    <div className="lg:w-40 w-20 lg:h-15 h-10 relative">
      <Link href="/">
        <Image src={logoImage} alt="logo" fill className="object-contain" />
      </Link>
    </div>
  );
}

export default Logo;
