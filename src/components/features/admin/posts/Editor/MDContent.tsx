'use client';

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MDContent() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="w-full h-full py-10">
        <TextareaAutosize
          minRows={20}
          placeholder="本文"
          className="w-full h-full text-md font-bold border-none focus:outline-none resize-none placeholder:text-gray-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="w-full h-full py-10">
        <article className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </article>
      </div>
    </>
  );
}

export default MDContent;
