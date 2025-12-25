import React from 'react';
import { CardContent } from '@/components/ui/card';
import Thumbnail from '@/components/features/admin/posts/Editor/Thumbnail';
import PostTitle from '@/components/features/admin/posts/Editor/PostTitle';
import Tag from '@/components/features/admin/posts/Editor/Tag';
import MDContent from '@/components/features/admin/posts/Editor/MDContent';

function EditorBody() {
  const handleUpload = () => {
    console.log('upload');
  };
  return (
    <CardContent className="w-150 h-full flex flex-col items-center justify-start gap-0">
      <Thumbnail onUpload={handleUpload} />
      <PostTitle />
      <Tag onAddTag={() => {}} tags={[]} />
      <MDContent />
    </CardContent>
  );
}

export default EditorBody;
