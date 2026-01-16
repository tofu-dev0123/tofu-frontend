import Image from 'next/image';
import tofuIcon from '@/assets/images/tofu-icon.png';

function Profile() {
  return (
    <div className="w-full flex justify-start items-center my-10 gap-4">
      <div className="w-16 h-16 bg-white p-2 overflow-hidden">
        <Image
          src={tofuIcon}
          alt="tofu"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-lg tracking-[0.02em] font-bold">Tofu</p>
        <p className="text-sm tracking-[0.02em] text-gray-500">
          Web Developer / Software Engineer
        </p>
      </div>
    </div>
  );
}

export default Profile;
