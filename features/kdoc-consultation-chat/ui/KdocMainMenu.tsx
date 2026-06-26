import { type Dictionary } from 'shared/model/types';
import { CATEGORY_KEYS, type KdocChatCategory } from '../lib/chat-constants';
import { type CmsMenuItem } from '../model/useKdocCmsContent';

interface KdocMainMenuProps {
  dict: Dictionary;
  cmsMenus: CmsMenuItem[] | null;
  onSelect: (category: KdocChatCategory, label: string) => void;
}

export function KdocMainMenu({ dict, cmsMenus, onSelect }: KdocMainMenuProps) {
  const fallbackLabels = dict.kdocChat.categories;

  const items = cmsMenus
    ? cmsMenus.map((m) => ({ key: m.key as KdocChatCategory, label: m.label }))
    : CATEGORY_KEYS.map((key) => ({ key, label: fallbackLabels[key] }));

  return (
    <div className='mb-4 flex flex-col items-start gap-2 pl-[38px]'>
      {items.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key, label)}
          className='rounded-full border border-[#c0bfff] bg-[#f1eeff] px-4 py-2 text-sm font-medium text-[#7657ff]'
        >
          {label}
        </button>
      ))}
    </div>
  );
}
