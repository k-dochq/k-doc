import { CATEGORIES, type KdocChatCategory } from '../lib/chat-constants';

interface KdocCategoryChipsProps {
  onSelect: (category: KdocChatCategory) => void;
}

export function KdocCategoryChips({ onSelect }: KdocCategoryChipsProps) {
  return (
    <div className='mb-4 flex flex-col items-start gap-2 pl-[38px]'>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelect(cat.key)}
          className='rounded-full border border-[#c0bfff] bg-[#f1eeff] px-4 py-2 text-sm font-medium text-[#7657ff]'
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
