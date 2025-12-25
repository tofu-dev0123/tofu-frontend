import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function Content() {
  return (
    <div className="w-full h-full py-10">
      <TextareaAutosize
        minRows={20}
        placeholder="本文"
        className="w-full h-full text-md font-bold border-none focus:outline-none resize-none placeholder:text-gray-400"
      />
    </div>
  );
}

export default Content;
