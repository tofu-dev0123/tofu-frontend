import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TableOfContents from '@/components/features/public/blogs/slug/TableOfContents';
import type { Heading } from '@/lib/utils/headings';

const HEADINGS: Heading[] = [
  { id: '背景', text: '背景', level: 1 },
  { id: '課題', text: '課題', level: 2 },
  { id: '詳細', text: '詳細', level: 3 },
];

const setInnerWidth = (value: number) => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value });
};

// 本文側の見出し要素を用意し、画面上端からの位置（top）を指定する
const createHeadingElements = (tops: number[]) =>
  HEADINGS.map((heading, i) => {
    const el = document.createElement('h2');
    el.id = heading.id;
    el.getBoundingClientRect = () => ({ top: tops[i] }) as DOMRect;
    document.body.appendChild(el);
    return el;
  });

describe('TableOfContents', () => {
  const originalInnerWidth = window.innerWidth;

  // useIsMobile は innerWidth < 1024 をモバイルと判定する
  beforeEach(() => {
    setInnerWidth(1280);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    setInnerWidth(originalInnerWidth);
    window.history.replaceState(null, '', '/');
    vi.restoreAllMocks();
  });

  it('見出しごとにアンカーリンクを表示する', () => {
    render(<TableOfContents headings={HEADINGS} />);

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '#背景',
      '#課題',
      '#詳細',
    ]);
  });

  it('見出しがなければ何も表示しない', () => {
    render(<TableOfContents headings={[]} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('モバイル幅では表示しない', () => {
    setInnerWidth(800);

    render(<TableOfContents headings={HEADINGS} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('現在読んでいる見出しを強調する', () => {
    createHeadingElements([-200, 50, 600]);

    render(<TableOfContents headings={HEADINGS} />);

    expect(screen.getByRole('link', { name: '課題' })).toHaveAttribute(
      'aria-current',
      'location'
    );
    expect(screen.getByRole('link', { name: '背景' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('クリックすると見出しへ移動し、URL のハッシュを更新する', async () => {
    const user = userEvent.setup();
    const [, target] = createHeadingElements([0, 600, 1200]);
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;

    render(<TableOfContents headings={HEADINGS} />);
    await user.click(screen.getByRole('link', { name: '課題' }));

    expect(scrollIntoView).toHaveBeenCalled();
    expect(decodeURIComponent(window.location.hash)).toBe('#課題');
  });
});
