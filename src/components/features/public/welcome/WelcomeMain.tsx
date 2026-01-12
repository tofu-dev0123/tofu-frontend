'use client';

import Image from 'next/image';
import tofuIconImage from '@/assets/images/tofu-icon.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function WelcomeMain() {
  const [isStart, setIsStart] = useState(false);

  const handleStart = () => {
    setIsStart(true);
  };

  return (
    <AnimatePresence>
      {!isStart && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          animate={{ opacity: 1 }}
          className="h-screen w-full relative overflow-hidden"
        >
          <div className="h-full w-full flex ">
            <div className="h-full w-1/2 flex flex-col justify-center">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 3.5 }}
                  className="font-grotesk font-bold text-xl tracking-wider mr-10 pl-20 text-right "
                >
                  Welcome to
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 2, delay: 1 }}
                  className="mr-10 font-logo text-[140px] font-bold text-right leading-none pb-10"
                >
                  Tofu blog
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 3.5 }}
                  className="font-grotesk font-bold text-xl tracking-wider mr-10 pl-20 text-right"
                >
                  develop and learning and growing
                </motion.p>
              </div>
              <div className="w-full flex justify-end items-center pr-10 mt-40 z-10">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 3.5 }}
                  className="rounded-none text-public-main border-2 bg-black font-grotesk p-2 font-bold hover:cursor-pointer hover:bg-public-main hover:text-black transition-all duration-300"
                  onClick={handleStart}
                >
                  Start reading
                </motion.button>
              </div>
            </div>
            <div className="h-full w-1/2 relative">
              <motion.div className="absolute top-0 left-0 translate-x-[-5%] w-full h-full scale-140">
                <Image
                  src={tofuIconImage}
                  alt="welcome"
                  fill
                  className="opacity-10 object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WelcomeMain;
