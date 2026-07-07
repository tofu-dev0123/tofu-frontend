const SKELETON_COUNT = 10;

function BlogsSkeletonItem({ isFirst }: { isFirst: boolean }) {
  return (
    <div className="w-full flex items-center justify-between gap-6">
      <div className="lg:w-50 lg:h-30 w-20 h-20 flex-shrink-0 lg:rounded-none rounded-md lg:border-0 border border-black/10 bg-gray-200 animate-pulse" />
      <div
        className={`h-full w-full flex flex-col gap-1 border-b border-black/10 lg:py-6 py-2 ${isFirst ? 'border-t' : ''}`}
      >
        <div className="py-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-6 w-14 bg-gray-200 rounded-sm animate-pulse" />
            <div className="h-6 w-16 bg-gray-200 rounded-sm animate-pulse" />
            <div className="h-6 w-12 bg-gray-200 rounded-sm animate-pulse" />
          </div>
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function BlogsSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <BlogsSkeletonItem key={index} isFirst={index === 0} />
      ))}
    </div>
  );
}
