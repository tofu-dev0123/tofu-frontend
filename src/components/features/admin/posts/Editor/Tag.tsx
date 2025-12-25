import React from 'react';
import Image from 'next/image';
import addGreyIcon from '@/assets/images/add-grey-icon.png';

interface TagProps {
  onAddTag: (tag: string) => void;
  tags: string[];
}

function Tag({ onAddTag, tags = ['test', 'test2', 'test3'] }: TagProps) {
  return (
    <>
      <div className="w-full min-h-10 flex">
        <button
          onClick={() => onAddTag('')}
          className="w-10 h-10 hover:cursor-pointer hover:opacity-60 duration-200 flex items-center justify-center"
        >
          <Image src={addGreyIcon} alt="add grey icon" width={20} height={20} />
        </button>
        <input
          type="text"
          placeholder="タグの追加"
          size={50}
          className="border-none focus:outline-none focus:ring-0 text-md font-bold placeholder:text-gray-400 resize-none"
        />
      </div>
      <div className="w-150 flex items-center justify-start flex-wrap gap-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-4 py-1 rounded-md border border-gray-200"
          >
            {tag}
          </div>
        ))}
      </div>
    </>
  );
}

export default Tag;
