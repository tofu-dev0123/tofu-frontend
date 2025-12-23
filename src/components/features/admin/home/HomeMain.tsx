'use client';

import Title from '@/components/features/admin/common/Title';
import SummaryArea from '@/components/features/admin/home/SummaryArea';
import useHome from '@/hooks/admin/home/useHome';

function HomeMain() {
  const { totalPosts, publishedPosts, draftPosts, errorMessage } = useHome();
  return (
    <div className="h-full flex flex-col">
      <Title title="ホーム" />
      <div className="flex-1 grid grid-cols-12 gap-4 py-4 px-20">
        {/* SummaryArea */}
        <div className="h-40 col-span-8">
          <SummaryArea
            totalPosts={totalPosts}
            publishedPosts={publishedPosts}
            draftPosts={draftPosts}
          />
        </div>
        <div className="col-span-4">2</div>
        <div className="col-span-12">3</div>
      </div>
    </div>
  );
}

export default HomeMain;
