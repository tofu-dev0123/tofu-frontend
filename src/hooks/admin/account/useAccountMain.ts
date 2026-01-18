'use client';

import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { post } from '@/lib/api/http';
import { exceptErrorHandling } from '@/lib/utils/exceptErrorHandling';
import { MeResponse } from '@/types/api/account';
import { useCallback, useEffect, useState } from 'react';
import useErrorModal from '../common/useErrorModal';

function useAccountMain() {
  const [account, setAccount] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { showError } = useErrorModal();

  const getAccount = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await post<MeResponse>(API_ENDPOINTS.account.me);
      setAccount(response);
    } catch (error) {
      exceptErrorHandling(error, showError);
      setAccount(null);
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    getAccount();
  }, []);

  return { account, isLoading, getAccount };
}

export default useAccountMain;
