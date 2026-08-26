import Image from 'next/image';
import Link from 'next/link';

const SHELFIE_URL = 'https://shelfie.jp/users/tofu0123';

function BooksMain() {
  return (
    <div className="w-full flex flex-col items-center justify-center lg:mb-[40vh]">
      <h1 className="text-2xl lg:text-4xl font-bold text-center font-sub-logo">
        Books
      </h1>
      <Link
        href={SHELFIE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="my-12 opacity-85 hover:opacity-100 transition-opacity duration-300"
      >
        {/* 影とデバイスフレームは画像に焼き込み済み */}
        <Image
          src="/books/shelfie-desktop.webp"
          alt="Shelfie の公開本棚"
          width={1200}
          height={660}
          unoptimized
          className="hidden lg:block w-140 h-auto"
        />
        <Image
          src="/books/shelfie-mobile.webp"
          alt="Shelfie の公開本棚"
          width={800}
          height={1500}
          unoptimized
          className="lg:hidden w-65 h-auto"
        />
        <p className="mt-3 text-center lg:text-lg font-sub-logo tracking-[0.02em]">
          Shelfie
          <span className="ml-1 text-xs align-text-top text-gray-500">↗</span>
        </p>
      </Link>
      <p className="text-[0.6rem] lg:text-xs font-sub-logo tracking-[0.02em]">
        読書記録は Shelfie の公開本棚で公開しています。
      </p>
    </div>
  );
}

export default BooksMain;
