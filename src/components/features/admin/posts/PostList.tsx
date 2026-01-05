'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { PostStatus } from '@/types/api/post';
import PostInfo from '@/components/features/admin/posts/PostInfo';
import Alert from '@/components/features/admin/common/Alert';
import useSearchPost from '@/hooks/admin/posts/useSearchPost';
import useStatus from '@/hooks/admin/posts/useStatus';
import usePostDeleteAlert from '@/hooks/admin/posts/usePostDeleteAlert';

interface PostListProps {
  searchPost: ReturnType<typeof useSearchPost>;
  status: ReturnType<typeof useStatus>;
  deleteAlert: ReturnType<typeof usePostDeleteAlert>;
}

function PostList({ searchPost, status, deleteAlert }: PostListProps) {
  return (
    <Card className="h-full w-full flex flex-col gap-4 justify-start border-none shadow-lg">
      <CardContent className="flex items-center justify-between p-4">
        <div className="w-100 flex items-center">
          <InputGroup className="rounded-full">
            <InputGroupInput
              placeholder="Search..."
              value={searchPost.keyword}
              onChange={searchPost.handleInputChange}
            />
            <InputGroupAddon className="rounded-full">
              <SearchIcon
                className="cursor-pointer hover:opacity-60 duration-200"
                onClick={searchPost.handleSearch}
              />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="w-40 flex items-center">
          <Select
            value={status.status || 'ALL'}
            onValueChange={(value) =>
              status.handleStatusChange(value as PostStatus)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="公開ステータス" />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 rounded-md">
              <SelectGroup>
                <SelectLabel>公開ステータス</SelectLabel>
                <SelectItem value="ALL">全て</SelectItem>
                <SelectItem value="PUBLISHED">公開</SelectItem>
                <SelectItem value="DRAFT">下書き</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardContent>
        <hr className="w-full border-gray-200" />
        {searchPost.postList.map((post) => (
          <div
            key={post.post_id}
            className="w-full h-25 hover:bg-gray-100/50 duration-200 cursor-pointer"
          >
            <PostInfo
              key={post.post_id}
              post={post}
              handleOpenDeleteAlert={deleteAlert.handleOpen}
            />
          </div>
        ))}
      </CardContent>
      <Alert
        open={deleteAlert.open}
        onOpenChange={deleteAlert.handleClose}
        title="記事を削除しますか？"
        cancelText="キャンセル"
        actionText="削除"
        onCancel={deleteAlert.handleClose}
        onAction={deleteAlert.handleDelete}
      />
    </Card>
  );
}

export default PostList;
