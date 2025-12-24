import React from 'react';
import type { Post } from '@/types/api/post';
import Image from 'next/image';
import dummyImage from '@/assets/images/dummy-image.png';

interface PostProps {
  post: Post;
}

function Post({ post }: PostProps) {
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="w-full h-full flex justify-center items-center rounded-md overflow-hidden shadow-md">
          <Image src={dummyImage} alt={post.title} width={300} height={200} />
        </div>
        <div className="flex justify-center items-center">
          <p className="text-md truncate">{post.title}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
