import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import addIcon from '@/assets/images/add-icon.png';

interface CreateAreaProps {
  handleClickCreate: () => void;
}

function CreateArea({ handleClickCreate }: CreateAreaProps) {
  return (
    <Card className="h-full flex items-center justify-center px-10 border-none shadow">
      <CardContent className="flex flex-col items-center justify-end gap-2">
        <CardTitle className="text-2xl font-bold py-4">ブログを書く</CardTitle>
        <div
          className="flex items-center justify-center"
          onClick={handleClickCreate}
        >
          <Image src={addIcon} alt="追加" width={40} height={40} />
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateArea;
