'use client';

import { Card } from '@/components/ui/card';
import EditorHeader from '@/components/features/admin/posts/Editor/EditorHeader';
import EditorBody from '@/components/features/admin/posts/Editor/EditorBody';
import ErrorModal from '@/components/features/admin/common/ErrorModal';
import Alert from '@/components/features/admin/common/Alert';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';

function PostEditor() {
  const { state, actions } = usePostEditor();

  return (
    <div className="w-full min-h-screen p-10 flex items-center justify-center gap-0">
      <Card className="w-full h-full flex flex-col items-center justify-start gap-0 border-none shadow">
        <EditorHeader />
        <EditorBody />
      </Card>
      <ErrorModal
        isOpen={state.isErrorModalOpen}
        errorMessage={state.errorMessage}
        onClose={actions.onClose}
      />
      <Alert
        open={state.isImageAlertOpen}
        onOpenChange={actions.handleImageAlertOpenChange}
        title="画像を挿入しますか？"
        description="選択した画像をエディタに挿入します。"
        cancelText="キャンセル"
        actionText="挿入"
        onCancel={actions.handleCancelImageInsert}
        onAction={actions.handleConfirmImageInsert}
        previewImageUrl={state.imagePreviewUrl}
      />
    </div>
  );
}

export default PostEditor;
