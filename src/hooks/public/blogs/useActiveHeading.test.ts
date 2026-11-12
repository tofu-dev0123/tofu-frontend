import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useActiveHeading from '@/hooks/public/blogs/useActiveHeading';

type ScrollMetrics = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

const setScrollMetrics = (el: Element, metrics: ScrollMetrics) => {
  Object.entries(metrics).forEach(([key, value]) => {
    Object.defineProperty(el, key, { configurable: true, value });
  });
};

const resetScrollMetrics = (el: Element) => {
  ['scrollTop', 'scrollHeight', 'clientHeight'].forEach((key) =>
    Reflect.deleteProperty(el, key)
  );
};

// 見出し要素を作り、画面上端からの位置（top）を差し替えられるようにする
const createHeadings = (
  tops: Record<string, number>,
  parent: HTMLElement = document.body
) => {
  Object.entries(tops).forEach(([id, top]) => {
    const el = document.createElement('h2');
    el.id = id;
    el.getBoundingClientRect = () => ({ top }) as DOMRect;
    parent.appendChild(el);
  });
};

const setTop = (id: string, top: number) => {
  const el = document.getElementById(id);
  if (el) el.getBoundingClientRect = () => ({ top }) as DOMRect;
};

describe('useActiveHeading', () => {
  const originalInnerHeight = window.innerHeight;
  const root = document.scrollingElement ?? document.documentElement;

  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 1000,
    });
    setScrollMetrics(root, {
      scrollTop: 0,
      scrollHeight: 5000,
      clientHeight: 1000,
    });
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    });
    resetScrollMetrics(root);
    vi.restoreAllMocks();
  });

  it('基準線より上にある最後の見出しの id を返す', () => {
    createHeadings({ a: -100, b: 100, c: 500 });

    const { result } = renderHook(() => useActiveHeading(['a', 'b', 'c']));

    expect(result.current).toBe('b');
  });

  it('すべての見出しが基準線より下なら先頭の id を返す', () => {
    createHeadings({ a: 400, b: 800 });

    const { result } = renderHook(() => useActiveHeading(['a', 'b']));

    expect(result.current).toBe('a');
  });

  it('スクロールすると現在の見出しが切り替わる', () => {
    createHeadings({ a: 100, b: 600 });
    const { result } = renderHook(() => useActiveHeading(['a', 'b']));

    act(() => {
      setTop('a', -400);
      setTop('b', 100);
      document.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('b');
  });

  it('最下部までスクロールしたら最後の見出しの id を返す', () => {
    createHeadings({ a: -400, b: 100, c: 800 });
    setScrollMetrics(root, {
      scrollTop: 4000,
      scrollHeight: 5000,
      clientHeight: 1000,
    });

    const { result } = renderHook(() => useActiveHeading(['a', 'b', 'c']));

    expect(result.current).toBe('c');
  });

  it('スクロールする要素の中でも、最下部では最後の見出しの id を返す', () => {
    const container = document.createElement('div');
    container.style.overflowY = 'auto';
    document.body.appendChild(container);
    createHeadings({ a: -400, b: 100, c: 800 }, container);
    setScrollMetrics(container, {
      scrollTop: 0,
      scrollHeight: 5000,
      clientHeight: 1000,
    });
    const { result } = renderHook(() => useActiveHeading(['a', 'b', 'c']));

    act(() => {
      setScrollMetrics(container, {
        scrollTop: 4000,
        scrollHeight: 5000,
        clientHeight: 1000,
      });
      container.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('c');
  });

  it('見出しがなければ null を返す', () => {
    const { result } = renderHook(() => useActiveHeading([]));

    expect(result.current).toBeNull();
  });
});
