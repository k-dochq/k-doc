'use client';

import { type Locale } from 'shared/config';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useReviewWriteForm } from '../model/useReviewWriteForm';
import { useImageUpload } from '../model/useImageUpload';
import { useCreateReview } from '../model/useCreateReview';
import { HospitalInfoCard } from './HospitalInfoCard';
import { StarRating } from './StarRating';
import { MedicalSpecialtySelect } from './MedicalSpecialtySelect';
import { ImageUploadSection } from './ImageUploadSection';

interface ReviewWriteFormProps {
  lang: Locale;
  dict: Dictionary;
  hospital: {
    id: string;
    name: unknown;
    address: unknown;
    thumbnailImageUrl: string | null;
  };
  medicalSpecialties: Array<{
    id: string;
    name: unknown;
    specialtyType: string;
  }>;
}

export function ReviewWriteForm({
  lang,
  dict,
  hospital,
  medicalSpecialties,
}: ReviewWriteFormProps) {
  const { user } = useAuth();
  const router = useLocalizedRouter();

  const { formData, errors, isValid, updateField, validateForm } = useReviewWriteForm(dict);
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
    onSuccess: (reviewId: string, hospitalId: string) => {
      // 성공 시 해당 병원의 리뷰 목록 페이지로 이동 (히스토리 스택에 쌓이지 않게 replace 사용)
      router.replace(`/hospital/${hospitalId}/reviews`);
    },
    onError: (error: Error) => {
      console.error('Submit review error:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user) {
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

  const formDict = dict.reviewWrite?.form;

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-6 pb-24'>
        {/* 병원 정보 카드 */}
        <HospitalInfoCard hospital={hospital} lang={lang} />
        {/* 별점 */}
        <StarRating
          rating={formData.rating}
          onRatingChange={(rating) => updateField('rating', rating)}
          label={formDict?.ratingQuestion || 'How was your experience?'}
          error={errors.rating}
        />
        {/* 시술 방법 */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-900'>
            {formDict?.procedureNameLabel || 'Procedure Name'}
          </label>
          <input
            type='text'
            value={formData.procedureName}
            onChange={(e) => updateField('procedureName', e.target.value)}
            placeholder={formDict?.procedureNamePlaceholder || ''}
            className='w-full rounded-xl border-2 border-[#FF60F7] bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-[#DA47EF] focus:outline-none'
          />
          {errors.procedureName && <p className='text-xs text-red-500'>{errors.procedureName}</p>}
        </div>
        {/* 시술 부위 선택 */}
        <MedicalSpecialtySelect
          specialties={medicalSpecialties}
          value={formData.medicalSpecialtyId}
          onChange={(value) => updateField('medicalSpecialtyId', value)}
          label={formDict?.medicalSpecialtyLabel || 'Treatment Area'}
          placeholder={formDict?.medicalSpecialtyPlaceholder || 'Select area'}
          error={errors.medicalSpecialtyId}
          lang={lang}
        />
        {/* 후기 내용 */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-900'>
            {formDict?.contentLabel || 'Review Content'}
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder={formDict?.contentPlaceholder || ''}
            rows={6}
            maxLength={500}
            className='w-full resize-none rounded-xl border-2 border-[#FF60F7] bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-[#DA47EF] focus:outline-none'
          />
          <div className='flex items-center justify-between'>
            {errors.content && <p className='text-xs text-red-500'>{errors.content}</p>}
            <p className='ml-auto text-xs text-gray-500'>
              {formDict?.characterCount?.replace(
                '{{current}}',
                formData.content.length.toString(),
              ) || `${formData.content.length}/500`}
            </p>
          </div>
        </div>
        {/* 시술 전 이미지 */}
        <ImageUploadSection
          label={formDict?.beforeImagesLabel || 'Before Images'}
          images={beforeImages}
          onAdd={addBeforeImage}
          onRemove={removeBeforeImage}
          isUploading={false}
        />
        {/* 시술 후 이미지 */}
        <ImageUploadSection
          label={formDict?.afterImagesLabel || 'After Images'}
          images={afterImages}
          onAdd={addAfterImage}
          onRemove={removeAfterImage}
          isUploading={false}
        />
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
        {/* 제출 버튼 (하단 고정) */}
        <div className='fixed right-0 bottom-0 left-0 z-10 bg-white p-5'>
          <div className={`mx-auto ${MAX_MOBILE_WIDTH_CLASS}`}>
            <button
              type='submit'
              disabled={!isValid || isSubmitting || isUploading}
              className='w-full rounded-xl bg-[#DA47EF] py-4 font-semibold text-white transition-opacity hover:bg-[#C63DD6] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isSubmitting
                ? formDict?.submitting || 'Submitting...'
                : formDict?.submitButton || 'Submit Review'}
            </button>
          </div>
        </div>
      </form>

      {/* 업로드 중 전체 화면 오버레이 */}
      {isUploading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#DA47EF]/20'></div>
              <div className='absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-[#DA47EF]'></div>
            </div>
            <p className='text-base font-semibold text-white drop-shadow-lg'>
              {formDict?.uploading || '업로드중입니다'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
