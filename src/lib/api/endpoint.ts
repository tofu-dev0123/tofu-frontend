export const API_ENDPOINTS = {
  blogs: {
    get: '/posts/',
    detail: (slug: string) => `/posts/${slug}`,
  },
};
