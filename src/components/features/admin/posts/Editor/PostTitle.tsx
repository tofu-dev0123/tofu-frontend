'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { usePostEditorContext } from '@/hooks/admin/posts/usePostEditorContext';

function PostTitle() {
  const { state, actions } = usePostEditorContext();

  return (
    <div className="w-full min-h-20 flex items-center justify-center">
      <TextareaAutosize
        minRows={1}
        placeholder="タイトル"
        className="w-full text-4xl font-bold border-none focus:outline-none resize-none placeholder:text-gray-400"
        value={state.title}
        maxLength={50}
        onChange={(e) => actions.setTitle(e.target.value)}
      />
    </div>
  );
}

export default PostTitle;
