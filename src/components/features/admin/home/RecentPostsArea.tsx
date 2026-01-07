import { CardContent } from '@/components/ui/card';
import Post from '@/components/features/admin/common/Post';
import type { Post as PostType } from '@/types/api/post';

interface RecentPostsAreaProps {
  postList: PostType[];
  handleClickPost: (postId: number) => void;
}

function RecentPostsArea({ postList, handleClickPost }: RecentPostsAreaProps) {
  return (
    <CardContent className="grid grid-cols-3 gap-2 w-full h-full">
      {postList.map((post) => (
        <div
          key={post.post_id}
          className="col-span-1 flex flex-col justify-start items-center mb-4 p-1 border border-white rounded-md"
        >
          <Post
            key={post.post_id}
            post={post}
            handleClickPost={handleClickPost}
          />
        </div>
      ))}
    </CardContent>
  );
}

export default RecentPostsArea;
