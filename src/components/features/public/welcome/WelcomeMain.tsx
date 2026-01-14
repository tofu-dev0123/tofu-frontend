'use client';

import { motion, AnimatePresence } from 'framer-motion';
import BackGroundImage from '@/components/features/public/welcome/BackGroundImage';
import FeatureLinks from '@/components/features/public/welcome/FeatureLinks';
import useIsMobile from '@/hooks/public/common/useIsMobile';

function WelcomeMain() {
  const isStart = false;

  const isMobile = useIsMobile();

  return (
    <AnimatePresence>
      {!isStart && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          animate={{ opacity: 1 }}
          className="h-full w-full relative overflow-hidden"
        >
          {isMobile && (
            <div className="h-full w-full absolute top-0 left-0">
              <BackGroundImage />
            </div>
          )}
          <div className="lg:h-[80%] h-full w-full lg:flex ">
            <div className="lg:h-full h-[70%] lg:w-1/2 w-full flex flex-col justify-center">
              <div className="h-full lg:pl-[20%] pl-4 flex flex-col justify-between">
                <div className="mt-[20%]">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="font-logo lg:text-[250px] text-[180px] font-bold leading-none inline-block translate-y-[0.125em]"
                  >
                    Tofu
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 3.5 }}
                    className="font-sub-logo font-semibold lg:text-lg text-sm lg:tracking-[0.3em] tracking-[0.24em]"
                  >
                    Web Developer / Software Engineer
                  </motion.p>
                </div>
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 3.5 }}
                    className="font-sub-logo lg:text-lg text-sm font-semibold lg:tracking-[0.3em] tracking-[0.24em]"
                  >
                    Tofuの個人サイトです。
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 3.5 }}
                    className="font-sub-logo lg:text-lg text-sm font-semibold lg:tracking-[0.3em] tracking-[0.24em]"
                  >
                    ブログ発信や技術書・個人プロダクトの紹介をしています。
                  </motion.p>
                </div>
              </div>
            </div>
            <div className="lg:h-full lg:w-1/2 w-full relative flex flex-col justify-end relative">
              {!isMobile && <BackGroundImage />}
              <FeatureLinks />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WelcomeMain;
