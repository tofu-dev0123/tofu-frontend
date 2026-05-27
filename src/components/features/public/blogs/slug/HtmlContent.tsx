'use client';

import { useEffect, useRef } from 'react';
import { renderMermaid } from '@/lib/mermaid';

export default function HtmlContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLElement>(null);

  // サーバ生成 HTML 内の ```mermaid ブロックを図に差し替える。
  // 個別ブロックの構文エラーは握りつぶし、本文全体は壊さない。
  useEffect(() => {
    const blocks = containerRef.current?.querySelectorAll<HTMLElement>(
      'code.language-mermaid'
    );
    if (!blocks) return;

    let active = true;

    blocks.forEach(async (codeEl, index) => {
      const target = codeEl.closest('pre') ?? codeEl;
      const source = codeEl.textContent ?? '';
      try {
        const svg = await renderMermaid(`mermaid-blog-${index}`, source);
        if (!active) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'mermaid';
        wrapper.innerHTML = svg;
        target.replaceWith(wrapper);
      } catch {
        // 構文エラー時は元のコードブロックをそのまま残す
      }
    });

    return () => {
      active = false;
    };
  }, [html]);

  return (
    <article
      ref={containerRef}
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
