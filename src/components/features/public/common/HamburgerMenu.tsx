import { motion } from 'framer-motion';

interface HamburgerMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

function HamburgerMenu({ onClick, isOpen }: HamburgerMenuProps) {
  return (
    <div
      onClick={onClick}
      className="w-full h-full flex flex-col py-3 px-2 justify-between items-center"
    >
      <motion.span
        className={`w-full h-0.5`}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 11 : 0,
          backgroundColor: isOpen ? '#f6efdb' : '#000000',
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
      ></motion.span>
      <motion.span
        className={`w-full h-0.5`}
        animate={{
          opacity: isOpen ? 0 : 1,
          backgroundColor: isOpen ? '#f6efdb' : '#000000',
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
      ></motion.span>
      <motion.span
        className={`w-full h-0.5`}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -11 : 0,
          backgroundColor: isOpen ? '#f6efdb' : '#000000',
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
      ></motion.span>
    </div>
  );
}

export default HamburgerMenu;
