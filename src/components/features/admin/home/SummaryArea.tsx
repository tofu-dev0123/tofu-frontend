import { CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface SummaryAreaProps {
  totalPosts?: number;
  publishedPosts?: number;
  draftPosts?: number;
}

function SummaryArea({
  totalPosts = 0,
  publishedPosts = 0,
  draftPosts = 0,
}: SummaryAreaProps) {
  return (
    <CardContent className="grid grid-cols-3 items-center justify-between gap-16 w-full px-10 h-full">
      <div className="w-40 col-span-1 flex flex-col items-center justify-end border border-blue-300/50 bg-blue-100/50 rounded-md py-2">
        <CardTitle className="w-full text-left text-md px-4">投稿数</CardTitle>
        <CardDescription className="text-3xl font-bold text-black">
          {totalPosts}
        </CardDescription>
      </div>
      <div className="w-40 col-span-1 flex flex-col items-center justify-end border border-green-300/50 bg-green-100/50 rounded-md py-2">
        <CardTitle className="w-full text-left text-md px-4">公開中</CardTitle>
        <CardDescription className="text-3xl font-bold text-black">
          {publishedPosts}
        </CardDescription>
      </div>
      <div className="w-40 col-span-1 flex flex-col items-center justify-end border border-red-300/50 bg-red-100/50 rounded-md py-2">
        <CardTitle className="w-full text-left text-md px-4">下書き</CardTitle>
        <CardDescription className="text-3xl font-bold text-black">
          {draftPosts}
        </CardDescription>
      </div>
    </CardContent>
  );
}

export default SummaryArea;
