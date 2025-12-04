import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';
import { CATEGORIES } from 'features/quick-menu/model/categories';

export function CategorySectionSkeletonV2() {
  // 'all' 포함한 전체 카테고리 개수
  const skeletonCount = 5;

  return (
    <div className='w-full overflow-visible'>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className='py-4 pl-5'>
          {Array.from({ length: skeletonCount }).map((_, index) => {
            const isFirst = index === 0; // 'all' (추천) 카테고리
            const isLast = index === skeletonCount - 1;
            const buttonWidth = isFirst ? 'w-[60px]' : 'w-[71px]';

            return (
              <CarouselItem key={index} className='basis-auto'>
                {isLast ? (
                  <div className='pr-5'>
                    <div className={`flex flex-col items-center gap-1 ${buttonWidth}`}>
                      {/* 아이콘 영역 스켈레톤 */}
                      <div className='h-[50px] w-[50px] animate-pulse rounded-xl bg-neutral-200' />
                      {/* 라벨 영역 스켈레톤 */}
                      <div className='h-3 w-12 animate-pulse rounded bg-neutral-200' />
                    </div>
                  </div>
                ) : (
                  <div className={`flex flex-col items-center gap-1 ${buttonWidth}`}>
                    {/* 아이콘 영역 스켈레톤 */}
                    <div className='h-[50px] w-[50px] animate-pulse rounded-xl bg-neutral-200' />
                    {/* 라벨 영역 스켈레톤 */}
                    <div className='h-3 w-12 animate-pulse rounded bg-neutral-200' />
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
