import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

function PostsListArea() {
  return (
    <Card className="h-full w-full flex justify-between border-none shadow-lg">
      <CardContent className="flex flex-col w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium py-4">最近の投稿</CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  );
}

export default PostsListArea;
