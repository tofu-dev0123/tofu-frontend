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
            <div className="mt-4 flex justify-center">
              <div
                className="relative w-full max-w-[600px] rounded-lg overflow-hidden bg-black"
                style={{
                  aspectRatio: `16 / 9`,
                }}
              >
                <img
                  src={previewImageUrl}
                  alt="プレビュー画像"
                  className="w-full h-full object-contain"
                />
              </div>
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
