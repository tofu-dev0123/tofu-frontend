export type ProductTag = {
  tag_id: number;
  name: string;
  slug: string;
};

export type Product = {
  product_id: number;
  title: string;
  description: string | null;
  link_url: string | null;
  github_url: string | null;
  published: boolean;
  sort_order: number;
  tags: ProductTag[];
};

export type ProductListResponse = {
  products: Product[];
};
