import type { Post } from '@/types/api/public/posts';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/dateFormat';

interface BlogProps {
  blog: Post;
  index: number;
}

function Blog({ blog, index }: BlogProps) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="w-full flex items-center justify-between gap-6 hover:bg-gray-100/50 transition-all duration-500 cursor-pointer"
    >
      <div className="lg:w-50 lg:h-30 w-20 h-20 flex-shrink-0 flex item-center justify-center relative overflow-hidden">
        <Image
          src={blog.thumbnail_url}
          alt={blog.title}
          fill
          unoptimized
          className="lg:object-contain object-cover lg:rounded-none rounded-md lg:border-0 border border-black/10"
        />
      </div>
      <div
        className={`h-full w-full flex flex-col gap-1 border-b border-black/10 lg:py-6 py-2 ${index === 0 ? 'border-t' : ''}`}
      >
        <div className="font-sub-logo font-semibold tracking-[0.05em] py-2">
          {blog.title}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {blog.tags.map((tag) => (
              <p
                key={tag.tag_id}
                className="font-sub-logo lg:text-xs text-[10px] border border-black/10 rounded-sm px-2 py-1 text-center leading-none"
              >
                {tag.name}
              </p>
            ))}
          </div>
          <p className="w-full font-sub-logo text-xs text-gray-500 tracking-[0.05em]">
            {formatDate(blog.published_at)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Blog;
