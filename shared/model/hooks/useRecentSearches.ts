'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'k_search_recent';
const SYNC_EVENT = 'k_search_recent_changed';
const MAX_ITEMS = 10;

function loadFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAndNotify(next: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  setTimeout(() => window.dispatchEvent(new Event(SYNC_EVENT)), 0);
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(loadFromStorage);

  useEffect(() => {
    const sync = () => setSearches(loadFromStorage());
    window.addEventListener(SYNC_EVENT, sync);
    return () => window.removeEventListener(SYNC_EVENT, sync);
  }, []);

  const addSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setSearches((prev) => {
      const next = [trimmed, ...prev.filter((s) => s !== trimmed)].slice(0, MAX_ITEMS);
      saveAndNotify(next);
      return next;
    });
  }, []);

  const removeSearch = useCallback((term: string) => {
    setSearches((prev) => {
      const next = prev.filter((s) => s !== term);
      saveAndNotify(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    saveAndNotify([]);
    setSearches([]);
  }, []);

  return { searches, addSearch, removeSearch, clearAll };
}
