import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface BaseAreaProps {
  colSpan?: number;
  height?: number;
  title: string;
  children: React.ReactNode;
}

function BaseArea({ colSpan, height, title, children }: BaseAreaProps) {
  return (
    <div className={`col-span-${colSpan} h-${height}`}>
      <Card className="w-full h-full flex flex-col items-center justify-start gap-2 border-none shadow">
        <CardHeader className="flex items-center justify-start w-full p-0">
          <CardTitle className="text-lg font-bold w-full text-left px-4 py-2">
            {title}
          </CardTitle>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
}

export default BaseArea;
