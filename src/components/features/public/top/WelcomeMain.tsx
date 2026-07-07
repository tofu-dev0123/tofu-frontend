'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import BackGroundImage from '@/components/features/public/common/BackGroundImage';
import FeatureLinks from '@/components/features/public/top/FeatureLinks';
import useIsMobile from '@/hooks/public/common/useIsMobile';
import { hasStartedSession } from '@/lib/publicSession';

function WelcomeMain() {
  const isMobile = useIsMobile();
  const [isInitialVisit] = useState(() => !hasStartedSession());

  const webDevTransition = {
    duration: isInitialVisit ? 1.2 : 0,
    delay: isInitialVisit ? 0.3 : 0,
  };
  const restTransition = {
    duration: isInitialVisit ? 1.0 : 0,
    delay: isInitialVisit ? 1.5 : 0,
  };
  const initialOpacity = { opacity: isInitialVisit ? 0 : 1 };
  const animateOpacity = { opacity: 1 };

  return (
    <div className="h-full w-full relative overflow-hidden">
      {isMobile && (
        <motion.div
          className="h-full w-full absolute top-0 left-0"
          initial={initialOpacity}
          animate={animateOpacity}
          transition={restTransition}
        >
          <BackGroundImage />
        </motion.div>
      )}
      <div className="lg:h-[80%] h-full w-full lg:flex ">
        <div className="lg:h-full h-[70%] lg:w-1/2 w-full flex flex-col justify-center">
          <div className="h-full lg:pl-[20%] pl-4 flex flex-col justify-between">
            <div className="mt-[20%]">
              <h1 className="font-logo lg:text-[250px] text-[150px] font-bold leading-none inline-block translate-y-[0.125em]">
                Tofu
              </h1>
              <motion.p
                initial={initialOpacity}
                animate={animateOpacity}
                transition={webDevTransition}
                className="font-sub-logo font-semibold lg:text-lg text-xs lg:tracking-[0.3em] tracking-[0.22em]"
              >
                Web Developer / Software Engineer
              </motion.p>
            </div>
            <div>
              <motion.p
                initial={initialOpacity}
                animate={animateOpacity}
                transition={restTransition}
                className="font-sub-logo lg:text-lg text-xs font-semibold lg:tracking-[0.3em] tracking-[0.22em]"
              >
                Tofuの個人サイトです。
              </motion.p>
              <motion.p
                initial={initialOpacity}
                animate={animateOpacity}
                transition={restTransition}
                className="font-sub-logo lg:text-lg text-xs font-semibold lg:tracking-[0.3em] tracking-[0.22em]"
              >
                ブログ発信や技術書・個人プロダクトの紹介をしています。
              </motion.p>
            </div>
          </div>
        </div>
        <motion.div
          className="lg:h-full lg:w-1/2 w-full relative flex flex-col justify-end relative"
          initial={initialOpacity}
          animate={animateOpacity}
          transition={restTransition}
        >
          {!isMobile && <BackGroundImage />}
          <FeatureLinks />
        </motion.div>
      </div>
    </div>
  );
}

export default WelcomeMain;
