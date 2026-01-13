import Link from 'next/link';

function FeatureLinks() {
  return (
    <div className="flex gap-5">
      <button className="lg:w-40 lg:h-8 rounded-none font-sub-logo lg:text-md text-sm text-public-main bg-black font-semibold z-10 hover:bg-black/80 hover:cursor-pointer transition-all duration-300">
        <Link href="/blog">View Blog</Link>
      </button>
      <button className="lg:w-40 lg:h-8 rounded-none font-sub-logo lg:text- text-sm bg-public-main border-1 border-black font-semibold z-10 hover:bg-black/10 hover:cursor-pointer transition-all duration-300">
        <Link href="/products">View Products</Link>
      </button>
    </div>
  );
}

export default FeatureLinks;
