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
    const trimmed = keyword.trim();
    if (!trimmed) return;
    const params = new URLSearchParams({ keyword: trimmed });
    router.push(`/blogs?${params.toString()}`);
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
          <button
            type="button"
            aria-label="検索"
            className="ml-2 flex items-center"
            onClick={handleSearch}
          >
            <Image
              src={searchIcon}
              alt=""
              width={14}
              height={14}
              className="opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300"
            />
          </button>
          <input
            type="text"
            placeholder="Search"
            aria-label="記事を検索"
            className="h-full flex-1 text-sm outline-none border-none"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </motion.div>
        <button
          type="button"
          aria-label={isOpen ? '検索を閉じる' : '検索を開く'}
          aria-expanded={isOpen}
          className="w-5 h-5 flex items-center justify-center m-2"
          onClick={handleClick}
        >
          <Image
            src={isOpen ? cancelIcon : searchIcon}
            alt=""
            width={14}
            height={14}
            className="opacity-50 hover:opacity-100 cursor-pointer transition-all duration-300"
          />
        </button>
      </motion.div>
    </div>
  );
}
