import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime } from '@/lib/utils/dateFormat';

describe('formatDateTime', () => {
  it('UTC（Z 付き）の日時を JST の yyyy年mm月dd日 hh時mm分 に変換する', () => {
    expect(formatDateTime('2024-01-10T09:00:00Z')).toBe(
      '2024年01月10日 18時00分'
    );
  });

  it('タイムゾーン情報がない日時は UTC として解釈する', () => {
    expect(formatDateTime('2024-01-10T09:00:00')).toBe(
      '2024年01月10日 18時00分'
    );
  });

  it('オフセット付きの日時はそのオフセットを尊重する', () => {
    expect(formatDateTime('2024-01-10T09:00:00+09:00')).toBe(
      '2024年01月10日 09時00分'
    );
  });

  it('JST 変換で日付・年をまたぐ場合は繰り上がった日付になる', () => {
    expect(formatDateTime('2024-12-31T15:00:00Z')).toBe(
      '2025年01月01日 00時00分'
    );
  });

  it('不正な日付文字列は「日付エラー」を返す', () => {
    expect(formatDateTime('invalid-date')).toBe('日付エラー');
  });
});

describe('formatDate', () => {
  it('UTC の日時を JST の yyyy年mm月dd日 に変換する', () => {
    expect(formatDate('2024-01-10T09:00:00Z')).toBe('2024年01月10日');
  });

  it('タイムゾーン情報がない日時は UTC として解釈する', () => {
    expect(formatDate('2024-01-10T14:59:59')).toBe('2024年01月10日');
    expect(formatDate('2024-01-10T15:00:00')).toBe('2024年01月11日');
  });

  it('不正な日付文字列は「日付エラー」を返す', () => {
    expect(formatDate('')).toBe('日付エラー');
  });
});
