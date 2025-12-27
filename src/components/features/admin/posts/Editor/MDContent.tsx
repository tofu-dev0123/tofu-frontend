'use client';

import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import { cn } from '@/lib/utils';

function MDContent({ className }: { className?: string }) {
  const { state, actions } = usePostEditor();

  return (
    <div className={cn('w-full flex-1 min-h-0 py-10', className)}>
      {state.isPreview ? (
        <article className="prose max-w-none my-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {state.content}
          </ReactMarkdown>
        </article>
      ) : (
        <TextareaAutosize
          minRows={20}
          placeholder="本文"
          className="w-full h-full text-md font-bold border-none focus:outline-none resize-none placeholder:text-gray-400"
          value={state.content}
          onChange={(e) => actions.setContent(e.target.value)}
          onKeyDown={actions.handleContentKeyDown}
        />
      )}
    </div>
  );
}

export default MDContent;
