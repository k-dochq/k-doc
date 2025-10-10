'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { CheckboxButton, SelectAllButton } from 'shared/ui/buttons';
import { ChildDistrictListError } from 'shared/ui/error-states';
import { ChildDistrictListSkeleton } from 'shared/ui/skeletons';
import { useChildDistricts, useParentDistricts } from '../model/useDistricts';
import type { District } from '../model/types';

interface ChildDistrictListProps {
  lang: Locale;
  dict: Dictionary;
  selectedParentId: string | null;
  selectedChildIds: string[];
  onChildToggle: (childId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function ChildDistrictList({
  lang,
  dict,
  selectedParentId,
  selectedChildIds,
  onChildToggle,
  onSelectAll,
  onDeselectAll,
}: ChildDistrictListProps) {
  const {
    data: childDistricts = [],
    isLoading,
    error,
    refetch,
  } = useChildDistricts(selectedParentId);
  const { data: parentDistricts = [] } = useParentDistricts();

  const getDistrictName = (district: District): string => {
    // 지역 검색 drawer에서는 원래 name을 사용
    return getLocalizedTextByLocale(district.name, lang);
  };

  const getParentDistrictName = (): string => {
    if (!selectedParentId) return '';
    const parentDistrict = parentDistricts.find((district) => district.id === selectedParentId);
    return parentDistrict ? getDistrictName(parentDistrict) : '';
  };

  const isAllSelected =
    childDistricts.length > 0 && selectedChildIds.length === childDistricts.length;

  if (!selectedParentId) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <span className='text-sm text-neutral-500'>{dict.districtFilter.empty.message}</span>
      </div>
    );
  }

  if (isLoading) {
    return <ChildDistrictListSkeleton />;
  }

  if (error) {
    return <ChildDistrictListError onRetry={() => refetch()} />;
  }

  if (childDistricts.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <span className='text-sm text-neutral-500'>{dict.districtFilter.empty.message}</span>
      </div>
    );
  }

  return (
    <div className='flex h-full w-full flex-col items-start justify-start overflow-y-auto'>
      {/* 전체 선택 */}
      <div className='flex w-full items-center gap-2 px-4 pt-4 pb-3'>
        <SelectAllButton
          isAllSelected={isAllSelected}
          isPartiallySelected={false}
          onClick={isAllSelected ? onDeselectAll : onSelectAll}
        />
        <button
          onClick={isAllSelected ? onDeselectAll : onSelectAll}
          className='flex-1 text-left text-[13px] leading-[18px] font-normal text-black transition-colors hover:text-neutral-600 break-all'
        >
          {getParentDistrictName()} {dict.districtFilter?.selectAll || '전체'}
        </button>
      </div>

      {/* 개별 지역들 */}
      {childDistricts.map((district) => {
        const isSelected = selectedChildIds.includes(district.id);

        return (
          <div key={district.id} className='flex w-full items-center gap-2 px-5 py-3'>
            <CheckboxButton isSelected={isSelected} onClick={() => onChildToggle(district.id)} />
            <button
              onClick={() => onChildToggle(district.id)}
              className='text-[13px] leading-[18px] font-normal text-black transition-colors hover:text-neutral-600'
            >
              {getDistrictName(district)}
            </button>
          </div>
        );
      })}
    </div>
  );
}
