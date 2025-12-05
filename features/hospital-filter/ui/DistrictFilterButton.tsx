'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { Drawer, DrawerContent, DrawerTrigger } from 'shared/ui/drawer';
import { LocationIcon } from 'shared/ui/icons';
import { DistrictFilterDrawer } from 'features/district-filter/ui/DistrictFilterDrawer';
import { type useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';
import { useParentDistricts } from 'features/district-filter/model/useDistricts';

interface DistrictFilterButtonProps {
  lang: Locale;
  dict: Dictionary;
  districtFilter: ReturnType<typeof useDistrictFilter>;
}

export function DistrictFilterButton({ lang, dict, districtFilter }: DistrictFilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: parentDistricts = [], isLoading, error } = useParentDistricts();

  const handleClose = () => {
    setIsOpen(false);
  };

  // 데이터가 로딩 중이거나 에러가 있으면 모달을 렌더링하지 않음
  if (isLoading || error || parentDistricts.length === 0) {
    return (
      <button
        className='text-primary flex items-center gap-0.5 text-[13px] font-medium opacity-50'
        disabled
      >
        <span className='text-neutral-900'>
          {dict.districtFilter.button}
          {districtFilter.selectedDistrictCount > 0 && (
            <span className='text-primary ml-1'>({districtFilter.selectedDistrictCount})</span>
          )}
        </span>
        <LocationIcon />
      </button>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className='text-primary flex items-center gap-0.5 text-[13px] font-medium'>
          <span className='text-neutral-900'>
            {dict.districtFilter.button}
            {districtFilter.selectedDistrictCount > 0 && (
              <span className='text-primary ml-1'>({districtFilter.selectedDistrictCount})</span>
            )}
          </span>
          <LocationIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent className='w-full bg-white'>
        <DistrictFilterDrawer
          lang={lang}
          dict={dict}
          districtFilter={districtFilter}
          parentDistricts={parentDistricts}
          onClose={handleClose}
        />
      </DrawerContent>
    </Drawer>
  );
}
