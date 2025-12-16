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
import { DoctorAffiliatedHospitalCardV2 } from 'widgets/doctor-affiliated-hospital/ui/DoctorAffiliatedHospitalCardV2';
import { convertHospitalToCardData } from 'entities/hospital/lib/hospital-type-converters';
import { useReviewWriteForm } from 'features/review-write/model/useReviewWriteForm';
import { useImageUpload } from 'features/review-write/model/useImageUpload';
import { useCreateReview } from 'features/review-write/model/useCreateReview';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { SelectFieldV2 } from 'features/consultation-request/ui/SelectFieldV2';
import { TextareaFieldV2 } from 'features/consultation-request/ui/TextareaFieldV2';
import { FieldLabel } from 'features/consultation-request/ui/FieldLabel';
import { FieldError } from 'features/consultation-request/ui/FieldError';
import { CustomStar } from 'features/review-write/ui/CustomStar';
import { ImageUploadSection } from 'features/review-write/ui/ImageUploadSection';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Prisma } from '@prisma/client';
import PrivacyAgreementSection from '@/features/review-write/ui/PrivacyAgreementSection';

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

  // Hospital 데이터를 HospitalCardData로 변환
  const hospitalCardData = hospital ? convertHospitalToCardData(hospital) : null;

  // 폼 상태 관리
  const { formData, errors, isValid, updateField, validateForm } = useReviewWriteForm(dict);

  // 이미지 업로드 관리
  const {
    beforeImages,
    afterImages,
    isUploading,
    uploadError,
    addBeforeImage,
    addAfterImage,
    removeBeforeImage,
    removeAfterImage,
  } = useImageUpload(user?.id || '');

  // TanStack Query mutation
  const {
    mutate: createReview,
    isPending: isSubmitting,
    error: submitError,
  } = useCreateReview({
    onSuccess: (_reviewId: string, hospitalId: string) => {
      // 성공 시 해당 병원의 리뷰 목록 페이지로 이동 (히스토리 스택에 쌓이지 않게 replace 사용)
      router.replace(`/hospital/${hospitalId}/reviews`);
    },
    onError: (error: Error) => {
      console.error('Submit review error:', error);
    },
  });

  const formDict = dict.reviewWrite?.form;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user || !hospital) {
      return;
    }

    // Mutation 실행
    createReview({
      rating: formData.rating,
      content: formData.content,
      procedureName: formData.procedureName,
      medicalSpecialtyId: formData.medicalSpecialtyId,
      hospitalId: hospital.id,
      beforeImageUrls: beforeImages.map((img) => img.url),
      afterImageUrls: afterImages.map((img) => img.url),
      userId: user.id,
    });
  };

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
    <form onSubmit={handleSubmit}>
      <PageHeaderV2
        title={dict.reviewWrite?.form?.title || 'Write Review'}
        fallbackUrl={`/${lang}/reviews`}
      />

      {/* 컨텐츠 영역 */}
      <div className='pt-[58px] pb-[120px]'>
        {/* 병원 카드 섹션 */}
        {hospitalCardData && (
          <div className='p-5'>
            <DoctorAffiliatedHospitalCardV2 hospital={hospitalCardData} lang={lang} dict={dict} />
          </div>
        )}

        <div className='space-y-5 px-5 pt-3'>
          {/* 별점 */}
          <div className='flex w-full flex-col gap-2'>
            <div className='flex flex-col items-center gap-0.5'>
              <FieldLabel label={formDict?.ratingQuestion || 'How was your experience?'} />
              <div className='flex gap-0.5'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => updateField('rating', star)}
                    className='transition-transform duration-200 active:scale-90'
                  >
                    <CustomStar filled={star <= formData.rating} size={40} />
                  </button>
                ))}
              </div>
            </div>
            <FieldError message={errors.rating} />
          </div>

          {/* 시술방법 */}
          <InputFieldV2
            label={formDict?.procedureNameLabel || 'Procedure Name'}
            value={formData.procedureName}
            onChange={(e) => updateField('procedureName', e.target.value)}
            placeholder={formDict?.procedureNamePlaceholder || ''}
            error={errors.procedureName}
            required
          />

          {/* 시술부위선택 */}
          <SelectFieldV2
            label={formDict?.medicalSpecialtyLabel || 'Treatment Area'}
            value={formData.medicalSpecialtyId}
            onChange={(value) => updateField('medicalSpecialtyId', value)}
            options={medicalSpecialties.map((specialty) => ({
              value: specialty.id,
              label: extractLocalizedText(specialty.name as Prisma.JsonValue, lang),
            }))}
            placeholder={formDict?.medicalSpecialtyPlaceholder || 'Select area'}
            error={errors.medicalSpecialtyId}
            required
          />

          {/* 후기내용 */}
          <TextareaFieldV2
            label={formDict?.contentLabel || 'Review Content'}
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder={formDict?.contentPlaceholder || ''}
            maxLength={2000}
            currentLength={formData.content.length}
            error={errors.content}
            required
          />

          {/* 시술전 이미지 */}
          <div className='flex w-full flex-col gap-2'>
            <FieldLabel label={formDict?.beforeImagesLabel || 'Before Images'} />
            <ImageUploadSection
              images={beforeImages}
              onAdd={addBeforeImage}
              onRemove={removeBeforeImage}
              isUploading={isUploading}
              addButtonText={formDict?.addPhotoButton || '사진 추가'}
            />
          </div>

          {/* 시술후 이미지 */}
          <div className='flex w-full flex-col gap-2'>
            <FieldLabel label={formDict?.afterImagesLabel || 'After Images'} />
            <ImageUploadSection
              images={afterImages}
              onAdd={addAfterImage}
              onRemove={removeAfterImage}
              isUploading={isUploading}
              addButtonText={formDict?.addPhotoButton || '사진 추가'}
            />
          </div>

          <PrivacyAgreementSection dict={dict} />

          {/* 업로드 에러 */}
          {uploadError && (
            <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600'>{uploadError}</div>
          )}

          {/* 제출 에러 */}
          {submitError && (
            <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600'>
              {submitError.message || dict.reviewWrite?.error?.message || 'An error occurred'}
            </div>
          )}
        </div>
      </div>

      {/* 플로팅 버튼 섹션 */}
      <div
        className={`fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
      >
        <button
          type='submit'
          disabled={!isValid || isSubmitting || isUploading}
          className='bg-sub-900 hover:bg-sub-900/90 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
        >
          {isSubmitting
            ? formDict?.submitting || 'Submitting...'
            : formDict?.submitButton || '시술후기 등록'}
        </button>
      </div>
    </form>
  );
}
