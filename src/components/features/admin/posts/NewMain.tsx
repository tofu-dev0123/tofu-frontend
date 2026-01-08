'use client';

import PostEditor from '@/components/features/admin/posts/Editor/PostEditor';
import { PostEditorProvider } from '@/contexts/admin/posts/PostEditorContext';

function NewMain() {
  return (
    <PostEditorProvider>
      <div className="h-full w-6xl flex flex-col mx-auto">
        <PostEditor />
      </div>
    </PostEditorProvider>
  );
}

export default NewMain;
