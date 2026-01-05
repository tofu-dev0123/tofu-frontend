'use client';

import Title from '@/components/features/admin/common/Title';
import PostSearchInfo from '@/components/features/admin/posts/PostSearchInfo';
import PostList from '@/components/features/admin/posts/PostList';
import usePostList from '@/hooks/admin/posts/usePostList';

function PostListMain() {
  const {
    searchPost,
    status: statusHook,
    deleteAlert,
    patchStatusAlert,
    displayedKeyword,
  } = usePostList();
  return (
    <div className="h-full w-6xl flex flex-col mx-auto">
      <Title title="記事一覧" />
      <div className="h-full w-200 mx-auto flex flex-col">
        <PostSearchInfo
          totalPosts={searchPost.totalCount}
          keyword={displayedKeyword}
        />
        <PostList
          searchPost={searchPost}
          status={statusHook}
          deleteAlert={deleteAlert}
          patchStatusAlert={patchStatusAlert}
        />
      </div>
    </div>
  );
}

export default PostListMain;
