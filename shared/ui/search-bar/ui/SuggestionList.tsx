import { SuggestionItem } from './SuggestionItem';

interface SuggestionListProps {
  suggestions: string[];
  query: string;
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestionList({ suggestions, query, onSuggestionClick }: SuggestionListProps) {
  if (suggestions.length === 0) return null;
  return (
    <ul className='absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-2xl bg-white py-2 shadow-[0_4px_20px_rgba(0,0,0,0.12)]'>
      {suggestions.map((suggestion, i) => (
        <li key={i}>
          <SuggestionItem
            text={suggestion}
            query={query}
            onClick={() => onSuggestionClick(suggestion)}
          />
        </li>
      ))}
    </ul>
  );
}
