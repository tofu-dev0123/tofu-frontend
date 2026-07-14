'use client';

import { motion } from 'framer-motion';
import Profile from '@/components/features/public/common/Profile';
import Background from '@/components/features/public/about/Background';
import AboutMe from '@/components/features/public/about/AboutMe';
import type { AboutProfile, AboutTimeline } from '@/types/api/public/about';

type Props = {
  profile: AboutProfile;
  timelines: AboutTimeline[];
};

function AboutMain({ profile, timelines }: Props) {
  return (
    <motion.div
      className="h-full w-full px-2 relative pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Profile aboutType={true} headline={profile.headline} />
      <AboutMe bio={profile.bio} siteDescription={profile.site_description} />
      <Background timelines={timelines} />
    </motion.div>
  );
}

export default AboutMain;
