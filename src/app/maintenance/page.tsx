import StatusPageLayout from '@/components/features/public/common/StatusPageLayout';

export default function Page() {
  return (
    <StatusPageLayout buttonText="Topに戻る" buttonLink="/">
      <p className="lg:text-lg text-md font-sub-logo font-semibold">
        ただいまメンテナンス中です...
      </p>
    </StatusPageLayout>
  );
}
