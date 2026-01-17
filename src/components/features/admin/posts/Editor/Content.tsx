'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePostEditorContext } from '@/hooks/admin/posts/usePostEditorContext';
import { cn } from '@/lib/utils';
import { useMarkdownEditor } from '@/hooks/admin/editor/useMarkdownEditor';

function MDContent({ className }: { className?: string }) {
  const { state, actions, ui } = usePostEditorContext();
  const { containerRef, viewRef } = useMarkdownEditor(
    state.content,
    actions.setContent,
    state.isPreview
  );

  // viewRef を Context に接続
  useEffect(() => {
    if (viewRef.current && ui.editorViewRef) {
      // eslint-disable-next-line react-hooks/immutability
      ui.editorViewRef.current = viewRef.current;
    }
  }, [viewRef, ui.editorViewRef, state.isPreview]);

  return (
    <div className={cn('w-full flex-1 min-h-0 py-10', className)}>
      {state.isPreview ? (
        <article className="markdown-body max-w-none my-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {state.content}
          </ReactMarkdown>
        </article>
      ) : (
        <div ref={containerRef} className="w-full h-full" />
      )}
    </div>
  );
}

export default MDContent;
