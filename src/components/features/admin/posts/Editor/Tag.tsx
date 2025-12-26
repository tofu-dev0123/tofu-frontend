'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import addGreyIcon from '@/assets/images/add-grey-icon.png';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';

function Tag() {
  const { state, actions } = usePostEditor();
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim()) {
      actions.addTag(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <>
      <div className="w-full min-h-10 flex">
        <button
          onClick={handleAddTag}
          className="w-10 h-10 hover:cursor-pointer hover:opacity-60 duration-200 flex items-center justify-center"
        >
          <Image src={addGreyIcon} alt="add grey icon" width={20} height={20} />
        </button>
        <input
          type="text"
          placeholder="タグの追加"
          size={50}
          className="border-none focus:outline-none focus:ring-0 text-md font-bold placeholder:text-gray-400 resize-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="w-150 flex items-center justify-start flex-wrap gap-4">
        {state.tags.map((tag) => (
          <div
            key={tag}
            className="px-4 py-1 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50"
            onClick={() => actions.removeTag(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </>
  );
}

export default Tag;
