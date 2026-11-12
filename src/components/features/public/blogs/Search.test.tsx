import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import Search from '@/components/features/public/blogs/Search';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const push = vi.fn();

const searchWith = async (input: string) => {
  const user = userEvent.setup();
  render(<Search />);
  await user.click(screen.getByAltText('search'));
  const textbox = screen.getByPlaceholderText('Search');
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
