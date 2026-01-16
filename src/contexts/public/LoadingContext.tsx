'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface LoadingContextType {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({
  children,
  isTop,
}: {
  children: React.ReactNode;
  isTop: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 既存のタイマーをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isTop) {
      // setTimeoutを使って非同期に状態を更新
      timeoutRef.current = setTimeout(() => {
        setIsLoading(true);
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }, 0);
    } else {
      // setTimeoutを使って非同期に状態を更新
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }

    // クリーンアップ関数
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTop]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
