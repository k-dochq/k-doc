'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PopularReviewsList } from '@/widgets/popular-reviews/ui/PopularReviewsList';
import { LocaleLink } from 'shared/ui/locale-link';
import { type ReviewCardData } from 'entities/review/model/types';

interface DoctorHospitalReviewsProps {
  reviews: ReviewCardData[];
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorHospitalReviews({
  reviews,
  hospitalId,
  lang,
  dict,
}: DoctorHospitalReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className='mt-10'>
      <div className='px-5'>
        {/* 시술후기 제목과 전체보기 버튼 */}
        <div className='flex w-full items-center justify-between'>
          <h3 className='text-base font-bold'>{dict.doctor.reviews}</h3>

          <LocaleLink
            href={`/hospital/${hospitalId}/reviews`}
            className='flex items-center gap-0.5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-700'
          >
            <span className='leading-5'>{dict.doctor.viewAllReviews}</span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='scale-y-[-100%] transform'
            >
              <path
                d='M6 12L10 8L6 4'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </LocaleLink>
        </div>
      </div>

      {/* 후기 리스트 */}
      <div className='mt-4'>
        <PopularReviewsList reviews={reviews} lang={lang} dict={dict} />
      </div>
    </div>
  );
}
