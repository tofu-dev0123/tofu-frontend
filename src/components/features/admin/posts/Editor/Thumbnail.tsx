import React from 'react';
import { CardContent } from '@/components/ui/card';
import Image from 'next/image';
import thumbnailIcon from '@/assets/images/thumbnail-icon.png';

interface ThumbnailProps {
  onUpload: () => void;
}

function Thumbnail({ onUpload }: ThumbnailProps) {
  return (
    <CardContent className="w-full h-80 p-4 flex items-center justify-center">
      <div className="w-full h-full rounded-lg relative">
        <Image
          src={thumbnailIcon}
          alt="thumbnail"
          width={40}
          height={40}
          className="absolute top-1/2 left-30 -translate-y-1/2 hover:cursor-pointer hover:opacity-60 duration-200"
          onClick={onUpload}
        />
      </div>
    </CardContent>
  );
}

export default Thumbnail;
