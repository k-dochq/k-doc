'use client';

function SearchIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M17.5 17.5L12.5 12.5M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

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
              <SearchIcon />
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
