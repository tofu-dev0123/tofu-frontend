'use client';

import { CardContent } from '@/components/ui/card';
import Image from 'next/image';
import thumbnailIcon from '@/assets/images/thumbnail-icon.png';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import { Progress } from '@/components/ui/progress';
import addGreyIcon from '@/assets/images/add-grey-icon.png';
import Alert from '@/components/features/admin/common/Alert';
import { THUMBNAIL_ACCEPT_FORMATS } from '@/constants/admin/fileFormats';

function Thumbnail() {
  const { state, actions, ui } = usePostEditor();

  return (
    <CardContent className="w-full h-80 p-4 flex items-center justify-center">
      <div className="w-full h-full rounded-lg relative">
        {!state.isThumbnailLoading && state.thumbnailUrl && (
          <>
            <Image
              src={state.thumbnailUrl}
              alt={state.altText ?? 'thumbnail'}
              unoptimized
              fill
              className="object-contain rounded-lg"
            />
            <Image
              src={addGreyIcon}
              alt="削除ボタン"
              width={24}
              height={24}
              className="absolute top-0 right-0 rotate-45 hover:cursor-pointer hover:opacity-60 duration-200"
              onClick={actions.handleDeleteThumbnail}
            />
          </>
        )}
        {!state.isThumbnailLoading && !state.thumbnailUrl && (
          <Image
            src={thumbnailIcon}
            alt="thumbnail"
            width={40}
            height={40}
            className="absolute top-1/2 left-30 -translate-y-1/2 hover:cursor-pointer hover:opacity-60 duration-200"
            onClick={actions.handleThumbnailClick}
          />
        )}
        {state.isThumbnailLoading && (
          <div className="absolute inset-0 rounded-lg flex flex-col items-center justify-center z-10">
            <Progress value={state.progress} className="w-3/4 mb-4" />
            <span className="text-sm">
              {state.loadingType === 'delete'
                ? '削除中...'
                : 'アップロード中...'}
            </span>
          </div>
        )}
        <input
          // eslint-disable-next-line react-hooks/refs
          ref={ui.thumbnailInputRef}
          type="file"
          className="hidden"
          accept={THUMBNAIL_ACCEPT_FORMATS}
          onChange={actions.handleFileChange}
          disabled={state.isThumbnailLoading}
        />
      </div>
      <Alert
        open={state.isAlertOpen}
        onOpenChange={actions.handleAlertOpenChange}
        onAction={actions.handleConfirmUpload}
        onCancel={actions.handleCancelUpload}
        title="サムネイルをアップロードします"
        actionText="アップロード"
        previewImageUrl={state.previewImageUrl}
      />
    </CardContent>
  );
}

export default Thumbnail;
