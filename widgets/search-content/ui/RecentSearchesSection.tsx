'use client';

import { useRecentSearches } from 'shared/model/hooks';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Dictionary } from 'shared/model/types';
import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';

interface RecentSearchesSectionProps {
  dict: Dictionary;
}

function XIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path
        d='M7 7L3.5 3.5M7 7L10.5 10.5M7 7L10.5 3.5M7 7L3.5 10.5'
        stroke='#A3A3A3'
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function RecentSearchesSection({ dict }: RecentSearchesSectionProps) {
  const { searches, removeSearch, clearAll } = useRecentSearches();
  const router = useLocalizedRouter();

  if (searches.length === 0) return null;

  const handleChipClick = (term: string) => {
    router.push(`/v2/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className='flex flex-col gap-4 pt-5'>
      <div className='flex items-center justify-between px-5'>
        <p className="font-['Pretendard'] text-base font-semibold leading-6 text-[#404040]">
          {dict.search?.recentSearches?.title}
        </p>
        <button
          type='button'
          onClick={clearAll}
          className="font-['Pretendard'] text-sm font-normal leading-5 text-[#737373]"
        >
          {dict.search?.recentSearches?.clearAll}
        </button>
      </div>
      <div className='w-full overflow-visible'>
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
            containScroll: 'trimSnaps',
          }}
          className='w-full'
        >
          <CarouselContent className='gap-2 py-0'>
            {searches.map((term, index) => (
              <CarouselItem
                key={term}
                className={`basis-auto ${index === 0 ? 'ps-5' : ''}`}
              >
                {index === searches.length - 1 ? (
                  <div className='pe-5'>
                    <div className='flex items-center gap-0.5 rounded-full border border-[#E5E5E5] bg-white py-[6px] pl-3 pr-2'>
                      <button
                        type='button'
                        onClick={() => handleChipClick(term)}
                        className="font-['Pretendard'] text-sm font-medium leading-5 text-[#404040]"
                      >
                        {term}
                      </button>
                      <button
                        type='button'
                        onClick={() => removeSearch(term)}
                        className='flex items-center justify-center'
                      >
                        <XIcon />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center gap-0.5 rounded-full border border-[#E5E5E5] bg-white py-[6px] pl-3 pr-2'>
                    <button
                      type='button'
                      onClick={() => handleChipClick(term)}
                      className="font-['Pretendard'] text-sm font-medium leading-5 text-[#404040]"
                    >
                      {term}
                    </button>
                    <button
                      type='button'
                      onClick={() => removeSearch(term)}
                      className='flex items-center justify-center'
                    >
                      <XIcon />
                    </button>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
