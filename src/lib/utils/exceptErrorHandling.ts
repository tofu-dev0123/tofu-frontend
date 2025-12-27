import axios from 'axios';
import { getErrorMessage } from './getErrorMessage';
import { MESSAGES } from '@/constants/messages';

export const exceptErrorHandling = (
  error: unknown,
  setIsOpen: (open: boolean) => void,
  setErrorMessage: (message: string[]) => void
) => {
  setIsOpen(true);
  if (axios.isAxiosError(error) && error.response) {
    const errorMessage = getErrorMessage(error.response.data);
    setErrorMessage(errorMessage);
  } else {
    setErrorMessage([MESSAGES.errors.common.failed]);
  }
};
