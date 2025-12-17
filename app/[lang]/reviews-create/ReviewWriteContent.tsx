'use client';

import { useEffect } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { useCategories } from 'features/category-filter/model/useCategories';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ReviewWriteForm } from 'features/review-write/ui/ReviewWriteForm';
import { Loader2 } from 'lucide-react';

interface ReviewWriteContentProps {
  lang: Locale;
  dict: Dictionary;
  hospitalId?: string;
}

export function ReviewWriteContent({ lang, dict, hospitalId }: ReviewWriteContentProps) {
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
      const showLoginDrawer = async () => {
        await openDrawer({
          content: <LoginRequiredDrawer lang={lang} dict={dict} />,
        });
      };
      showLoginDrawer();
      router.push('/reviews');
    }
  }, [user, isAuthLoading, lang, dict, router]);

  // hospitalId 확인
  useEffect(() => {
    if (!hospitalId) {
      router.push('/reviews/select-hospital');
    }
  }, [hospitalId, router]);

  // 로딩 중
  if (isLoadingHospital || isLoadingCategories || isAuthLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 size={48} className='animate-spin text-[#DA47EF]' />
      </div>
    );
  }

  // 에러
  if (error || !hospital) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center p-5'>
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
    );
  }

  return (
    <div>
      {/* 폼 */}
      <div className='p-6'>
        <ReviewWriteForm
          lang={lang}
          dict={dict}
          hospital={{
            id: hospital.id,
            name: hospital.name,
            address: hospital.address,
            thumbnailImageUrl: hospital.thumbnailImageUrl ?? null,
          }}
          medicalSpecialties={medicalSpecialties.map((specialty) => ({
            id: specialty.id,
            name: specialty.name,
            specialtyType: specialty.specialtyType,
          }))}
        />
      </div>
    </div>
  );
}
