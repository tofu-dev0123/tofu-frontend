export const API_ENDPOINTS = {
  blogs: {
    get: '/posts/',
    slugs: '/posts/slugs',
    detail: (slug: string) => `/posts/${slug}`,
  },
};
