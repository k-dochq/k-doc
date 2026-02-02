'use client';

import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { SelectFieldV2 } from 'features/consultation-request/ui/SelectFieldV2';
import { TextareaFieldV2 } from 'features/consultation-request/ui/TextareaFieldV2';
import { ReviewEditRatingSection } from './ReviewEditRatingSection';
import { ReviewEditImageSection } from './ReviewEditImageSection';
import PrivacyAgreementSection from '@/features/review-write/ui/PrivacyAgreementSection';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewFormData } from 'features/review-write/model/useReviewWriteForm';
import { type ReviewImageUpload } from 'entities/review/api/entities/types';

interface ReviewEditFormContentProps {
  lang: Locale;
  dict: Dictionary;
  formData: ReviewFormData;
  errors: {
    rating?: string;
    procedureName?: string;
    medicalSpecialtyId?: string;
    content?: string;
  };
  medicalSpecialties: Array<{
    id: string;
    name: Prisma.JsonValue | { ko_KR?: string; en_US?: string; th_TH?: string };
    specialtyType: string;
  }>;
  existingBeforeImageUrls: string[];
  existingAfterImageUrls: string[];
  beforeImages: ReviewImageUpload[];
  afterImages: ReviewImageUpload[];
  onRatingChange: (rating: number) => void;
  onProcedureNameChange: (value: string) => void;
  onMedicalSpecialtyChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onRemoveExistingBeforeImage: (index: number) => void;
  onRemoveExistingAfterImage: (index: number) => void;
  onAddBeforeImage: (file: File) => Promise<void>;
  onAddAfterImage: (file: File) => Promise<void>;
  onRemoveBeforeImage: (index: number) => void;
  onRemoveAfterImage: (index: number) => void;
  isUploading: boolean;
  uploadError: string | null;
  submitError: Error | null;
}

export function ReviewEditFormContent({
  lang,
  dict,
  formData,
  errors,
  medicalSpecialties,
  existingBeforeImageUrls,
  existingAfterImageUrls,
  beforeImages,
  afterImages,
  onRatingChange,
  onProcedureNameChange,
  onMedicalSpecialtyChange,
  onContentChange,
  onRemoveExistingBeforeImage,
  onRemoveExistingAfterImage,
  onAddBeforeImage,
  onAddAfterImage,
  onRemoveBeforeImage,
  onRemoveAfterImage,
  isUploading,
  uploadError,
  submitError,
}: ReviewEditFormContentProps) {
  const formDict = dict.reviewWrite?.form;

  return (
    <div className='space-y-5 px-5 pt-3'>
      {/* 별점 */}
      <ReviewEditRatingSection
        rating={formData.rating}
        onRatingChange={onRatingChange}
        error={errors.rating}
        ratingQuestion={formDict?.ratingQuestion || 'How was your experience?'}
      />

      {/* 시술방법 */}
      <InputFieldV2
        label={formDict?.procedureNameLabel || 'Procedure Name'}
        value={formData.procedureName}
        onChange={(e) => onProcedureNameChange(e.target.value)}
        placeholder={formDict?.procedureNamePlaceholder || ''}
        error={errors.procedureName}
        required
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      />

      {/* 시술부위선택 */}
      <SelectFieldV2
        label={formDict?.medicalSpecialtyLabel || 'Treatment Area'}
        value={formData.medicalSpecialtyId}
        onChange={onMedicalSpecialtyChange}
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
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={formDict?.contentPlaceholder || ''}
        maxLength={2000}
        currentLength={formData.content.length}
        error={errors.content}
        required
      />

      {/* 시술전 이미지 */}
      <ReviewEditImageSection
        label={formDict?.beforeImagesLabel || 'Before Images'}
        existingImageUrls={existingBeforeImageUrls}
        onRemoveExisting={onRemoveExistingBeforeImage}
        newImages={beforeImages}
        onAdd={onAddBeforeImage}
        onRemove={onRemoveBeforeImage}
        isUploading={isUploading}
        addButtonText={formDict?.addPhotoButton || '사진 추가'}
        type='before'
      />

      {/* 시술후 이미지 */}
      <ReviewEditImageSection
        label={formDict?.afterImagesLabel || 'After Images'}
        existingImageUrls={existingAfterImageUrls}
        onRemoveExisting={onRemoveExistingAfterImage}
        newImages={afterImages}
        onAdd={onAddAfterImage}
        onRemove={onRemoveAfterImage}
        isUploading={isUploading}
        addButtonText={formDict?.addPhotoButton || '사진 추가'}
        type='after'
      />

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
  );
}
