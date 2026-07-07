'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface HamburgerMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

function HamburgerMenu({ onClick, isOpen }: HamburgerMenuProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        onClick={onClick}
        className="w-full h-full relative flex items-center justify-center"
      >
        <motion.div
          className="absolute inset-0 flex flex-col py-3 px-2 justify-between items-center"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="w-full h-0.5 bg-black"></span>
          <span className="w-full h-0.5 bg-black"></span>
          <span className="w-full h-0.5 bg-black"></span>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="absolute w-2/3 h-0.5 bg-black rotate-45"></span>
          <span className="absolute w-2/3 h-0.5 bg-black -rotate-45"></span>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="w-full h-full flex flex-col py-3 px-2 justify-between items-center"
    >
      <motion.span
        className="w-full h-0.5 bg-black"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 11 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
      ></motion.span>
      <motion.span
        className="w-full h-0.5 bg-black"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
      ></motion.span>
      <motion.span
        className="w-full h-0.5 bg-black"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -11 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
      ></motion.span>
    </div>
  );
}

export default HamburgerMenu;
