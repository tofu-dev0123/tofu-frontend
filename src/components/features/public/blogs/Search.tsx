'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import searchIcon from '@/assets/images/search-icon.png';
import cancelIcon from '@/assets/images/cancel-icon.png';
import { useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/blogs?keyword=${keyword}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-10">
      <motion.div
        initial={{ width: 40 }}
        animate={{ width: isOpen ? 300 : 40 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="h-full rounded-full border border-black/10 flex items-center justify-end"
      >
        <motion.div
          className="w-full items-center justify-start gap-2"
          initial={{
            opacity: 0,
            width: 0,
            display: 'none',
          }}
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
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder="Search"
            className="h-full flex-1 text-sm outline-none border-none"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
