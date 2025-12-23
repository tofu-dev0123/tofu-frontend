export const API_ENDPOINTS = {
  login: '/admin/auth/login',
  logout: '/admin/auth/logout',
  posts: '/admin/posts',
  post: (id: number) => `/admin/posts/${id}`,
};
