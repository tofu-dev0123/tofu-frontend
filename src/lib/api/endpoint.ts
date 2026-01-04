export const API_ENDPOINTS = {
  login: {
    post: '/admin/auth/login',
  },
  logout: {
    post: '/admin/auth/logout',
  },
  posts: {
    get: '/admin/posts/',
    post: '/admin/posts/',
    put: (id: number) => `/admin/posts/${id}`,
    delete: (id: number) => `/admin/posts/${id}`,
  },
  summary: {
    get: '/admin/posts/summary',
  },
  images: {
    post: '/admin/images/upload',
    delete: (id: number) => `/admin/images/${id}`,
  },
};
