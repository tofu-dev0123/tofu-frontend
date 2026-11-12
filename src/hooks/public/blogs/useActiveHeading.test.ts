import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useActiveHeading from '@/hooks/public/blogs/useActiveHeading';

const setWindow = (key: 'innerHeight' | 'scrollY', value: number) => {
  Object.defineProperty(window, key, { configurable: true, value });
};

const setScrollHeight = (value: number) => {
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    value,
  });
};

// 見出し要素を作り、画面上端からの位置（top）を差し替えられるようにする
const createHeadings = (tops: Record<string, number>) => {
  Object.entries(tops).forEach(([id, top]) => {
    const el = document.createElement('h2');
    el.id = id;
    el.getBoundingClientRect = () => ({ top }) as DOMRect;
    document.body.appendChild(el);
  });
};

const setTop = (id: string, top: number) => {
  const el = document.getElementById(id);
  if (el) el.getBoundingClientRect = () => ({ top }) as DOMRect;
};

describe('useActiveHeading', () => {
  const originalInnerHeight = window.innerHeight;
  const originalScrollY = window.scrollY;

  beforeEach(() => {
    setWindow('innerHeight', 1000);
    setWindow('scrollY', 0);
    setScrollHeight(5000);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    setWindow('innerHeight', originalInnerHeight);
    setWindow('scrollY', originalScrollY);
    Reflect.deleteProperty(document.documentElement, 'scrollHeight');
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
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('b');
  });

  it('最下部までスクロールしたら最後の見出しの id を返す', () => {
    createHeadings({ a: -400, b: 100, c: 800 });
    setWindow('scrollY', 4000);

    const { result } = renderHook(() => useActiveHeading(['a', 'b', 'c']));

    expect(result.current).toBe('c');
  });

  it('見出しがなければ null を返す', () => {
    const { result } = renderHook(() => useActiveHeading([]));

    expect(result.current).toBeNull();
  });
});
