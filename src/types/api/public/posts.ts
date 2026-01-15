export type Post = {
  post_id: number;
  title: string;
  slug: string;
  thumbnail_url: string;
  published_at: string;
};

export type PostGetResponse = {
  total_count: number;
  total_pages: number;
  page: number;
  limit: number;
  posts: Post[];
};
