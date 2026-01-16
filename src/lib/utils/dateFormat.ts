/**
 * 日付文字列を日本語形式に整形するユーティリティ関数
 */

/**
 * ISO 8601形式の日付文字列をyyyy年mm月dd日 hh時mm分形式に変換
 * @param dateString - ISO 8601形式の日付文字列（例：'2024-01-10T09:00:00Z'）
 * @returns 整形された日付文字列（例：'2024年01月10日 09時00分'）
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  // 年月日時分を取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // yyyy年mm月dd日 hh時mm分形式に結合
  return `${year}年${month}月${day}日 ${hours}時${minutes}分`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // 年月日を取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // yyyy年mm月dd日形式に結合
  return `${year}年${month}月${day}日`;
};
