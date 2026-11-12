import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import Search from '@/components/features/public/blogs/Search';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const push = vi.fn();

const openSearch = async () => {
  const user = userEvent.setup();
  render(<Search />);
  await user.click(screen.getByRole('button', { name: '検索を開く' }));
  // 開くアニメーションで入力欄が display: none から表示されるまで待つ
  await screen.findByRole('textbox', { name: '記事を検索' });
  return user;
};

const searchWith = async (input: string) => {
  const user = await openSearch();
  const textbox = screen.getByRole('textbox', { name: '記事を検索' });
  if (input) await user.type(textbox, input);
  await user.type(textbox, '{Enter}');
};

describe('Search', () => {
  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as ReturnType<typeof useRouter>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('初期状態では開閉トグルが閉じたボタンとして表示される', () => {
    render(<Search />);
    expect(screen.getByRole('button', { name: '検索を開く' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('開閉トグルをクリックすると開き、名前が「検索を閉じる」になる', async () => {
    await openSearch();
    expect(
      screen.getByRole('button', { name: '検索を閉じる' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('開いた状態で開閉トグルをクリックすると閉じる', async () => {
    const user = await openSearch();
    await user.click(screen.getByRole('button', { name: '検索を閉じる' }));
    expect(screen.getByRole('button', { name: '検索を開く' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('Tab でフォーカスして Enter で開ける', async () => {
    const user = userEvent.setup();
    render(<Search />);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(
      screen.getByRole('button', { name: '検索を閉じる' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('Tab でフォーカスして Space で開ける', async () => {
    const user = userEvent.setup();
    render(<Search />);
    await user.tab();
    await user.keyboard(' ');
    expect(
      screen.getByRole('button', { name: '検索を閉じる' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('入力欄に「記事を検索」という名前が付いている', async () => {
    await openSearch();
    expect(
      screen.getByRole('textbox', { name: '記事を検索' })
    ).toBeInTheDocument();
  });

  it('検索ボタンのクリックで遷移する', async () => {
    const user = await openSearch();
    await user.type(
      screen.getByRole('textbox', { name: '記事を検索' }),
      'react'
    );
    await user.click(screen.getByRole('button', { name: '検索' }));
    expect(push).toHaveBeenCalledWith('/blogs?keyword=react');
  });

  it('検索ボタンでもキーワードが空なら遷移しない', async () => {
    const user = await openSearch();
    await user.click(screen.getByRole('button', { name: '検索' }));
    expect(push).not.toHaveBeenCalled();
  });

  it('& を含むキーワードをエンコードして遷移する', async () => {
    await searchWith('a&b');
    expect(push).toHaveBeenCalledWith('/blogs?keyword=a%26b');
  });

  it('# を含むキーワードをエンコードして遷移する', async () => {
    await searchWith('C#');
    expect(push).toHaveBeenCalledWith('/blogs?keyword=C%23');
  });

  it('% を含むキーワードをエンコードして遷移する', async () => {
    await searchWith('100%');
    expect(push).toHaveBeenCalledWith('/blogs?keyword=100%25');
  });

  it('日本語のキーワードをエンコードして遷移する', async () => {
    await searchWith('日本語');
    expect(push).toHaveBeenCalledWith(
      '/blogs?keyword=%E6%97%A5%E6%9C%AC%E8%AA%9E'
    );
  });

  it('前後の空白を除いたキーワードで遷移する', async () => {
    await searchWith('  react  ');
    expect(push).toHaveBeenCalledWith('/blogs?keyword=react');
  });

  it('空のときは遷移しない', async () => {
    await searchWith('');
    expect(push).not.toHaveBeenCalled();
  });

  it('空白だけのときは遷移しない', async () => {
    await searchWith('   ');
    expect(push).not.toHaveBeenCalled();
  });
});
