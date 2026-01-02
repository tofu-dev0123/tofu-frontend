import React, { useState, useCallback } from 'react';

function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onOpen, onClose };
}

export default useConfirmModal;
