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
        <div className="col-span-8 h-full">
          <BaseArea title="投稿のサマリ">
            <SummaryArea
              totalPosts={totalPosts}
              publishedPosts={publishedPosts}
              draftPosts={draftPosts}
            />
          </BaseArea>
        </div>

        {/* 投稿一覧 */}
        <div className="col-span-2 h-full">
          <BaseArea title="投稿一覧">
            <ListArea handleClickList={handleClickList} />
          </BaseArea>
        </div>

        {/* ブログを書く */}
        <div className="col-span-2 h-full">
          <BaseArea title="ブログを書く">
            <CreateArea handleClickCreate={handleClickCreate} />
          </BaseArea>
        </div>

        {/* 最近の投稿 */}
        <div className="col-span-12 h-full">
          <BaseArea title="最近の投稿">
            <RecentPostsArea
              postList={postList}
              handleClickPost={handleClickPost}
            />
          </BaseArea>
        </div>
        {/* 下書き */}
        <div className="col-span-12 h-full">
          <BaseArea title="下書き">
            <DraftPostsArea
              draftPostList={draftPostList}
              handleClickPost={handleClickPost}
            />
          </BaseArea>
        </div>
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
