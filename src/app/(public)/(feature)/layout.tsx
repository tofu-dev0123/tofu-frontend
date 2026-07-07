import FeatureShell from '@/components/features/public/common/FeatureShell';

function FeatureLayout({ children }: { children: React.ReactNode }) {
  return <FeatureShell>{children}</FeatureShell>;
}

export default FeatureLayout;
