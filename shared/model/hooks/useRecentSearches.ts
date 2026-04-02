'use client';

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'k_search_recent';
const MAX_ITEMS = 10;

function loadFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(loadFromStorage);

  const addSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setSearches((prev) => {
      const next = [trimmed, ...prev.filter((s) => s !== trimmed)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeSearch = useCallback((term: string) => {
    setSearches((prev) => {
      const next = prev.filter((s) => s !== term);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setSearches([]);
  }, []);

  return { searches, addSearch, removeSearch, clearAll };
}
