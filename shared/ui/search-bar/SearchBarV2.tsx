'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useSearchBarV2 } from './model/useSearchBarV2';
import { SearchInput } from './ui/SearchInput';
import { SuggestionList } from './ui/SuggestionList';

interface SearchBarV2Props {
  lang: Locale;
  dict: Dictionary;
  initialValue?: string;
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  searchPath?: string; // 기본: /hospitals
  searchQueryParam?: 'search' | 'q';
}

export function SearchBarV2({
  lang,
  dict,
  initialValue = '',
  placeholder,
  onSearch,
  searchPath = '/hospitals',
  searchQueryParam = 'search',
}: SearchBarV2Props) {
  const {
    searchTerm,
    debouncedQuery,
    showSuggestions,
    suggestions,
    containerRef,
    handleSuggestionClick,
    handleKeyDown,
    handleInputChange,
    handleInputFocus,
  } = useSearchBarV2({ lang, initialValue, onSearch, searchPath, searchQueryParam });

  return (
    <div className='relative w-full' ref={containerRef} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SearchInput
        value={searchTerm}
        placeholder={placeholder || dict.search.placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
      />
      {showSuggestions && (
        <SuggestionList
          suggestions={suggestions}
          query={debouncedQuery}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
}
