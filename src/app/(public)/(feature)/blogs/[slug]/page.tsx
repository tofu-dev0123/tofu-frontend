import type { Metadata } from 'next';
import BlogDetailMain from '@/components/features/public/blogs/slug/BlogDetailMain';
import { getOgpPost } from '@/lib/api/ogp';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { extractExcerpt } from '@/lib/utils/extractExcerpt';
import type {
  PostDetailResponse,
  PostSlugsResponse,
} from '@/types/api/public/posts';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const response = await get<PostSlugsResponse>(API_ENDPOINTS.blogs.slugs);
    return response.slugs.map((slug) => ({ slug }));
  } catch (error) {
    // バックエンド不通時はビルドを止めず on-demand ISR にフォールバックさせる
    console.warn('[generateStaticParams] slug 取得に失敗:', error);
    return [];
  }
}

/**
 * OGP / Twitter 用メタデータ
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getOgpPost(slug);
  const description = extractExcerpt(post.content_html);

  return {
    title: post.title,
    description,

    openGraph: {
      title: post.title,
      description,
      type: 'article',
      images: [
        {
          url: post.thumbnail_url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.thumbnail_url],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const blogDetail = await get<PostDetailResponse>(
    API_ENDPOINTS.blogs.detail(slug)
  );

  return <BlogDetailMain blogDetail={blogDetail} />;
}
