'use client';

import Title from '@/components/features/admin/common/Title';
import PostSearchInfo from '@/components/features/admin/posts/PostSearchInfo';
import PostList from '@/components/features/admin/posts/PostList';
import usePostList from '@/hooks/admin/posts/usePostList';

function PostListMain() {
  const {
    totalCount,
    totalPages,
    postList,
    keyword,
    handleSearch,
    handleInputChange,
  } = usePostList();
  return (
    <div className="h-full w-6xl flex flex-col mx-auto">
      <Title title="記事一覧" />
      <PostSearchInfo totalPosts={totalCount} keyword={keyword} />
      <PostList
        totalCount={totalCount}
        totalPages={totalPages}
        postList={postList}
        keyword={keyword}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default PostListMain;
