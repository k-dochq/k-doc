import { SearchIconV2 } from '../SearchIconV2';

interface SuggestionItemProps {
  text: string;
  query: string;
  onClick: () => void;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <>
      {text.slice(0, idx)}
      <span className='font-semibold text-primary'>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SuggestionItem({ text, query, onClick }: SuggestionItemProps) {
  return (
    <button
      type='button'
      className='flex h-12 w-full items-center gap-4 px-4 text-left hover:bg-neutral-50'
      onMouseDown={(e) => {
        e.preventDefault(); // input blur 방지
        onClick();
      }}
    >
      <span className='shrink-0'>
        <SearchIconV2 />
      </span>
      <span className='text-sm text-neutral-900'>
        <HighlightMatch text={text} query={query} />
      </span>
    </button>
  );
}
