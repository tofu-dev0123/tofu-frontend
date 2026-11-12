'use client';

import { useSyncExternalStore } from 'react';

// 画面上部からこの割合の位置を基準線とし、それより上にある最後の見出しを現在位置とする
const ACTIVE_LINE_RATIO = 0.3;

const subscribe = (onChange: () => void) => {
  let frame = 0;
  const handle = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };

  window.addEventListener('scroll', handle, { passive: true });
  window.addEventListener('resize', handle);
  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('scroll', handle);
    window.removeEventListener('resize', handle);
  };
};

const findActiveId = (ids: string[]): string | null => {
  if (ids.length === 0) return null;

  const { innerHeight, scrollY } = window;
  const { scrollHeight } = document.documentElement;

  // 末尾のセクションが短いと基準線に届かないため、最下部では最後の見出しにする
  if (scrollHeight > innerHeight && innerHeight + scrollY >= scrollHeight - 2) {
    return ids[ids.length - 1];
  }

  const line = innerHeight * ACTIVE_LINE_RATIO;
  let activeId = ids[0];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) activeId = id;
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
