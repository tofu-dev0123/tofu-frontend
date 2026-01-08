'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import CropMask from './CropMask';

interface ThumbnailConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previewImageUrl: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}
function ThumbnailConfirm({
  open,
  onOpenChange,
  previewImageUrl,
  onConfirm,
  onCancel,
}: ThumbnailConfirmProps) {
  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>サムネイルをアップロードします</AlertDialogTitle>
          {previewImageUrl && (
            <div className="w-full relative">
              <img
                src={previewImageUrl}
                alt="プレビュー画像"
                className="w-full h-full object-cover"
              />
              <CropMask />
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            キャンセル
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            アップロード
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ThumbnailConfirm;
