'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';
import { cn } from '@/lib/utils';
import { useMarkdownEditor } from '@/hooks/admin/editor/useMarkdownEditor';

function MDContent({ className }: { className?: string }) {
  const { state, actions, ui } = usePostEditor();
  const { containerRef, viewRef } = useMarkdownEditor(
    state.content,
    actions.setContent,
    state.isPreview
  );

  // viewRef を Context に接続
  useEffect(() => {
    if (viewRef.current && ui.editorViewRef) {
      ui.editorViewRef.current = viewRef.current;
    }
  }, [viewRef, ui.editorViewRef]);

  return (
    <div className={cn('w-full flex-1 min-h-0 py-10', className)}>
      {state.isPreview ? (
        <article className="prose max-w-none my-0">
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
