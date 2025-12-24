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
    <Card className="h-full flex justify-between px-10 border-none shadow">
      <CardContent className="flex flex-col items-center justify-end">
        <CardTitle className="text-3xl font-bold py-4">投稿数</CardTitle>
        <CardDescription className="text-2xl mb-4">
          {totalPosts}
        </CardDescription>
      </CardContent>
      <CardContent className="flex flex-col items-center justify-end">
        <CardTitle className="text-2xl font-bold py-4">公開中</CardTitle>
        <CardDescription className="text-xl mb-4">
          {publishedPosts}
        </CardDescription>
      </CardContent>
      <CardContent className="flex flex-col items-center justify-end">
        <CardTitle className="text-2xl font-bold py-4">下書き</CardTitle>
        <CardDescription className="text-xl mb-4">{draftPosts}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default SummaryArea;
