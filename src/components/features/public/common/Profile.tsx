import Image from 'next/image';
import tofuIcon from '@/assets/images/tofu-icon.png';
import Link from 'next/link';

interface ProfileProps {
  aboutType?: boolean;
  headline?: string;
}

function Profile({
  aboutType = false,
  headline = 'Web Developer / Software Engineer',
}: ProfileProps) {
  return (
    <div className="w-full flex justify-start items-center my-5 lg:my-10 gap-4">
      <div
        className={`bg-white p-2 overflow-hidden ${aboutType ? 'w-32 h-32' : 'w-16 h-16'}`}
      >
        <Link href="/">
          <Image
            src={tofuIcon}
            alt="tofu"
            width={aboutType ? 128 : 48}
            height={aboutType ? 128 : 48}
            className="object-contain"
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <p
          className={`tracking-[0.02em] font-bold ${aboutType ? 'text-4xl' : 'text-lg'}`}
        >
          Tofu
        </p>
        <p className="text-sm tracking-[0.02em] text-gray-500">{headline}</p>
      </div>
    </div>
  );
}

export default Profile;
