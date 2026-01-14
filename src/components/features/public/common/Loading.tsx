'use client';

import Image from 'next/image';
import tofuIcon from '@/assets/images/tofu-icon.png';
import { motion } from 'framer-motion';

function Loading() {
  return (
    <div className="h-screen w-screen bg-public-main absolute top-0 left-0 flex justify-center items-center flex-col">
      <motion.div
        className="w-20 h-20 relative"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Image src={tofuIcon} alt="tofu icon" fill className="object-contain" />
      </motion.div>
      <motion.p
        className="text-2xl font-logo font-semibold"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
}

export default Loading;
