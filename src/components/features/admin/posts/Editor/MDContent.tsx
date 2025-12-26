'use client';

import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePostEditor } from '@/contexts/admin/posts/PostEditorContext';

function MDContent() {
  const { state, actions } = usePostEditor();

  return (
    <>
      {state.isPreview ? (
        <div className="w-full h-full py-10">
          <article className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {state.content}
            </ReactMarkdown>
          </article>
        </div>
      ) : (
        <div className="w-full h-full py-10">
          <TextareaAutosize
            minRows={20}
            placeholder="本文"
            className="w-full h-full text-md font-bold border-none focus:outline-none resize-none placeholder:text-gray-400"
            value={state.content}
            onChange={(e) => actions.setContent(e.target.value)}
          />
        </div>
      )}
    </>
  );
}

export default MDContent;
