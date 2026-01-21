import type { Metadata } from 'next';
import BlogDetailMain from '@/components/features/public/blogs/slug/BlogDetailMain';
import { getOgpPost } from '@/lib/api/ogp'; // 記事取得API（例）

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * OGP / Twitter 用メタデータ
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getOgpPost(slug);

  return {
    title: post.title,
    description: post.content_html,

    openGraph: {
      title: post.title,
      description: post.content_html,
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
      description: post.content_html,
      images: [post.thumbnail_url],
    },
  };
}

/**
 * ページ本体（そのまま）
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <BlogDetailMain slug={slug} />;
}
