import { useEffect, useState } from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  errorMessage: string[];
}

export default function useErrorModal(props: ErrorModalProps) {
  const { isOpen, title, errorMessage } = props;
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState('エラー');
  const [errorModalErrorMessage, setErrorModalErrorMessage] = useState<
    string[]
  >([]);

  const onClose = () => {
    setErrorModalIsOpen(false);
    setErrorModalTitle('エラー');
    setErrorModalErrorMessage([]);
  };

  useEffect(() => {
    setErrorModalIsOpen(isOpen);
    setErrorModalTitle(title || 'エラー');
    setErrorModalErrorMessage(errorMessage);
  }, [isOpen, title, errorMessage]);

  return {
    errorModalIsOpen,
    setErrorModalIsOpen,
    errorModalTitle,
    setErrorModalTitle,
    errorModalErrorMessage,
    setErrorModalErrorMessage,
    onClose,
  };
}
