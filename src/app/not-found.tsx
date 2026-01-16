import StatusPageLayout from '@/components/features/public/common/StatusPageLayout';

export default function NotFound() {
  return (
    <StatusPageLayout buttonText="Topに戻る" buttonLink="/">
      <p className="lg:text-[110px] text-[80px] font-sub-logo font-semibold lg:translate-y-[30px] translate-y-[20px]">
        404
      </p>
      <p className="lg:text-lg text-md font-sub-logo font-semibold">
        お探しのページが見つかりませんでした。
      </p>
    </StatusPageLayout>
  );
}
