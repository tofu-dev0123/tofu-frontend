'use client';

import { useSyncExternalStore } from 'react';

// 画面上部からこの割合の位置を基準線とし、それより上にある最後の見出しを現在位置とする
const ACTIVE_LINE_RATIO = 0.3;

// 公開サイトは window ではなく PublicShell 内の要素がスクロールするため、
// scroll はキャプチャで拾い、どの要素のスクロールにも反応させる
const subscribe = (onChange: () => void) => {
  let frame = 0;
  const handle = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };

  const options = { capture: true, passive: true };
  document.addEventListener('scroll', handle, options);
  window.addEventListener('resize', handle);
  return () => {
    window.cancelAnimationFrame(frame);
    document.removeEventListener('scroll', handle, options);
    window.removeEventListener('resize', handle);
  };
};

const findScrollContainer = (el: HTMLElement): Element => {
  for (let node = el.parentElement; node; node = node.parentElement) {
    const { overflowY } = window.getComputedStyle(node);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
  }
  return document.scrollingElement ?? document.documentElement;
};

const isScrolledToBottom = (container: Element) => {
  const { scrollTop, scrollHeight, clientHeight } = container;
  return (
    scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight - 2
  );
};

const findActiveId = (ids: string[]): string | null => {
  const elements = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
  if (elements.length === 0) return ids[0] ?? null;

  // 末尾のセクションが短いと基準線に届かないため、最下部では最後の見出しにする
  if (isScrolledToBottom(findScrollContainer(elements[0]))) {
    return elements[elements.length - 1].id;
  }

  const line = window.innerHeight * ACTIVE_LINE_RATIO;
  let activeId = elements[0].id;
  for (const el of elements) {
    if (el.getBoundingClientRect().top <= line) activeId = el.id;
  }
  return activeId;
};

/**
 * スクロール位置から、現在読んでいる見出しの id を返す。
 */
function useActiveHeading(ids: string[]) {
  return useSyncExternalStore(
    subscribe,
    () => findActiveId(ids),
    () => null
  );
}

export default useActiveHeading;
