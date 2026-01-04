import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import Post from '@/components/features/admin/common/Post';
import type { Post as PostType } from '@/types/api/post';

interface PostsListAreaProps {
  postList: PostType[];
}

function PostsListArea({ postList }: PostsListAreaProps) {
  return (
    <Card className="h-full w-full flex flex-col gap-4 justify-start border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium py-4">最近の投稿</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2">
        {postList.map((post) => (
          <div
            key={post.post_id}
            className="col-span-1 flex flex-col justify-start items-center mb-4 p-1 border border-white rounded-md"
          >
            <Post key={post.post_id} post={post} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default PostsListArea;
