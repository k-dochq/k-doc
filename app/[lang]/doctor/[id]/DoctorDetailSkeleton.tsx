import { PageHeader } from '@/shared/ui/page-header';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface DoctorDetailSkeletonProps {
  lang: Locale;
  dict: Dictionary;
}

export function DoctorDetailSkeleton({ lang, dict }: DoctorDetailSkeletonProps) {
  return (
    <div>
      <PageHeader lang={lang} title='' variant='light' />

      <div className='min-h-screen bg-white/30'>
        <div className='container mx-auto px-4 py-8'>
          <div className='mx-auto max-w-4xl'>
            {/* 의사 기본 정보 카드 스켈레톤 */}
            <div className='mb-8 rounded-lg bg-white/20 p-6 shadow-sm'>
              <div className='flex items-center gap-4'>
                {/* 프로필 이미지 스켈레톤 */}
                <div className='h-24 w-24 animate-pulse rounded-full bg-white/50'></div>

                {/* 의사 정보 스켈레톤 */}
                <div className='flex-1 space-y-3'>
                  <div className='h-6 w-48 animate-pulse rounded bg-white/50'></div>
                  <div className='h-4 w-32 animate-pulse rounded bg-white/50'></div>

                  {/* 진료부위 태그 스켈레톤 */}
                  <div className='flex gap-2'>
                    <div className='h-6 w-16 animate-pulse rounded-full bg-white/50'></div>
                    <div className='h-6 w-20 animate-pulse rounded-full bg-white/50'></div>
                  </div>
                </div>

                {/* 좋아요 버튼 스켈레톤 */}
                <div className='flex flex-col items-center gap-1'>
                  <div className='h-6 w-6 animate-pulse rounded bg-white/50'></div>
                  <div className='h-4 w-6 animate-pulse rounded bg-white/50'></div>
                </div>
              </div>
            </div>

            {/* 경력 및 활동 섹션 스켈레톤 */}
            <div className='mb-8 rounded-lg bg-white/20 p-6 shadow-sm'>
              <div className='mb-4'>
                <div className='h-6 w-32 animate-pulse rounded bg-white/50'></div>
              </div>

              {/* 경력 목록 스켈레톤 */}
              <div className='mb-6 space-y-3'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className='flex items-start gap-3'>
                    <div className='mt-2 h-2 w-2 animate-pulse rounded-full bg-white/50'></div>
                    <div className='h-4 w-full animate-pulse rounded bg-white/50'></div>
                  </div>
                ))}
              </div>

              {/* 경력 이미지 스켈레톤 */}
              <div className='space-y-3'>
                <div className='h-5 w-24 animate-pulse rounded bg-white/50'></div>
                <div className='flex gap-3 overflow-x-auto'>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className='h-32 w-24 flex-shrink-0 animate-pulse rounded bg-white/50'
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* 소속 병원 섹션 스켈레톤 */}
            <div className='mb-8 rounded-lg bg-white/20 p-6 shadow-sm'>
              <div className='mb-4'>
                <div className='h-6 w-24 animate-pulse rounded bg-white/50'></div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='h-16 w-16 animate-pulse rounded bg-white/50'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-5 w-40 animate-pulse rounded bg-white/50'></div>
                  <div className='h-4 w-32 animate-pulse rounded bg-white/50'></div>
                  <div className='h-4 w-48 animate-pulse rounded bg-white/50'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
