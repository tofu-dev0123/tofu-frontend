import { Suspense } from 'react';
import BlogsMain from '@/components/features/public/blogs/BlogsMain';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsMain />
    </Suspense>
  );
}
