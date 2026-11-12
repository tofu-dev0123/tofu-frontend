'use client';

import { useLayoutEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import useIsMobile from '@/hooks/public/common/useIsMobile';
import useActiveHeading from '@/hooks/public/blogs/useActiveHeading';
import type { Heading } from '@/lib/utils/headings';

const LEVEL_CLASS: Record<Heading['level'], string> = {
  1: 'pl-4 text-xs font-medium',
  2: 'pl-7 text-xs',
  3: 'pl-10 text-[11px]',
};

function TableOfContents({ headings }: { headings: Heading[] }) {
  const isMobile = useIsMobile();
  const activeId = useActiveHeading(headings.map((h) => h.id));
  const listRef = useRef<HTMLOListElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  // 現在の項目に縦線上のマーカーを合わせる。
  // 幅の変化やフォント読み込みで項目の折り返しが変わったときも位置を取り直す
  useLayoutEffect(() => {
    const marker = markerRef.current;
    const list = listRef.current;
    if (!marker || !list) return;

    const updateMarker = () => {
      const link = list.querySelector<HTMLAnchorElement>(
        '[aria-current="location"]'
      );
      marker.hidden = !link;
      if (link) {
        marker.style.top = `${link.offsetTop}px`;
        marker.style.height = `${link.offsetHeight}px`;
      }
    };

    updateMarker();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateMarker);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeId, headings, isMobile]);

  if (isMobile || headings.length === 0) return null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    // キーボード操作で次の Tab が移動先の続きから始まるよう、フォーカスも移す
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav
      aria-label="目次"
      className="fixed right-[10%] top-25 bottom-0 w-[10%] py-10"
    >
      <div className="relative max-h-full overflow-y-auto border-l border-black/10">
        <p className="pl-4 mb-3 text-[11px] tracking-[0.12em] uppercase text-gray-500">
          Contents
        </p>
        <ol ref={listRef} className="flex flex-col gap-0.5">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block py-1 pr-2 leading-normal break-words transition-all duration-300 motion-reduce:transition-none hover:opacity-100 hover:-translate-x-0.5 ${LEVEL_CLASS[heading.level]} ${isActive ? 'opacity-100 font-bold' : 'opacity-45'}`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ol>
        <span
          ref={markerRef}
          aria-hidden="true"
          className="absolute -left-px w-0.5 bg-black transition-all duration-300 motion-reduce:transition-none"
        />
      </div>
    </nav>
  );
}

export default TableOfContents;
