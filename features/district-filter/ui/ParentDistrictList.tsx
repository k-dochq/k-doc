'use client';

import { type Locale } from 'shared/config';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { DistrictListError } from 'shared/ui/error-states';
import { ParentDistrictListSkeleton } from 'shared/ui/skeletons';
import { useParentDistricts } from '../model/useDistricts';
import type { District } from '../model/types';

interface ParentDistrictListProps {
  lang: Locale;
  selectedParentId: string | null;
  onParentSelect: (parentId: string) => void;
}

export function ParentDistrictList({
  lang,
  selectedParentId,
  onParentSelect,
}: ParentDistrictListProps) {
  const { data: parentDistricts = [], isLoading, error, refetch } = useParentDistricts();

  if (isLoading) {
    return <ParentDistrictListSkeleton />;
  }

  if (error) {
    return <DistrictListError onRetry={() => refetch()} />;
  }

  const getDistrictName = (district: District): string => {
    // 지역 검색 drawer에서는 원래 name을 사용
    return getLocalizedTextByLocale(district.name, lang);
  };

  return (
    <div className='flex h-full shrink-0 flex-col items-start justify-start overflow-y-auto border-r border-neutral-200'>
      {parentDistricts.map((district) => {
        const isSelected = selectedParentId === district.id;

        return (
          <button
            key={district.id}
            onClick={() => onParentSelect(district.id)}
            className={`flex w-full items-start gap-0.5 px-6 py-3 text-left transition-colors ${
              isSelected
                ? 'bg-primary-300 text-[#da47ef]'
                : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600'
            }`}
          >
            <span className='text-base leading-6 font-bold'>{getDistrictName(district)}</span>
          </button>
        );
      })}
    </div>
  );
}
