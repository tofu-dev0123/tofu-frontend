'use client';

import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';

function EditorHeader() {
  const { actions } = usePostEditor();

  return (
    <CardContent className="w-full h-20 p-4 flex items-center justify-between gap-4">
      <div className="flex items-center justify-start pl-10">
        <Button
          variant="outline"
          className="w-30 rounded-full cursor-pointer"
          onClick={actions.togglePreview}
        >
          preview
        </Button>
      </div>
      <div className="flex items-center justify-end gap-4 pr-10">
        <Button
          variant="outline"
          className="w-30 rounded-full cursor-pointer"
          onClick={actions.saveDraft}
        >
          下書き保存
        </Button>
        <Button
          variant="outline"
          className="w-30 rounded-full bg-admin-main text-white cursor-pointer hover:bg-admin-main/90 hover:text-white"
          onClick={actions.publish}
        >
          公開
        </Button>
      </div>
    </CardContent>
  );
}

export default EditorHeader;
