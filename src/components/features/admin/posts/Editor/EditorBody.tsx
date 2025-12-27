'use client';

import { CardContent } from '@/components/ui/card';
import Thumbnail from '@/components/features/admin/posts/Editor/Thumbnail';
import PostTitle from '@/components/features/admin/posts/Editor/PostTitle';
import Tag from '@/components/features/admin/posts/Editor/Tag';
import MDContent from '@/components/features/admin/posts/Editor/MDContent';

function EditorBody() {
  return (
    <CardContent className="w-150 h-full flex flex-col items-center justify-start gap-0">
      <Thumbnail />
      <PostTitle />
      <Tag />
      <MDContent className="flex-1" />
    </CardContent>
  );
}

export default EditorBody;
