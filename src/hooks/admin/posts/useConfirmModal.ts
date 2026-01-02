import { useState, useCallback } from 'react';
import { validatePostSubmission } from '@/services/admin/posts/validatePostSubmission';

interface UseConfirmModalProps {
  showError: (message: string[]) => void;
}

function useConfirmModal({ showError }: UseConfirmModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(
    (thumbnailUrl: string, title: string, tags: string[], content: string) => {
      // バリデーションチェック
      const errorMessage = validatePostSubmission(
        thumbnailUrl,
        title,
        tags,
        content
      );
      if (errorMessage.length > 0) {
        showError(errorMessage);
        return;
      }
      setIsOpen(true);
    },
    [showError]
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onOpen, onClose };
}

export default useConfirmModal;
