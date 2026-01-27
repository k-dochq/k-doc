'use client';

import { type Locale } from 'shared/config';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type LocalizedText, extractLocalizedText } from 'shared/lib/localized-text';

interface CategoryFilterButtonV2Props {
  category: {
    id: MedicalSpecialtyType | 'ALL';
    name: LocalizedText;
  };
  lang: Locale;
  isSelected: boolean;
  onClick: (categoryId: MedicalSpecialtyType | 'ALL') => void;
}

export function CategoryFilterButtonV2({
  category,
  lang,
  isSelected,
  onClick,
}: CategoryFilterButtonV2Props) {
  const getLabel = (category: { name: LocalizedText }): string => {
    return extractLocalizedText(category.name, lang);
  };

  return (
    <button
      onClick={() => onClick(category.id)}
      className={`flex h-[32px] shrink-0 items-center justify-center rounded-full px-4 text-sm leading-5 font-medium whitespace-nowrap transition-colors ${
        isSelected
          ? 'border border-transparent bg-primary-900 text-white'
          : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
      }`}
    >
      <span>{getLabel(category)}</span>
    </button>
  );
}
