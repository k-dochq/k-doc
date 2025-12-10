import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface DoctorDetailSkeletonV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function DoctorDetailSkeletonV2({}: DoctorDetailSkeletonV2Props) {
  return (
    <div className='bg-white text-neutral-900'>
      {/* 헤더 높이 만큼 여백 */}
      <div className='h-[56px]' />

      {/* 프로필 섹션 스켈레톤 */}
      <div className='flex items-center gap-3 px-5 pt-5 pb-2'>
        <div className='h-[100px] w-[100px] shrink-0 animate-pulse rounded-full bg-neutral-200' />
        <div className='flex min-w-0 flex-1 flex-col gap-3'>
          <div className='h-6 w-40 animate-pulse rounded bg-neutral-200' />
          <div className='h-4 w-32 animate-pulse rounded bg-neutral-200' />
          <div className='flex gap-2'>
            <div className='h-6 w-16 animate-pulse rounded-full bg-neutral-200' />
            <div className='h-6 w-20 animate-pulse rounded-full bg-neutral-200' />
            <div className='h-6 w-14 animate-pulse rounded-full bg-neutral-200' />
          </div>
        </div>
      </div>

      {/* 약력 섹션 스켈레톤 */}
      <div className='flex flex-col gap-3 bg-white px-5 py-5'>
        <div className='h-5 w-24 animate-pulse rounded bg-neutral-200' />
        <div className='h-24 rounded-xl bg-neutral-100'>
          <div className='h-full w-full animate-pulse rounded-xl bg-neutral-200/60' />
        </div>
      </div>

      {/* 경력 및 활동 섹션 스켈레톤 */}
      <div className='flex flex-col gap-3 bg-white px-5 py-5'>
        <div className='h-5 w-32 animate-pulse rounded bg-neutral-200' />
        <div className='flex gap-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='h-[90px] w-[90px] shrink-0 animate-pulse rounded-lg bg-neutral-200'
            />
          ))}
        </div>
      </div>

      {/* 소속 병원 섹션 스켈레톤 */}
      <div className='flex flex-col gap-3 bg-white px-5 py-5'>
        <div className='h-5 w-28 animate-pulse rounded bg-neutral-200' />
        <div className='flex max-h-[135px] w-full items-start overflow-hidden rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.08)]'>
          <div className='h-[135px] w-[156px] shrink-0 animate-pulse bg-neutral-200' />
          <div className='flex min-w-0 flex-1 flex-col gap-2 px-3 pt-3 pb-3'>
            <div className='h-5 w-40 animate-pulse rounded bg-neutral-200' />
            <div className='h-4 w-32 animate-pulse rounded bg-neutral-200' />
            <div className='h-4 w-24 animate-pulse rounded bg-neutral-200' />
            <div className='h-4 w-28 animate-pulse rounded bg-neutral-200' />
          </div>
        </div>
      </div>

      {/* 시술후기 섹션 스켈레톤 간격 */}
      <div className='pt-5 pb-11'>
        <div className='flex flex-col gap-3 px-5'>
          <div className='h-5 w-32 animate-pulse rounded bg-neutral-200' />
          <div className='h-4 w-24 animate-pulse rounded bg-neutral-200' />
        </div>
        <div className='mt-4 flex gap-3 overflow-hidden px-5'>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className='h-[180px] w-full flex-1 animate-pulse rounded-xl bg-neutral-200'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
