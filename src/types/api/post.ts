export type PostStatus = 'draft' | 'published';

export type Post = {
  post_id: number;
  user_id: number;
  title: string;
  slug: string;
  thumbnail_url: string | null;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PostResponse = {
  total_count: number;
  total_pages: number;
  posts: Post[];
};
