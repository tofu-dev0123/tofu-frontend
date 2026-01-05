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
import { Post } from '@/types/api/post';

interface PostListProps {
  totalCount: number;
  totalPages: number;
  postList: Post[];
  keyword: string;
  handleSearch: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PostList({
  totalCount,
  totalPages,
  postList,
  keyword,
  handleSearch,
  handleInputChange,
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
              <SearchIcon className="cursor-pointer" onClick={handleSearch} />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="w-40 flex items-center">
          <Select>
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
      <CardContent></CardContent>
    </Card>
  );
}

export default PostList;
