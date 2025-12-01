import { StarIconFigma } from 'shared/ui/star-icon-figma';

interface HospitalCardProps {
  imageUrl?: string;
  hotTag?: boolean;
  categoryTag: string;
  hospitalName: string;
  area: string;
  location: string;
  price: string;
  rating: number;
  reviewCount: number;
}

export function HospitalCard({
  imageUrl = '/images/figma/hospital-card-thumbnail.png',
  hotTag = true,
  categoryTag,
  hospitalName,
  area,
  location,
  price,
  rating,
  reviewCount,
}: HospitalCardProps) {
  return (
    <div className='relative w-[150px]'>
      {/* HOT 태그 */}
      {hotTag && (
        <div className='absolute top-0 left-0 z-10 h-[34px] w-[46px] overflow-clip'>
          <div className='absolute inset-0'>
            <svg
              width='46'
              height='26'
              viewBox='0 0 46 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='size-full'
            >
              <path
                d='M39.5503 0H5.04446C2.2628 0 0 2.68752 0 4.9507V26C0 23.7368 2.2628 21.9068 5.04446 21.9068H39.5503L46 10.9534L39.5503 0Z'
                fill='url(#paint0_linear_0_27)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_0_27'
                  x1='0'
                  y1='12.9956'
                  x2='47'
                  y2='12.9956'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#0E84D9' />
                  <stop offset='0.245433' stopColor='#0B99FF' />
                  <stop offset='1' stopColor='#0B99FF' />
                </linearGradient>
              </defs>
            </svg>
            <p className='absolute inset-[2.94%_18.48%_38.24%_18.48%] text-sm leading-5 font-semibold text-white'>
              HOT
            </p>
          </div>
        </div>
      )}

      {/* 카드 컨테이너 */}
      <div className='relative top-[5px] left-[5px] flex w-[150px] flex-col items-center overflow-clip rounded-xl bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]'>
        {/* 썸네일 이미지 */}
        <div className='relative h-[130px] w-full shrink-0 overflow-clip'>
          <div className='absolute top-[-18px] left-0 size-[150px]'>
            <div className='pointer-events-none absolute inset-0 overflow-hidden'>
              <img
                alt={hospitalName}
                className='absolute top-0 left-0 size-full max-w-none'
                src={imageUrl}
              />
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className='flex h-[160px] w-full shrink-0 flex-col items-start gap-1 p-3'>
          {/* 상단 영역 */}
          <div className='flex w-full shrink-0 flex-col items-start gap-1.5'>
            {/* 카테고리 태그 */}
            <div
              className='flex shrink-0 items-center justify-center gap-[10px] rounded-full px-1.5 py-0.5'
              style={{
                background: 'linear-gradient(92deg, #3E57E2 6.05%, #B133FF 43.63%, #FF5DCA 100%)',
              }}
            >
              <p className='relative shrink-0 text-xs leading-4 font-medium text-white'>
                {categoryTag}
              </p>
            </div>

            {/* 제목 및 지역 */}
            <div className='flex w-full shrink-0 flex-col items-start gap-0.5'>
              <p className='relative w-full shrink-0 text-sm leading-5 font-semibold whitespace-pre-wrap text-neutral-700'>
                {hospitalName}
              </p>
              <div className='flex w-full shrink-0 items-center gap-1'>
                <p className='relative shrink-0 text-xs leading-4 font-medium text-neutral-400'>
                  {area}
                </p>
                <div className='relative flex h-[10px] w-0 shrink-0 items-center justify-center'>
                  <div className='flex-none rotate-90'>
                    <div className='relative h-0 w-[10px]'>
                      <svg
                        width='10'
                        height='1'
                        viewBox='0 0 10 1'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='absolute inset-0'
                      >
                        <line y1='0.5' x2='10' y2='0.5' stroke='#A3A3A3' />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='relative flex shrink-0 items-center py-0 pr-0 pl-0.5'>
                  <p className='relative shrink-0 text-xs leading-4 font-medium text-neutral-400'>
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 영역 */}
          <div className='flex w-full shrink-0 flex-col items-start gap-0.5'>
            {/* 가격 */}
            <p className='relative min-w-full shrink-0 text-lg leading-7 font-semibold whitespace-pre-wrap text-neutral-700'>
              {price}
            </p>

            {/* 별점 및 리뷰 */}
            <div className='flex shrink-0 items-center gap-1'>
              <div className='flex size-4 shrink-0 items-center justify-center'>
                <StarIconFigma size={16} color='#FFC31D' />
              </div>
              <div className='flex shrink-0 items-center gap-0.5 text-[13px] leading-[19px] font-medium'>
                <p className='relative shrink-0 text-neutral-700'>{rating}</p>
                <p className='relative shrink-0 text-neutral-400'>({reviewCount})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
