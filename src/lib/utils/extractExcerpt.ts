/**
 * HTML 文字列から meta description 用のプレーンテキスト抜粋を生成する
 */

const DEFAULT_MAX_LENGTH = 120;
const ELLIPSIS = '…';

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

const decodeEntities = (text: string): string =>
  text.replace(
    /&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g,
    (matched) => HTML_ENTITIES[matched] ?? matched
  );

/**
 * HTML 文字列からタグを取り除き、指定文字数までのプレーンテキスト抜粋を返す
 * @param html - 変換対象の HTML 文字列
 * @param maxLength - 最大文字数（デフォルト 120）
 * @returns プレーンテキストの抜粋。切り詰めた場合は末尾に「…」を付与する
 */
export const extractExcerpt = (
  html: string,
  maxLength: number = DEFAULT_MAX_LENGTH
): string => {
  if (!html) return '';

  const withoutScripts = html.replace(
    /<(script|style)[^>]*>[\s\S]*?<\/\1>/gi,
    ''
  );
  const withoutTags = withoutScripts.replace(/<[^>]*>/g, '');
  const decoded = decodeEntities(withoutTags);
  const normalized = decoded.replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) return normalized;

  return normalized.slice(0, maxLength) + ELLIPSIS;
};
