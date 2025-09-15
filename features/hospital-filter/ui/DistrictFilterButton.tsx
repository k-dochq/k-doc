'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { Drawer, DrawerContent, DrawerTrigger } from 'shared/ui/drawer';
import { LocationIcon } from 'shared/ui/icons';
import { DistrictFilterDrawer } from 'features/district-filter/ui/DistrictFilterDrawer';
import { type useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';

interface DistrictFilterButtonProps {
  lang: Locale;
  districtFilter: ReturnType<typeof useDistrictFilter>;
}

export function DistrictFilterButton({ lang, districtFilter }: DistrictFilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className='text-primary flex items-center gap-0.5 text-[13px] font-medium'>
          <span className='text-neutral-900'>
            지역별
            {districtFilter.selectedDistrictCount > 0 && (
              <span className='text-primary ml-1'>({districtFilter.selectedDistrictCount})</span>
            )}
          </span>
          <LocationIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent className='w-full bg-white'>
        <DistrictFilterDrawer lang={lang} districtFilter={districtFilter} onClose={handleClose} />
      </DrawerContent>
    </Drawer>
  );
}
