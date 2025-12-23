import { useState } from 'react';

export default function useErrorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('エラー');
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const onClose = () => {
    setIsOpen(false);
    setTitle('エラー');
    setErrorMessage([]);
  };

  return {
    isOpen,
    title,
    errorMessage,
    setErrorMessage,
    setIsOpen,
    onClose,
  };
}
