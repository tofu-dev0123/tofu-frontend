import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function PostTitle() {
  return (
    <div className="w-full min-h-20 flex items-center justify-center">
      <TextareaAutosize
        minRows={1}
        placeholder="タイトル"
        className="w-full text-4xl font-bold border-none focus:outline-none resize-none placeholder:text-gray-400"
      />
    </div>
  );
}

export default PostTitle;
