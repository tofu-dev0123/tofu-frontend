export const API_ENDPOINTS = {
  login: {
    post: '/admin/auth/login',
  },
  logout: {
    post: '/admin/auth/logout',
  },
  account: {
    me: '/admin/auth/me',
  },
  posts: {
    get: '/admin/posts/',
    post: '/admin/posts/',
    put: (id: number) => `/admin/posts/${id}`,
    delete: (id: number) => `/admin/posts/${id}`,
    patchStatus: (id: number) => `/admin/posts/${id}`,
    edit: (id: number) => `/admin/posts/${id}`,
  },
  summary: {
    get: '/admin/posts/summary',
  },
  images: {
    post: '/admin/images/upload',
    delete: (id: number) => `/admin/images/${id}`,
  },
  blogs: {
    get: '/posts/',
    detail: (slug: string) => `/posts/${slug}`,
  },
};
