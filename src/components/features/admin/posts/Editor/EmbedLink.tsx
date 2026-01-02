import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import addGreyIcon from '@/assets/images/add-grey-icon.png';
import Image from 'next/image';

interface EmbedLinkProps {
  open: boolean;
  onClose: () => void;
}

function EmbedLink({ open, onClose }: EmbedLinkProps) {
  const { state } = usePostEditor();
  if (!open) return null;

  return (
    <Card
      className="w-80 h-12 flex items-center justify-start gap-2 border border-gray-200 shadow p-2 absolute"
      style={{
        top: state.cursorPosition.y,
        left: state.cursorPosition.x,
        transform: 'translate(10%, -50%)',
      }}
    >
      <Input
        type="url"
        placeholder="URLを入力してください"
        className="w-full shadow-none border-none"
      />
      <Button className="w-12 h-8 cursor-pointer mx-2">挿入</Button>
      <Image
        src={addGreyIcon}
        alt="追加"
        width={15}
        height={15}
        className="hover:cursor-pointer hover:opacity-60 duration-200 rotate-45 absolute -top-1 -right-1"
        onClick={onClose}
      />
    </Card>
  );
}

export default EmbedLink;
