import React from 'react';
import Title from '@/components/features/admin/common/Title';
import PostEditor from '@/components/features/admin/posts/Editor/PostEditor';

function NewMain() {
  return (
    <div className="h-full w-6xl flex flex-col mx-auto">
      <Title title="記事作成" />
      <PostEditor />
    </div>
  );
}

export default NewMain;
