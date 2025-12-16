'use client';

import { useEffect } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { useCategories } from 'features/category-filter/model/useCategories';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { Loader2 } from 'lucide-react';

interface ReviewWriteContentV2Props {
  lang: Locale;
  dict: Dictionary;
  hospitalId?: string;
}

export function ReviewWriteContentV2({ lang, dict, hospitalId }: ReviewWriteContentV2Props) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useLocalizedRouter();

  // TanStack Query로 병원 정보 조회
  const {
    data: hospitalDetailData,
    isLoading: isLoadingHospital,
    isError: isHospitalError,
  } = useHospitalDetail(hospitalId || '');

  // TanStack Query로 시술 부위 목록 조회
  const {
    data: medicalSpecialties = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useCategories();

  const hospital = hospitalDetailData?.hospital;
  const error = isHospitalError || isCategoriesError ? 'Failed to load data' : null;

  // 로그인 확인
  useEffect(() => {
    if (!isAuthLoading && !user) {
      openModal({
        content: (
          <LoginRequiredModal
            lang={lang}
            dict={dict}
            redirectPath={`/reviews-create${hospitalId ? `?hospitalId=${hospitalId}` : ''}`}
          />
        ),
      });
      router.push('/reviews');
    }
  }, [user, isAuthLoading, lang, dict, hospitalId, router]);

  // hospitalId 확인
  useEffect(() => {
    if (!hospitalId) {
      router.push('/reviews/select-hospital');
    }
  }, [hospitalId, router]);

  // 로딩 중
  if (isLoadingHospital || isLoadingCategories || isAuthLoading) {
    return (
      <>
        <PageHeaderV2
          title={dict.reviewWrite?.form?.title || 'Write Review'}
          fallbackUrl={`/${lang}/reviews`}
        />
        <div className='flex min-h-screen items-center justify-center pt-[58px]'>
          <Loader2 size={48} className='animate-spin text-[#DA47EF]' />
        </div>
      </>
    );
  }

  // 에러
  if (error || !hospital) {
    return (
      <>
        <PageHeaderV2
          title={dict.reviewWrite?.form?.title || 'Write Review'}
          fallbackUrl={`/${lang}/reviews`}
        />
        <div className='flex min-h-screen flex-col items-center justify-center p-5 pt-[58px]'>
          <div className='space-y-4 text-center'>
            <h2 className='text-xl font-semibold text-gray-900'>
              {dict.reviewWrite?.error?.title || 'Error'}
            </h2>
            <p className='text-gray-600'>
              {error || dict.reviewWrite?.error?.message || 'Something went wrong'}
            </p>
            <button
              onClick={() => router.push('/reviews/select-hospital')}
              className='rounded-xl bg-[#DA47EF] px-6 py-3 font-semibold text-white hover:bg-[#C63DD6]'
            >
              {dict.reviewWrite?.error?.retry || 'Go Back'}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeaderV2
        title={dict.reviewWrite?.form?.title || 'Write Review'}
        fallbackUrl={`/${lang}/reviews`}
      />

      {/* 컨텐츠 영역 */}
      <div className='pt-[58px] pb-[120px]'>
        {/* 빈 영역 (나중에 폼 추가 예정) */}
        <div className='p-6'></div>
      </div>

      {/* 플로팅 버튼 섹션 */}
      <div
        className={`fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
      >
        <button
          disabled={false}
          className='bg-sub-900 hover:bg-sub-900/90 disabled:bg-sub-900/50 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed'
        >
          {dict.reviewWrite?.form?.submitButton || '시술후기 등록'}
        </button>
      </div>
    </>
  );
}
