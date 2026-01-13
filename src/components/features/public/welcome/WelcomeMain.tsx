'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import BackGroundImage from '@/components/features/public/welcome/BackGroundImage';
import FeatureLinks from '@/components/features/public/welcome/FeatureLinks';

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
          className="h-full w-full relative overflow-hidden"
        >
          <div className="h-[80%] w-full lg:flex ">
            <div className="h-full lg:w-1/2 w-full flex flex-col justify-center">
              <div className="h-full pl-[20%] flex flex-col justify-between">
                <div className="mt-[20%]">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="font-logo lg:text-[250px] text-[90px] font-bold leading-none inline-block translate-y-[0.125em]"
                  >
                    Tofu
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 3.5 }}
                    className="font-sub-logo font-semibold lg:text-lg text-sm tracking-[0.3em]"
                  >
                    Web Developer / Software Engineer
                  </motion.p>
                </div>
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 3.5 }}
                    className="font-sub-logo lg:text-lg text-sm font-semibold tracking-[0.3em]"
                  >
                    Tofuの個人サイトです。
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 3.5 }}
                    className="font-sub-logo lg:text-lg text-sm font-semibold tracking-[0.3em]"
                  >
                    ブログ発信や技術書・個人プロダクトの紹介をしています。
                  </motion.p>
                </div>
              </div>
            </div>
            <div className="h-full lg:w-1/2 w-full relative flex flex-col justify-end">
              <BackGroundImage />
              <FeatureLinks />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WelcomeMain;
