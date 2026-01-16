import Image from 'next/image';
import XIcon from '@/assets/images/x-icon.png';
import LinkIcon from '@/assets/images/link-icon.png';
import Tooltip from '@/components/features/public/common/Tooltip';

interface LinksProps {
  position: 'left' | 'right';
  title: string;
}

function Links({ position, title }: LinksProps) {
  const justify = position === 'left' ? 'justify-start' : 'justify-end';

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('リンクをコピーしました');
    } catch {
      alert('コピーに失敗しました');
    }
  };

  const onShare = () => {
    const url = encodeURIComponent(window.location.href);
    const titleText = encodeURIComponent(title);

    const shareUrl = `https://twitter.com/intent/tweet?text=${titleText}&url=${url}`;

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const linkItems = [
    {
      icon: XIcon,
      tooltip: 'Xで共有する',
      onClick: onShare,
    },
    {
      icon: LinkIcon,
      tooltip: 'リンクをコピー',
      onClick: onCopy,
    },
  ];

  return (
    <div className={`w-full h-10 lg:my-2 flex ${justify} items-center gap-4`}>
      {linkItems.map((item) => (
        <Tooltip key={item.tooltip} content={item.tooltip}>
          <button
            className="opacity-50 hover:cursor-pointer hover:opacity-100 duration-200"
            onClick={item.onClick}
          >
            <Image src={item.icon} alt={item.tooltip} width={16} height={16} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

export default Links;
