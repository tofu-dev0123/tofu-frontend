import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

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
    <Card className="h-full flex justify-center items-center gap-14 px-10 border-none shadow">
      <CardContent className="w-200 flex flex-col items-center justify-end border border-blue-300/50 bg-blue-100/50 rounded-md my-4">
        <CardTitle className="w-full text-left text-md py-4">投稿数</CardTitle>
        <CardDescription className="text-3xl font-bold text-black">
          {totalPosts}
        </CardDescription>
      </CardContent>
      <CardContent className="w-200 flex flex-col items-center justify-end border border-green-300/50 bg-green-100/50 rounded-md my-4">
        <CardTitle className="w-full text-left text-md py-4">公開中</CardTitle>
        <CardDescription className="text-3xl font-bold text-black">
          {publishedPosts}
        </CardDescription>
      </CardContent>
      <CardContent className="w-200 flex flex-col items-center justify-end border border-red-300/50 bg-red-100/50 rounded-md my-4">
        <CardTitle className="w-full text-left text-md py-4">下書き</CardTitle>
        <CardDescription className="text-3xl font-bold text-black">
          {draftPosts}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default SummaryArea;
