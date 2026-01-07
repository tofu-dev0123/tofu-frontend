'use client';

import Title from '@/components/features/admin/common/Title';
import ErrorModal from '@/components/features/admin/common/ErrorModal';
import SummaryArea from '@/components/features/admin/home/SummaryArea';
import CreateArea from '@/components/features/admin/home/CreateArea';
import RecentPostsArea from '@/components/features/admin/home/RecentPostsArea';
import useHome from '@/hooks/admin/home/useHome';
import ListArea from '@/components/features/admin/home/ListArea';
import BaseArea from '@/components/features/admin/home/BaseArea';
import DraftPostsArea from '@/components/features/admin/home/DraftPostsArea';

function HomeMain() {
  const {
    totalPosts,
    publishedPosts,
    draftPosts,
    errorModalHook,
    handleClickCreate,
    handleClickList,
    handleClickPost,
    postList,
    draftPostList,
  } = useHome();

  return (
    <div className="h-full w-6xl flex flex-col mx-auto">
      <Title title="ホーム" />
      <div className="flex-1 grid grid-cols-12 grid-rows-[auto_1fr_1fr] gap-4 py-4 px-20">
        {/* サマリ */}
        <BaseArea colSpan={8} height={40} title="投稿のサマリ">
          <SummaryArea
            totalPosts={totalPosts}
            publishedPosts={publishedPosts}
            draftPosts={draftPosts}
          />
        </BaseArea>

        {/* 投稿一覧 */}
        <BaseArea colSpan={2} height={40} title="投稿一覧">
          <ListArea handleClickList={handleClickList} />
        </BaseArea>

        {/* ブログを書く */}
        <BaseArea colSpan={2} height={40} title="ブログを書く">
          <CreateArea handleClickCreate={handleClickCreate} />
        </BaseArea>

        {/* 最近の投稿 */}
        <BaseArea colSpan={12} title="最近の投稿">
          <RecentPostsArea
            postList={postList}
            handleClickPost={handleClickPost}
          />
        </BaseArea>

        {/* 下書き */}
        <BaseArea colSpan={12} title="下書き">
          <DraftPostsArea
            draftPostList={draftPostList}
            handleClickPost={handleClickPost}
          />
        </BaseArea>
      </div>
      <ErrorModal
        isOpen={errorModalHook.isOpen}
        errorMessage={errorModalHook.errorMessage}
        onClose={errorModalHook.onClose}
      />
    </div>
  );
}

export default HomeMain;
