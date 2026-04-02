'use client';

import { useSearchParams } from 'next/navigation';
import { ChevronRightIcon } from 'shared/ui/chevron-right-icon';
import { SearchIcon } from 'shared/ui/icons';
import { useRouter } from 'next/navigation';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { useSearchBarV2 } from 'shared/ui/search-bar/model/useSearchBarV2';
import { useConcernSuggestions } from 'entities/review/api/queries/use-concern-suggestions';
import { useRecentSearches } from '../model/useRecentSearches';
import { SearchGnbDropdown } from './SearchGnbDropdown';

interface SearchGnbV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function SearchGnbV2({ lang, dict }: SearchGnbV2Props) {
  const router = useRouter();
  const localizedRouter = useLocalizedRouter();
  const searchParams = useSearchParams();
  const { searches, addSearch, removeSearch } = useRecentSearches();

  const {
    searchTerm: value,
    setSearchTerm,
    debouncedQuery,
    showSuggestions,
    setShowSuggestions,
    suggestions: hospitalSuggestions,
    containerRef,
    handleSearch,
    handleSuggestionClick,
    handleKeyDown,
    handleInputChange,
    handleInputFocus,
  } = useSearchBarV2({
    lang,
    initialValue: searchParams.get('q') ?? '',
    searchPath: '/v2/search',
    onSearch: (term: string) => {
      if (term) addSearch(term);
      const params = new URLSearchParams();
      if (term) params.set('q', term);
      localizedRouter.replace(`/v2/search${params.size ? `?${params.toString()}` : ''}`);
    },
  });

  const { data: concernSuggestions = [] } = useConcernSuggestions(debouncedQuery, lang);

  const suggestions = [
    ...hospitalSuggestions,
    ...concernSuggestions.filter((c) => !hospitalSuggestions.includes(c)),
  ]
    .sort((a, b) => {
      const q = debouncedQuery.toLowerCase();
      const aIdx = a.toLowerCase().indexOf(q);
      const bIdx = b.toLowerCase().indexOf(q);
      const aMatch = aIdx === -1 ? 0 : q.length / a.length;
      const bMatch = bIdx === -1 ? 0 : q.length / b.length;
      return bMatch - aMatch;
    })
    .slice(0, 8);

  const filteredRecentSearches = value.trim()
    ? searches.filter((s) => s.toLowerCase().includes(value.toLowerCase().trim())).slice(0, 3)
    : searches.slice(0, 5);

  const showDropdown =
    showSuggestions && (filteredRecentSearches.length > 0 || suggestions.length > 0);

  const handleFocus = () => {
    handleInputFocus();
    if (searches.length > 0) setShowSuggestions(true);
  };

  return (
    <div className='sticky top-0 z-50 flex h-[58px] w-full items-center gap-1 bg-white px-5 py-4'>
      <button
        type='button'
        onClick={() => router.back()}
        className='flex shrink-0 items-center justify-center'
      >
        <ChevronRightIcon size={24} color='#404040' className='rotate-180' />
      </button>
      <div ref={containerRef} className='relative flex min-w-0 flex-1'>
        <div className='flex min-w-0 flex-1 items-center gap-[6px] rounded-full border border-[#e5e5e5] bg-[#f1f1f1] px-4 py-2'>
          <input
            type='text'
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={dict.search?.placeholder}
            className="min-w-0 flex-1 bg-transparent font-['Pretendard'] text-base font-semibold leading-6 text-[#404040] outline-none placeholder:text-[#a3a3a3]"
          />
          {value.length > 0 ? (
            <button
              type='button'
              onClick={() => setSearchTerm('')}
              className='flex size-[20px] shrink-0 items-center justify-center rounded-full bg-[#737373]'
            >
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path d='M1 1L9 9M9 1L1 9' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
              </svg>
            </button>
          ) : (
            <button type='button' onClick={() => handleSearch()} className='flex shrink-0 items-center'>
              <SearchIcon size={20} color='#F15BFF' />
            </button>
          )}
        </div>
        {showDropdown && (
          <SearchGnbDropdown
            recentSearches={filteredRecentSearches}
            suggestions={suggestions}
            query={debouncedQuery}
            onItemClick={handleSuggestionClick}
            onRemoveRecent={removeSearch}
          />
        )}
      </div>
    </div>
  );
}
