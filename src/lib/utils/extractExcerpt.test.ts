import { describe, expect, it } from 'vitest';
import { extractExcerpt } from '@/lib/utils/extractExcerpt';

describe('extractExcerpt', () => {
  it('空文字は空文字を返す', () => {
    expect(extractExcerpt('')).toBe('');
  });

  it('HTML タグを取り除いたプレーンテキストを返す', () => {
    expect(
      extractExcerpt('<h1>見出し</h1><p>本文<strong>強調</strong></p>')
    ).toBe('見出し本文強調');
  });

  it('script / style 要素は中身ごと取り除く', () => {
    const html =
      '<p>前</p><script>alert(1)</script><STYLE type="text/css">p{}</STYLE><p>後</p>';
    expect(extractExcerpt(html)).toBe('前後');
  });

  it('HTML エンティティをデコードする', () => {
    expect(
      extractExcerpt('&lt;a&gt; &amp; &quot;b&quot; &#39;c&#39;&nbsp;d')
    ).toBe('<a> & "b" \'c\' d');
  });

  it('連続する空白・改行を 1 つの空白にまとめ、前後の空白を除く', () => {
    expect(extractExcerpt('\n  <p>a</p>\n\n<p>b\t c</p>  ')).toBe('a b c');
  });

  it('最大文字数ちょうどの場合は切り詰めない', () => {
    expect(extractExcerpt('abcde', 5)).toBe('abcde');
  });

  it('最大文字数を超える場合は切り詰めて末尾に「…」を付ける', () => {
    expect(extractExcerpt('abcdef', 5)).toBe('abcde…');
  });

  it('最大文字数を省略した場合は 120 文字で切り詰める', () => {
    const text = 'あ'.repeat(121);
    expect(extractExcerpt(text)).toBe('あ'.repeat(120) + '…');
    expect(extractExcerpt('あ'.repeat(120))).toBe('あ'.repeat(120));
  });
});
