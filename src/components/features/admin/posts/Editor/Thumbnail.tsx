'use client';

import React from 'react';
import { CardContent } from '@/components/ui/card';
import Image from 'next/image';
import thumbnailIcon from '@/assets/images/thumbnail-icon.png';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import { Progress } from '@/components/ui/progress';

function Thumbnail() {
  const { state, actions, ui } = usePostEditor();

  return (
    <CardContent className="w-full h-80 p-4 flex items-center justify-center">
      <div className="w-full h-full rounded-lg relative">
        {!state.isLoading && state.thumbnailUrl && (
          <Image
            src={state.thumbnailUrl}
            alt={state.altText ?? 'thumbnail'}
            unoptimized
            fill
            className="object-contain rounded-lg"
            onClick={actions.handleDeleteThumbnail}
          />
        )}
        {!state.isLoading && !state.thumbnailUrl && (
          <Image
            src={thumbnailIcon}
            alt="thumbnail"
            width={40}
            height={40}
            className="absolute top-1/2 left-30 -translate-y-1/2 hover:cursor-pointer hover:opacity-60 duration-200"
            onClick={actions.handleThumbnailClick}
          />
        )}
        {state.isLoading && (
          <div className="absolute inset-0 rounded-lg flex flex-col items-center justify-center z-10">
            <Progress value={state.progress} className="w-3/4 mb-4" />
            <span className="text-sm">
              {state.loadingType === 'delete'
                ? '削除中...'
                : 'アップロード中...'}
            </span>
          </div>
        )}
        <input
          ref={ui.thumbnailInputRef}
          type="file"
          className="hidden"
          onChange={actions.handleFileChange}
          disabled={state.isLoading}
        />
      </div>
    </CardContent>
  );
}

export default Thumbnail;
