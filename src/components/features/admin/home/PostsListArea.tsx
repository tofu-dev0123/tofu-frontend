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
      <CardContent className="grid grid-cols-3">
        {postList.map((post) => (
          <div
            key={post.post_id}
            className="col-span-1 flex flex-col justify-center items-center gap-4 mb-4"
          >
            <Post key={post.post_id} post={post} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default PostsListArea;
