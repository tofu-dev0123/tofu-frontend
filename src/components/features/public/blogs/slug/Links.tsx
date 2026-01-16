import Image from 'next/image';
import XIcon from '@/assets/images/x-icon.png';
import LinkIcon from '@/assets/images/link-icon.png';
import Tooltip from '@/components/features/public/common/Tooltip';

interface LinksProps {
  position: 'left' | 'right';
}

function Links({ position }: LinksProps) {
  const linkItems = [
    {
      icon: XIcon,
      tooltip: 'Xで共有する',
    },
    {
      icon: LinkIcon,
      tooltip: 'リンクをコピー',
    },
  ];

  const justify = position === 'left' ? 'justify-start' : 'justify-end';

  return (
    <div className={`w-full h-10 my-2 flex ${justify} items-center gap-4`}>
      {linkItems.map((item) => (
        <Tooltip key={item.tooltip} content={item.tooltip}>
          <button className="opacity-50 hover:cursor-pointer hover:opacity-100 duration-200">
            <Image src={item.icon} alt={item.tooltip} width={16} height={16} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

export default Links;
