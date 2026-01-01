'use client';

import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import previewIcon from '@/assets/images/preview-icon.png';
import editIcon from '@/assets/images/edit-icon.png';
import Image from 'next/image';

function EditorHeader() {
  const { state, actions } = usePostEditor();

  return (
    <CardContent className="w-full h-20 p-4 flex items-center justify-between gap-4">
      <div className="flex items-center justify-start pl-10">
        <div
          className="relative w-18 h-8 rounded-full bg-gray-300 flex items-center justify-between"
          onClick={actions.togglePreview}
        >
          <div
            className={`absolute w-9 h-9 border border-gray-300 rounded-full bg-white transition-transform duration-300 ease-in-out ${
              state.isPreview
                ? 'translate-x-[calc(100%+0.1rem)]'
                : 'translate-x-[-0.1rem]'
            }`}
          />
          <div className="relative w-8 h-8 rounded-full flex items-center justify-center z-10">
            <Image
              src={editIcon}
              alt="edit"
              width={18}
              height={18}
              className={`${
                state.isPreview
                  ? 'opacity-40'
                  : 'hover:cursor-pointer hover:opacity-60 duration-200'
              }`}
            />
          </div>
          <div className="relative w-8 h-8 rounded-full flex items-center justify-center z-10">
            <Image
              src={previewIcon}
              alt="preview"
              width={18}
              height={18}
              className={`${
                state.isPreview
                  ? 'hover:cursor-pointer hover:opacity-60 duration-200'
                  : 'opacity-40'
              }`}
            />
          </div>
        </div>
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
