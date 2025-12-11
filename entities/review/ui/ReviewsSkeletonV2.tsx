'use client';

interface ReviewsSkeletonV2Props {
  count?: number;
  className?: string;
}

export function ReviewsSkeletonV2({ count = 6, className = '' }: ReviewsSkeletonV2Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='w-full'>
          {/* 카드 메인 컨텐츠 */}
          <div className='flex flex-col bg-white pt-5 pb-4'>
            {/* 상단 섹션: 프로필, 닉네임, 작성일자, 평점 */}
            <div className='px-5'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1.5'>
                  {/* 프로필 아이콘 */}
                  <div className='h-[30px] w-[30px] shrink-0 animate-pulse rounded-full bg-neutral-200' />
                  {/* 닉네임과 작성일자 */}
                  <div className='flex items-center gap-1.5'>
                    <div className='h-5 w-16 animate-pulse rounded bg-neutral-200' />
                    <div className='h-[19px] w-20 animate-pulse rounded bg-neutral-200' />
                  </div>
                </div>
                {/* 평점 */}
                <div className='flex items-center gap-1'>
                  <div className='h-5 w-5 animate-pulse rounded bg-neutral-200' />
                  <div className='h-6 w-4 animate-pulse rounded bg-neutral-200' />
                </div>
              </div>
            </div>

            {/* 이미지 섹션: Before/After 이미지 */}
            <div className='mt-3 px-5'>
              <div className='h-[220px] animate-pulse overflow-hidden rounded-xl bg-neutral-200' />
            </div>

            {/* 해시태그, 시술시기, 조회수 */}
            <div className='mt-3 px-5'>
              <div className='flex flex-col gap-1'>
                {/* 해시태그 */}
                <div className='h-5 w-20 animate-pulse rounded bg-neutral-200' />
                {/* 시술시기와 조회수 */}
                <div className='flex items-center justify-between'>
                  <div className='h-4 w-32 animate-pulse rounded bg-neutral-200' />
                  <div className='flex items-center gap-1'>
                    <div className='h-4 w-8 animate-pulse rounded bg-neutral-200' />
                    <div className='h-4 w-6 animate-pulse rounded bg-neutral-200' />
                  </div>
                </div>
              </div>
            </div>

            {/* 리뷰 내용 */}
            <div className='mt-3 px-5'>
              <div className='flex flex-col gap-1'>
                <div className='space-y-1'>
                  <div className='h-[19px] w-full animate-pulse rounded bg-neutral-200' />
                  <div className='h-[19px] w-5/6 animate-pulse rounded bg-neutral-200' />
                  <div className='h-[19px] w-4/6 animate-pulse rounded bg-neutral-200' />
                </div>
                <div className='h-4 w-12 animate-pulse rounded bg-neutral-200' />
              </div>
            </div>
          </div>

          {/* 하단 인터랙션 섹션: 좋아요, 댓글 */}
          <div className='flex items-center justify-between border-t border-neutral-200 bg-white px-5 py-3'>
            <div className='flex items-center gap-3'>
              {/* 좋아요 */}
              <div className='flex items-center gap-1'>
                <div className='h-5 w-5 animate-pulse rounded bg-neutral-200' />
                <div className='h-5 w-6 animate-pulse rounded bg-neutral-200' />
              </div>
              {/* 댓글 */}
              <div className='flex items-center gap-1'>
                <div className='h-5 w-5 animate-pulse rounded bg-neutral-200' />
                <div className='h-5 w-6 animate-pulse rounded bg-neutral-200' />
              </div>
            </div>
          </div>

          {/* 카드 하단 여백 */}
          <div className='h-[6px] bg-neutral-100' />
        </div>
      ))}
    </div>
  );
}
