'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useHospitalSuggestions } from 'entities/hospital/api/queries/use-hospital-suggestions';

interface UseSearchBarV2Props {
  lang: Locale;
  initialValue: string;
  onSearch?: (searchTerm: string) => void;
  searchPath: string;
}

export function useSearchBarV2({ lang, initialValue, onSearch, searchPath }: UseSearchBarV2Props) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const hasInteracted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    hasInteracted.current = false;
    setSearchTerm(initialValue);
  }, [initialValue]);

  // 200ms 디바운스 — 사용자가 직접 입력한 경우에만 자동완성 표시
  useEffect(() => {
    const trimmed = searchTerm.trim();
    const timer = setTimeout(() => {
      setDebouncedQuery(trimmed);
      if (hasInteracted.current) {
        setShowSuggestions(trimmed.length > 0);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: suggestions = [] } = useHospitalSuggestions(debouncedQuery, lang);

  const handleSearch = (term?: string) => {
    const trimmedSearch = (term ?? searchTerm).trim();
    setShowSuggestions(false);

    if (onSearch) {
      onSearch(trimmedSearch);
      return;
    }

    const params = new URLSearchParams(searchParams?.toString() || '');
    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    const queryString = params.toString();
    router.push(`${searchPath}${queryString ? `?${queryString}` : ''}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hasInteracted.current = true;
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) setShowSuggestions(true);
  };

  return {
    searchTerm,
    debouncedQuery,
    showSuggestions,
    suggestions,
    containerRef,
    handleSearch,
    handleSuggestionClick,
    handleKeyDown,
    handleInputChange,
    handleInputFocus,
  };
}
