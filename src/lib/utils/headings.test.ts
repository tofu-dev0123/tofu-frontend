import { describe, expect, it } from 'vitest';
import { extractHeadings } from '@/lib/utils/headings';

const createContainer = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
};

describe('extractHeadings', () => {
  it('h1〜h3 を文書順に抽出し、要素に id を付与する', () => {
    const container = createContainer(
      '<h1>背景</h1><p>本文</p><h2>課題</h2><h3>詳細</h3>'
    );

    expect(extractHeadings(container)).toEqual([
      { id: '背景', text: '背景', level: 1 },
      { id: '課題', text: '課題', level: 2 },
      { id: '詳細', text: '詳細', level: 3 },
    ]);
    expect(container.querySelector('h2')).toHaveAttribute('id', '課題');
  });

  it('空白は - に置き換え、記号を除いて小文字化する', () => {
    const container = createContainer('<h2>Next.js の ISR!</h2>');

    expect(extractHeadings(container)[0].id).toBe('nextjs-の-isr');
  });

  it('文言が重複した見出しには連番を付ける', () => {
    const container = createContainer(
      '<h2>まとめ</h2><h2>まとめ</h2><h2>まとめ</h2>'
    );

    expect(extractHeadings(container).map((h) => h.id)).toEqual([
      'まとめ',
      'まとめ-1',
      'まとめ-2',
    ]);
  });

  it('空の見出しは heading-<連番> を id にする', () => {
    const container = createContainer('<h2>はじめに</h2><h2></h2>');

    expect(extractHeadings(container)[1].id).toBe('heading-1');
  });

  it('インラインタグを含む見出しは文言だけを取り出す', () => {
    const container = createContainer(
      '<h2><code>cache()</code> の<a href="#">範囲</a></h2>'
    );

    expect(extractHeadings(container)[0].text).toBe('cache() の範囲');
  });

  it('h4 以下は対象外にする', () => {
    const container = createContainer('<h4>a</h4><h5>b</h5><h6>c</h6>');

    expect(extractHeadings(container)).toEqual([]);
  });

  it('見出しがなければ空配列を返す', () => {
    const container = createContainer('<p>本文</p>');

    expect(extractHeadings(container)).toEqual([]);
  });
});
