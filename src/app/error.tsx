'use client';

import StatusPageLayout from '@/components/features/public/common/StatusPageLayout';

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <StatusPageLayout buttonText="再読み込み" onClick={reset}>
      <p className="lg:text-lg text-md font-sub-logo font-semibold">
        エラーが発生しました...
      </p>
    </StatusPageLayout>
  );
}

export default Error;
