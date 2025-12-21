export const API_ENDPOINTS = {
  login: '/admin/auth/login',
  posts: '/admin/posts',
  post: (id: number) => `/admin/posts/${id}`,
};
