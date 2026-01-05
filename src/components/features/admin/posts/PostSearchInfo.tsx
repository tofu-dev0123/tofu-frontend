import React from 'react';

interface PostSearchInfoProps {
  totalPosts: number;
  keyword?: string;
}

function PostSearchInfo({ totalPosts, keyword }: PostSearchInfoProps) {
  return (
    <div className="w-full flex justify-start items-center">
      <div className="flex items-center gap-2 m-4">
        <span className="text-sm text-gray-500">検索結果: {totalPosts}件</span>
        {keyword && (
          <span className="text-sm text-gray-500">キーワード: {keyword}</span>
        )}
      </div>
    </div>
  );
}

export default PostSearchInfo;
