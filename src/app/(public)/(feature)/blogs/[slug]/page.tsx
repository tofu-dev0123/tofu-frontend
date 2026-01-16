import BlogDetailMain from '@/components/features/public/blogs/slug/BlogDetailMain';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <BlogDetailMain slug={slug} />;
}
