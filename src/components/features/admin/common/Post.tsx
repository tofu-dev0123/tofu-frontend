import React from 'react';
import type { Post } from '@/types/api/post';
import Image from 'next/image';
import dummyImage from '@/assets/images/dummy-image.png';

interface PostProps {
  post: Post;
}

function Post({ post }: PostProps) {
  const thumbnailUrl = post.thumbnail_url || dummyImage;
  const width = 150;
  const height = 100;
  return (
    <>
      <div className="w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full h-full flex justify-center items-center rounded-md overflow-hidden shadow-md">
          <Image
            src={thumbnailUrl}
            alt={post.title}
            width={width}
            height={height}
            unoptimized
          />
        </div>
        <div className="h-15 flex justify-center items-center">
          <p className="text-md truncate">{post.title}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
