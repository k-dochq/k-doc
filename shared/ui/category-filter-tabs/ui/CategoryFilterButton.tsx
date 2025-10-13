'use client';

import { type Locale } from 'shared/config';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type LocalizedText, extractLocalizedText } from 'shared/lib/localized-text';

interface CategoryFilterButtonProps {
  category: {
    id: MedicalSpecialtyType | 'ALL';
    name: LocalizedText;
  };
  lang: Locale;
  isSelected: boolean;
  onClick: (categoryId: MedicalSpecialtyType | 'ALL') => void;
}

export function CategoryFilterButton({
  category,
  lang,
  isSelected,
  onClick,
}: CategoryFilterButtonProps) {
  const getLabel = (category: { name: LocalizedText }): string => {
    return extractLocalizedText(category.name, lang);
  };

  return (
    <button
      onClick={() => onClick(category.id)}
      className={`flex min-w-[43px] shrink-0 items-center justify-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors align-middle ${
        isSelected
          ? 'bg-primary hover:bg-primary/80 text-white border border-transparent'
          : 'border border-neutral-200 bg-white text-black hover:bg-neutral-100'
      }`}
    >
      <span className='leading-4'>{getLabel(category)}</span>
    </button>
  );
}
