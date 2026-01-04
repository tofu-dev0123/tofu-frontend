'use client';

import { CardContent } from '@/components/ui/card';
import Thumbnail from '@/components/features/admin/posts/Editor/Thumbnail';
import PostTitle from '@/components/features/admin/posts/Editor/PostTitle';
import Tag from '@/components/features/admin/posts/Editor/Tag';
import Content from '@/components/features/admin/posts/Editor/Content';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import { POST_MAX_CHARACTERS } from '@/constants/admin/fileFormats';

function EditorBody() {
  const { state } = usePostEditor();
  return (
    <>
      <div className="w-full h-10 flex items-center justify-end pr-4">
        <span className="text-sm text-gray-400">
          {state.content.length}/{POST_MAX_CHARACTERS}文字
        </span>
      </div>
      <CardContent className="w-150 h-full flex flex-col items-center justify-start gap-0">
        <Thumbnail />
        <PostTitle />
        <Tag />
        <Content className="flex-1" />
      </CardContent>
    </>
  );
}

export default EditorBody;
