'use client';

import { useRouter } from 'next/navigation';

interface PaginationProps {
  page: number;
  totalPages: number;
  keyword: string | null;
}

function getPageNumbers(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [];
  const left = Math.max(2, page - 1);
  const right = Math.min(totalPages - 1, page + 1);

  pages.push(1);

  if (left > 2) {
    pages.push('...');
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
}

export default function Pagination({ page, totalPages, keyword }: PaginationProps) {
  const router = useRouter();

  const buildUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    params.append('page', targetPage.toString());
    return `/blogs?${params.toString()}`;
  };

  const isFirst = page === 1;
  const isLast = page === totalPages;

  const pageNumbers = getPageNumbers(page, totalPages);

  const boxBase = 'w-9 h-9 flex items-center justify-center text-sm font-sub-logo rounded-sm';

  return (
    <div className="flex items-center justify-end gap-1 py-6">
      {!isFirst && (
        <button
          onClick={() => router.push(buildUrl(page - 1))}
          className={`${boxBase} bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors`}
        >
          {'<'}
        </button>
      )}

      {pageNumbers.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-gray-400">
            ...
          </span>
        ) : p === page ? (
          <span key={p} className={`${boxBase} bg-gray-200 text-gray-400 cursor-default`}>
            {p}
          </span>
        ) : (
          <button
            key={p}
            onClick={() => router.push(buildUrl(p))}
            className={`${boxBase} bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors`}
          >
            {p}
          </button>
        )
      )}

      {!isLast && (
        <button
          onClick={() => router.push(buildUrl(page + 1))}
          className={`${boxBase} bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors`}
        >
          {'>'}
        </button>
      )}
    </div>
  );
}
