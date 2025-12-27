'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import { cn } from '@/lib/utils';
import { MarkdownEditor } from '@/components/editor/MarkdownEditor';

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
        <MarkdownEditor value={state.content} onChange={actions.setContent} />
      )}
    </div>
  );
}

export default MDContent;
