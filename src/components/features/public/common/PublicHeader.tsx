'use client';

import Logo from '@/components/features/public/common/Logo';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

function PublicHeader() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 3.5 }}
    >
      <div className="w-1/2 h-full lg:pl-[10%] flex items-end justify-start">
        <Logo />
      </div>
      <div className="w-1/2 h-full flex items-end justify-start">
        <Navigation />
      </div>
    </motion.div>
  );
}

export default PublicHeader;
