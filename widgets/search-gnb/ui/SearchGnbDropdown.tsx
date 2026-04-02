'use client';

import { SearchIconV2 } from 'shared/ui/search-bar/SearchIconV2';

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1 || !query) return <span>{text}</span>;
  return (
    <>
      {text.slice(0, idx)}
      <span className='font-semibold text-primary'>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function ClockIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M10.0026 17.9168C14.375 17.9168 17.9193 14.3725 17.9193 10.0002C17.9193 5.62779 14.375 2.0835 10.0026 2.0835C5.63023 2.0835 2.08594 5.62779 2.08594 10.0002C2.08594 14.3725 5.63023 17.9168 10.0026 17.9168Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M10 6.04199L10.0062 10.0043L13.1667 13.167'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M10 10L5 5M10 10L15 15M10 10L15 5M10 10L5 15'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

interface SearchGnbDropdownProps {
  recentSearches: string[];
  suggestions: string[];
  query: string;
  onItemClick: (term: string) => void;
  onRemoveRecent: (term: string) => void;
}

export function SearchGnbDropdown({
  recentSearches,
  suggestions,
  query,
  onItemClick,
  onRemoveRecent,
}: SearchGnbDropdownProps) {
  if (recentSearches.length === 0 && suggestions.length === 0) return null;

  return (
    <ul className='absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-2xl bg-white py-2 shadow-[0_4px_20px_rgba(0,0,0,0.12)]'>
      {recentSearches.map((term) => (
        <li key={`recent-${term}`} className='flex h-12 items-center hover:bg-neutral-50'>
          <button
            type='button'
            className='flex flex-1 items-center gap-4 px-4 text-left'
            onMouseDown={(e) => {
              e.preventDefault();
              onItemClick(term);
            }}
          >
            <span className='shrink-0'>
              <ClockIcon />
            </span>
            <span className='text-sm text-neutral-900'>
              <HighlightMatch text={term} query={query} />
            </span>
          </button>
          <button
            type='button'
            className='shrink-0 px-4 py-3'
            onMouseDown={(e) => {
              e.preventDefault();
              onRemoveRecent(term);
            }}
          >
            <CloseIcon />
          </button>
        </li>
      ))}
      {suggestions.map((text) => (
        <li key={`suggestion-${text}`}>
          <button
            type='button'
            className='flex h-12 w-full items-center gap-4 px-4 text-left hover:bg-neutral-50'
            onMouseDown={(e) => {
              e.preventDefault();
              onItemClick(text);
            }}
          >
            <span className='shrink-0'>
              <SearchIconV2 />
            </span>
            <span className='text-sm text-neutral-900'>
              <HighlightMatch text={text} query={query} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
