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
    displayedKeyword,
    handleSearch,
    handleInputChange,
    handleStatusChange,
    status,
    openDeleteAlert,
    handleOpenDeleteAlert,
    handleCloseDeleteAlert,
    handleDelete,
  } = usePostList();
  return (
    <div className="h-full w-6xl flex flex-col mx-auto">
      <Title title="記事一覧" />
      <div className="h-full w-200 mx-auto flex flex-col">
        <PostSearchInfo totalPosts={totalCount} keyword={displayedKeyword} />
        <PostList
          totalCount={totalCount}
          totalPages={totalPages}
          postList={postList}
          keyword={keyword}
          handleSearch={handleSearch}
          handleInputChange={handleInputChange}
          handleStatusChange={handleStatusChange}
          status={status}
          openDeleteAlert={openDeleteAlert}
          handleOpenDeleteAlert={handleOpenDeleteAlert}
          handleCloseDeleteAlert={handleCloseDeleteAlert}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default PostListMain;
