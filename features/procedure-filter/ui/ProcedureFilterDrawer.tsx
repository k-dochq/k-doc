'use client';

import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useProcedureFilter } from '../model/useProcedureFilter';
import { ProcedureFilterHeader } from './ProcedureFilterHeader';
import { ProcedureFilterCategoryList } from './ProcedureFilterCategoryList';
import { ProcedureFilterApplyButton } from './ProcedureFilterApplyButton';

interface ProcedureFilterDrawerProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategories: MedicalSpecialtyType[];
  onApply: (categories: MedicalSpecialtyType[]) => void;
  onClose: () => void;
}

export function ProcedureFilterDrawer({
  lang,
  dict,
  selectedCategories,
  onApply,
  onClose,
}: ProcedureFilterDrawerProps) {
  const { selected, toggle, reset } = useProcedureFilter(selectedCategories);

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  return (
    <div className='flex w-full flex-col bg-white'>
      <ProcedureFilterHeader dict={dict} onReset={reset} />
      <div className='h-px w-full bg-neutral-100' />
      <ProcedureFilterCategoryList lang={lang} selected={selected} onToggle={toggle} />
      <div className='h-px w-full bg-neutral-100' />
      <ProcedureFilterApplyButton dict={dict} selectedCount={selected.length} onApply={handleApply} />
    </div>
  );
}
