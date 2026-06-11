import { type Dictionary } from 'shared/model/types';
import { CATEGORY_KEYS, type KdocChatCategory } from '../lib/chat-constants';

interface KdocMainMenuProps {
  dict: Dictionary;
  onSelect: (category: KdocChatCategory, label: string) => void;
}

export function KdocMainMenu({ dict, onSelect }: KdocMainMenuProps) {
  const labels = dict.kdocChat.categories;
  return (
    <div className='mb-4 flex flex-col items-start gap-2 pl-[38px]'>
      {CATEGORY_KEYS.map((key) => {
        const label = labels[key];
        return (
          <button
            key={key}
            onClick={() => onSelect(key, label)}
            className='rounded-full border border-[#c0bfff] bg-[#f1eeff] px-4 py-2 text-sm font-medium text-[#7657ff]'
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
