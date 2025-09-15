'use client';

import { type Locale } from 'shared/config';
import { Drawer, DrawerContent, DrawerTrigger } from 'shared/ui/drawer';
import { LocationIcon } from 'shared/ui/icons';
import { DistrictFilterDrawer } from 'features/district-filter/ui/DistrictFilterDrawer';

interface DistrictFilterButtonProps {
  lang: Locale;
}

export function DistrictFilterButton({ lang }: DistrictFilterButtonProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className='text-primary flex items-center gap-0.5 text-[13px] font-medium'>
          <span className='text-neutral-900'>지역별</span>
          <LocationIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent className='w-full bg-white'>
        <DistrictFilterDrawer
          lang={lang}
          onClose={() => {
            // Drawer 닫기 로직은 vaul에서 자동으로 처리됨
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}
