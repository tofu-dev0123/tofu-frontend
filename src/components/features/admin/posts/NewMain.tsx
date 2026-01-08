'use client';

import PostEditor from '@/components/features/admin/posts/Editor/PostEditor';
import { PostEditorProvider } from '@/contexts/admin/posts/PostEditorContext';

function NewMain() {
  return (
    <PostEditorProvider>
      <div className="w-6xl flex flex-col mx-auto mb-20">
        <PostEditor />
      </div>
    </PostEditorProvider>
  );
}

export default NewMain;
