import React from 'react';
import { Post } from '@/types/api/post';
import threeDotsIcon from '@/assets/images/three-dots-reader-icon.png';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils/dateFormat';

interface PostInfoProps {
  post: Post;
}

function PostInfo({ post }: PostInfoProps) {
  return (
    <>
      <div className="w-150 h-25 mx-auto flex justify-between items-center gap-4">
        <div className="w-100 flex flex-col justify-center items-start gap-4 p-4">
          <h4 className="text-md font-bold">
            {post.title ? post.title : 'タイトル未設定'}
          </h4>
          <div className="w-full flex justify-start items-center gap-4">
            <div className="flex justify-start items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${post.status === 'PUBLISHED' ? 'bg-green-400' : 'bg-gray-400'}`}
              ></span>
              <span className="text-sm text-gray-500">
                {post.status === 'PUBLISHED' ? '公開' : '下書き'}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {formatDateTime(post.createdAt)}
            </span>
          </div>
        </div>
        <div
          className={`h-20 w-20 relative overflow-hidden ${post.thumbnail_url ? 'rounded-md border border-gray-200' : ''}`}
        >
          {post.thumbnail_url && (
            <Image
              src={post.thumbnail_url}
              alt={post.title}
              fill
              unoptimized
              className="object-cover"
            />
          )}
        </div>
        <div className="h-20 w-20 flex justify-center items-center">
          <Image
            src={threeDotsIcon}
            alt="three-dots"
            width={20}
            height={20}
            className="hover:cursor-pointer hover:opacity-60 duration-200"
          />
        </div>
      </div>
      <hr className="w-full border-gray-200" />
    </>
  );
}

export default PostInfo;
