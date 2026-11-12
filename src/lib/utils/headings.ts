export type Heading = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

// ASCII 記号（`-` と `_` を除く）
const SYMBOLS = /[!-,./:-@[-^`{-~]/g;

const toSlug = (text: string) =>
  text.trim().toLowerCase().replace(SYMBOLS, '').replace(/\s+/g, '-');

/**
 * 本文中の h1〜h3 を文書順に抽出し、目次用の id を付与する。
 * id は見出しの文言から作り、空なら `heading-<連番>`、重複したら `-1`, `-2` を付ける。
 */
export const extractHeadings = (container: HTMLElement): Heading[] => {
  const used = new Set<string>();

  return Array.from(
    container.querySelectorAll<HTMLHeadingElement>('h1, h2, h3')
  ).map((el, index) => {
    const text = (el.textContent ?? '').trim();
    const base = toSlug(text) || `heading-${index}`;

    let id = base;
    for (let n = 1; used.has(id); n++) {
      id = `${base}-${n}`;
    }
    used.add(id);
    el.id = id;

    return { id, text, level: Number(el.tagName[1]) as Heading['level'] };
  });
};
