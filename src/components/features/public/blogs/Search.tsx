'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import searchIcon from '@/assets/images/search-icon.png';
import cancelIcon from '@/assets/images/cancel-icon.png';

interface SearchProps {
  handleSearch: (value: string) => void;
}

export default function Search({ handleSearch }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-10">
      <motion.div
        animate={{ width: isOpen ? 300 : 40 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="h-full rounded-full border border-black/10 flex items-center justify-end"
      >
        <motion.div
          className="w-full items-center justify-start gap-2"
          animate={{
            opacity: isOpen ? 1 : 0,
            width: isOpen ? 260 : 0,
            display: isOpen ? 'flex' : 'none',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Image
            src={searchIcon}
            alt="cancel"
            width={14}
            height={14}
            className="opacity-50 ml-2 hover:opacity-100 cursor-pointer transition-all duration-300"
            onClick={() => handleSearch('')}
          />
          <input
            type="text"
            placeholder="Search"
            className="h-full flex-1 text-sm outline-none border-none"
          />
        </motion.div>
        <div
          className="w-5 h-5 flex items-center justify-center m-2"
          onClick={handleClick}
        >
          <Image
            src={isOpen ? cancelIcon : searchIcon}
            alt="search"
            width={14}
            height={14}
            className="opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300"
          />
        </div>
      </motion.div>
    </div>
  );
}
