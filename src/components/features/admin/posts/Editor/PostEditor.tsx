'use client';

import { Card } from '@/components/ui/card';
import EditorHeader from '@/components/features/admin/posts/Editor/EditorHeader';
import EditorBody from '@/components/features/admin/posts/Editor/EditorBody';

function PostEditor() {
  const handlePreview = () => {
    console.log('preview');
  };
  const handleSaveDraft = () => {
    console.log('save draft');
  };
  const handlePublish = () => {
    console.log('publish');
  };
  return (
    <div className="w-full min-h-screen p-10 flex items-center justify-center gap-0">
      <Card className="w-full h-full flex flex-col items-center justify-start gap-0 border-none shadow">
        <EditorHeader
          onPreview={handlePreview}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
        />
        <hr className="w-full border-t border-gray-200" />
        <EditorBody />
      </Card>
    </div>
  );
}

export default PostEditor;
