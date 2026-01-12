'use client';

import Logo from '@/components/features/public/common/Logo';
import { motion } from 'framer-motion';

function PublicHeader() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 3.5 }}
    >
      <Logo />
    </motion.div>
  );
}

export default PublicHeader;
