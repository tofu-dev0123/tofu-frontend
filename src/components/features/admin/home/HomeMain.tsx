'use client';

import Title from '@/components/features/admin/common/Title';
import ErrorModal from '@/components/features/admin/common/ErrorModal';
import SummaryArea from '@/components/features/admin/home/SummaryArea';
import CreateArea from '@/components/features/admin/home/CreateArea';
import useHome from '@/hooks/admin/home/useHome';
import PostsListArea from '@/components/features/admin/home/PostsListArea';

function HomeMain() {
  const {
    totalPosts,
    publishedPosts,
    draftPosts,
    errorModalHook,
    handleClickCreate,
    postList,
    totalCount,
    totalPages,
  } = useHome();

  return (
    <div className="h-full flex flex-col min-w-4xl max-w-6xl mx-auto">
      <Title title="ホーム" />
      <div className="flex-1 grid grid-cols-12 grid-rows-[auto_1fr] gap-4 py-4 px-20">
        {/* SummaryArea */}
        <div className="h-40 col-span-8">
          <SummaryArea
            totalPosts={totalPosts}
            publishedPosts={publishedPosts}
            draftPosts={draftPosts}
          />
        </div>
        <div className="h-40 col-span-4">
          <CreateArea handleClickCreate={handleClickCreate} />
        </div>
        <div className="col-span-12">
          <PostsListArea postList={postList} />
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
