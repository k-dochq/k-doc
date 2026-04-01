'use client';

import { ChevronRightIcon } from 'shared/ui/chevron-right-icon';
import { SearchIcon } from 'shared/ui/icons';
import { useRouter } from 'next/navigation';
import { type Dictionary } from 'shared/model/types';

interface SearchGnbV2Props {
  dict: Dictionary;
}

export function SearchGnbV2({ dict }: SearchGnbV2Props) {
  const router = useRouter();

  return (
    <div className='sticky top-0 z-50 flex h-[58px] w-full items-center gap-1 bg-white px-5 py-4'>
      <button
        type='button'
        onClick={() => router.back()}
        className='flex shrink-0 items-center justify-center'
      >
        <ChevronRightIcon size={24} color='#404040' className='rotate-180' />
      </button>
      <div className='flex flex-1 items-center gap-[6px] rounded-full border border-[#e5e5e5] bg-[#f1f1f1] px-4 py-2'>
        <input
          type='text'
          placeholder={dict.search?.placeholder}
          className="flex-1 bg-transparent font-['Pretendard'] text-base font-semibold leading-6 text-[#a3a3a3] outline-none placeholder:text-[#a3a3a3]"
        />
        <SearchIcon size={20} color='#F15BFF' />
      </div>
    </div>
  );
}
