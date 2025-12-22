import { AxiosRequestConfig } from 'axios';
import { apiClient } from './client';

/**
 * GET
 */
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await apiClient.get<T>(url, config);
  return res.data;
};

/**
 * POST
 */
export const post = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await apiClient.post<T>(url, data, config);
  return res.data;
};

/**
 * PATCH
 */
export const patch = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await apiClient.patch<T>(url, data, config);
  return res.data;
};

/**
 * DELETE
 */
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await apiClient.delete<T>(url, config);
  return res.data;
};
