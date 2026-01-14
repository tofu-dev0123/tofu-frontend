import Link from 'next/link';
import { motion } from 'framer-motion';

function FeatureLinks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="flex gap-5 lg:pl-0 pl-4 lg:mt-0 mt-10"
    >
      <button className="lg:w-40 w-32 lg:h-8 h-10 rounded-none font-sub-logo lg:text-md text-sm text-public-main bg-black font-semibold z-10 hover:bg-black/80 hover:cursor-pointer transition-all duration-300">
        <Link href="/blogs">View Blog</Link>
      </button>
      <button className="lg:w-40 w-32 lg:h-8 h-10 rounded-none font-sub-logo lg:text- text-sm bg-public-main border-1 border-black font-semibold z-10 hover:bg-black/10 hover:cursor-pointer transition-all duration-300">
        <Link href="/products">View Products</Link>
      </button>
    </motion.div>
  );
}

export default FeatureLinks;
