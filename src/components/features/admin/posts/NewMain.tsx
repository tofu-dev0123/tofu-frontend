'use client';

import Title from '@/components/features/admin/common/Title';
import PostEditor from '@/components/features/admin/posts/Editor/PostEditor';
import { PostEditorProvider } from '@/contexts/admin/posts/PostEditorContext';

function NewMain() {
  return (
    <PostEditorProvider>
      <div className="h-full w-6xl flex flex-col mx-auto">
        <Title title="記事作成" />
        <PostEditor />
      </div>
    </PostEditorProvider>
  );
}

export default NewMain;
