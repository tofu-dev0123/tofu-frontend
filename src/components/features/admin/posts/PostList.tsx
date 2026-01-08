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
import usePatchStatusAlert from '@/hooks/admin/posts/usePatchStatusAlert';
import reloadIcon from '@/assets/images/reload-icon.png';
import Image from 'next/image';

interface PostListProps {
  searchPost: ReturnType<typeof useSearchPost>;
  status: ReturnType<typeof useStatus>;
  deleteAlert: ReturnType<typeof usePostDeleteAlert>;
  patchStatusAlert: ReturnType<typeof usePatchStatusAlert>;
  handleClickEdit: (postId: number) => void;
}

function PostList({
  searchPost,
  status,
  deleteAlert,
  patchStatusAlert,
  handleClickEdit,
}: PostListProps) {
  return (
    <Card className="min-h-screen w-full flex flex-col gap-4 justify-start border-none shadow-lg">
      <CardContent className="flex items-center justify-between p-4">
        <div className="w-100 flex items-center gap-4">
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
          <button
            onClick={searchPost.handleReset}
            className="cursor-pointer hover:opacity-60 duration-200 border-none shadow-none"
          >
            <Image
              src={reloadIcon}
              alt="reload"
              width={20}
              height={20}
              className="w-4 h-4"
            />
          </button>
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
              handleOpenPatchStatusAlert={patchStatusAlert.handleOpen}
              handleClickEdit={handleClickEdit}
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
      <Alert
        open={patchStatusAlert.open}
        onOpenChange={patchStatusAlert.handleClose}
        title="公開を解除しますか？"
        cancelText="キャンセル"
        actionText="公開を解除"
        onCancel={patchStatusAlert.handleClose}
        onAction={patchStatusAlert.handlePatchStatus}
      />
    </Card>
  );
}

export default PostList;
