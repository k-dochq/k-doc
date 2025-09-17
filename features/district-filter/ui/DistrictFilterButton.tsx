'use client';

import type { District } from '../model/types';
import type { Dictionary } from 'shared/model/types';

interface DistrictFilterButtonProps {
  selectedChildIds: string[];
  childDistricts: District[];
  onComplete: () => void;
  dict: Dictionary;
}

export function DistrictFilterButton({
  selectedChildIds,
  childDistricts,
  onComplete,
  dict,
}: DistrictFilterButtonProps) {
  const selectedDistricts = childDistricts.filter((district) =>
    selectedChildIds.includes(district.id),
  );

  const handleComplete = () => {
    console.log('선택된 지역 필터 데이터:', {
      selectedChildIds,
      selectedDistricts: selectedDistricts.map((district) => ({
        id: district.id,
        name: district.displayName || district.name,
        parentId: district.parentId,
      })),
    });

    onComplete();
  };

  return (
    <div className='flex w-full flex-col items-start gap-2.5 border-t border-neutral-200 px-5 pt-4 pb-8'>
      <button
        onClick={handleComplete}
        className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#da47ef] px-10 py-4 transition-opacity hover:opacity-90'
      >
        <span className='text-base leading-6 font-normal text-white'>
          {dict.districtFilter.complete}
          {selectedChildIds.length > 0 && ` (${selectedChildIds.length})`}
        </span>
      </button>
    </div>
  );
}
