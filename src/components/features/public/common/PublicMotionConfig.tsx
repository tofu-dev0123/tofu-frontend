'use client';

import { MotionConfig } from 'framer-motion';

function PublicMotionConfig({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default PublicMotionConfig;
