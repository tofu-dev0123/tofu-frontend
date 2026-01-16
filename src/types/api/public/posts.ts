export type Post = {
  post_id: number;
  title: string;
  slug: string;
  thumbnail_url: string;
  published_at: string;
  tags: Tag[];
};

export type Tag = {
  tag_id: number;
  name: string;
  slug: string;
};

export type PostGetResponse = {
  total_count: number;
  total_pages: number;
  page: number;
  limit: number;
  posts: Post[];
};

export type PostDetailResponse = {
  post_id: number;
  title: string;
  slug: string;
  content_html: string;
  thumbnail_url: string;
  tags: Tag[];
  published_at: string;
};
