import { useState } from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  errorMessage: string[];
}

export default function useErrorModal(props: ErrorModalProps) {
  const { isOpen, title, errorMessage } = props;
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(isOpen);
  const [errorModalTitle, setErrorModalTitle] = useState(title || 'エラー');
  const [errorModalErrorMessage, setErrorModalErrorMessage] =
    useState<string[]>(errorMessage);

  const onClose = () => {
    setErrorModalIsOpen(false);
    setErrorModalTitle('エラー');
    setErrorModalErrorMessage([]);
  };

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
