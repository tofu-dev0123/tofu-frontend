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
import { Post, PostStatus } from '@/types/api/post';
import PostInfo from '@/components/features/admin/posts/PostInfo';
import Alert from '@/components/features/admin/common/Alert';

interface PostListProps {
  totalCount: number;
  totalPages: number;
  postList: Post[];
  keyword: string;
  status: PostStatus | 'ALL';
  openDeleteAlert: boolean;
  handleOpenDeleteAlert: (id: number) => void;
  handleCloseDeleteAlert: () => void;
  handleDelete: () => void;
  handleSearch: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (newStatus: PostStatus | 'ALL') => void;
}

function PostList({
  totalCount,
  totalPages,
  postList,
  keyword,
  status,
  openDeleteAlert,
  handleOpenDeleteAlert,
  handleCloseDeleteAlert,
  handleDelete,
  handleSearch,
  handleInputChange,
  handleStatusChange,
}: PostListProps) {
  return (
    <Card className="h-full w-full flex flex-col gap-4 justify-start border-none shadow-lg">
      <CardContent className="flex items-center justify-between p-4">
        <div className="w-100 flex items-center">
          <InputGroup className="rounded-full">
            <InputGroupInput
              placeholder="Search..."
              value={keyword}
              onChange={handleInputChange}
            />
            <InputGroupAddon className="rounded-full">
              <SearchIcon
                className="cursor-pointer hover:opacity-60 duration-200"
                onClick={handleSearch}
              />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="w-40 flex items-center">
          <Select
            value={status || 'ALL'}
            onValueChange={(value) => handleStatusChange(value as PostStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="公開ステータス" />
            </SelectTrigger>
            <SelectContent>
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
        {postList.map((post) => (
          <PostInfo
            key={post.post_id}
            post={post}
            handleOpenDeleteAlert={handleOpenDeleteAlert}
          />
        ))}
      </CardContent>
      <Alert
        open={openDeleteAlert}
        onOpenChange={handleCloseDeleteAlert}
        title="記事を削除しますか？"
        cancelText="キャンセル"
        actionText="削除"
        onCancel={handleCloseDeleteAlert}
        onAction={handleDelete}
      />
    </Card>
  );
}

export default PostList;
