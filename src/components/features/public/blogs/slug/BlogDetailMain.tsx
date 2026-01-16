'use client';

import useBlogDetail from '@/hooks/public/blogs/useBlogDetail';
import Image from 'next/image';
import HtmlContent from '@/components/features/public/blogs/slug/HtmlContent';
import { formatDate } from '@/lib/utils/dateFormat';
import { useState, useEffect } from 'react';

interface BlogDetailMainProps {
  slug: string;
}

function BlogDetailMain({ slug }: BlogDetailMainProps) {
  const { blogDetail } = useBlogDetail(slug);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      {blogDetail ? (
        <div className="w-full min-h-screen flex flex-col mb-20 lg:px-20">
          <div className="w-full aspect-video overflow-hidden relative">
            <Image
              src={blogDetail.thumbnail_url}
              alt={blogDetail.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="w-full mt-10">
            <h1 className="text-3xl font-bold tracking-[0.02em]">
              {blogDetail.title}
            </h1>
          </div>
          <div className="w-full">
            <p className="text-sm text-gray-500 text-right tracking-[0.02em]">
              {formatDate(blogDetail.published_at)}
            </p>
          </div>
          <div className="w-full my-10">
            <HtmlContent html={blogDetail.content_html} />
          </div>
          <div className="w-full flex flex-wrap gap-2">
            {blogDetail.tags.map((tag) => (
              <span
                key={tag.tag_id}
                className="lg:text-xs text-[10px] border border-black/10 rounded-sm px-2 py-1 text-center leading-none"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>ブログの詳細情報の取得に失敗しました</p>
        </div>
      )}
    </>
  );
}

export default BlogDetailMain;
