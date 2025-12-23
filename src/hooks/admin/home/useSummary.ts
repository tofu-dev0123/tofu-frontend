'use client';

import { useState } from 'react';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { SummaryResponse } from '@/types/api/summary';
import axios from 'axios';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { MESSAGES } from '@/constants/messages';

interface SummaryState {
  setErrorMessage: (errorMessage: string[]) => void;
}

function useSummary(props: SummaryState) {
  const { setErrorMessage } = props;
  const [totalPosts, setTotalPosts] = useState(0);
  const [publishedPosts, setPublishedPosts] = useState(0);
  const [draftPosts, setDraftPosts] = useState(0);

  const getSummary = async () => {
    try {
      const response = await get<SummaryResponse>(API_ENDPOINTS.summary.get);
      setTotalPosts(response.total_count);
      setPublishedPosts(response.published_count);
      setDraftPosts(response.draft_count);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = getErrorMessage(error.response.data);
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage([MESSAGES.errors.common.failed]);
      }
    }
  };

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    getSummary,
  };
}

export default useSummary;
