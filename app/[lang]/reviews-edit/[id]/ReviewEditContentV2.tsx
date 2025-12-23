'use client';

import { useEffect, useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { useCategories } from 'features/category-filter/model/useCategories';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { useReviewDetail } from 'entities/review/model/useReviewDetail';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { DoctorAffiliatedHospitalCardV2 } from 'widgets/doctor-affiliated-hospital/ui/DoctorAffiliatedHospitalCardV2';
import { convertHospitalToCardData } from 'entities/hospital/lib/hospital-type-converters';
import { useReviewWriteForm } from 'features/review-write/model/useReviewWriteForm';
import { useImageUpload } from 'features/review-write/model/useImageUpload';
import { useUpdateReview } from 'features/review-write/model/useUpdateReview';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Prisma } from '@prisma/client';
import {
  ReviewEditFormContent,
  ReviewEditLoadingState,
  ReviewEditErrorState,
  ReviewEditFloatingButton,
} from 'features/review-edit';

interface ReviewEditContentV2Props {
  lang: Locale;
  dict: Dictionary;
  reviewId: string;
}

export function ReviewEditContentV2({ lang, dict, reviewId }: ReviewEditContentV2Props) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useLocalizedRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  // TanStack Query로 리뷰 상세 정보 조회
  const {
    data: reviewDetailData,
    isLoading: isLoadingReview,
    isError: isReviewError,
  } = useReviewDetail({ reviewId, enabled: !!reviewId });

  const review = reviewDetailData?.review;

  // TanStack Query로 병원 정보 조회
  const {
    data: hospitalDetailData,
    isLoading: isLoadingHospital,
    isError: isHospitalError,
  } = useHospitalDetail(review?.hospital.id || '');

  // TanStack Query로 시술 부위 목록 조회
  const {
    data: medicalSpecialties = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useCategories();

  const hospital = hospitalDetailData?.hospital;
  const error =
    isHospitalError || isCategoriesError || isReviewError ? 'Failed to load data' : null;

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

  // 기존 이미지 URL 관리 (기존 이미지와 새로 업로드한 이미지를 합치기 위해)
  const [existingBeforeImageUrls, setExistingBeforeImageUrls] = useState<string[]>([]);
  const [existingAfterImageUrls, setExistingAfterImageUrls] = useState<string[]>([]);

  // 기존 이미지를 폼에 채우기
  useEffect(() => {
    if (review && !isInitialized) {
      // 폼 데이터 초기화
      updateField('rating', review.rating);
      updateField(
        'procedureName',
        extractLocalizedText(review.concernsMultilingual as Prisma.JsonValue, lang) || '',
      );
      updateField('content', extractLocalizedText(review.content as Prisma.JsonValue, lang) || '');
      // medicalSpecialtyId는 ReviewCardData에 없으므로, medicalSpecialties 목록에서 찾기
      const matchingSpecialty = medicalSpecialties.find(
        (s) => s.specialtyType === review.medicalSpecialty.specialtyType,
      );
      if (matchingSpecialty) {
        updateField('medicalSpecialtyId', matchingSpecialty.id);
      }

      // 기존 이미지 URL 저장
      setExistingBeforeImageUrls(review.images.before.map((img) => img.imageUrl));
      setExistingAfterImageUrls(review.images.after.map((img) => img.imageUrl));

      // 기존 이미지를 ReviewImageUpload 형식으로 변환하여 상태에 추가
      // useImageUpload의 내부 상태를 직접 수정할 수 없으므로,
      // 기존 이미지 URL을 별도로 관리하고 제출 시 합침
      setIsInitialized(true);
    }
  }, [review, lang, isInitialized, updateField, medicalSpecialties]);

  // TanStack Query mutation
  const {
    mutate: updateReview,
    isPending: isSubmitting,
    error: submitError,
  } = useUpdateReview({
    onSuccess: () => {
      // 성공 시 리뷰 상세 페이지로 이동
      router.replace(`/review/${reviewId}`);
    },
    onError: (error: Error) => {
      console.error('Update review error:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user || !review) {
      return;
    }

    // 기존 이미지 URL과 새로 업로드한 이미지 URL 합치기
    // 새로 업로드한 이미지는 기존 이미지 URL과 중복되지 않도록 필터링
    const newBeforeImageUrls = beforeImages
      .map((img) => img.url)
      .filter((url) => !existingBeforeImageUrls.includes(url));
    const newAfterImageUrls = afterImages
      .map((img) => img.url)
      .filter((url) => !existingAfterImageUrls.includes(url));

    // 기존 이미지 URL과 새 이미지 URL 합치기
    const allBeforeImageUrls = [...existingBeforeImageUrls, ...newBeforeImageUrls];
    const allAfterImageUrls = [...existingAfterImageUrls, ...newAfterImageUrls];

    // Mutation 실행
    updateReview({
      reviewId,
      data: {
        rating: formData.rating,
        content: formData.content,
        procedureName: formData.procedureName,
        medicalSpecialtyId: formData.medicalSpecialtyId,
        beforeImageUrls: allBeforeImageUrls,
        afterImageUrls: allAfterImageUrls,
      },
    });
  };

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

  // 리뷰 작성자 확인
  useEffect(() => {
    if (review && user && review.userId !== user.id) {
      router.push(`/review/${reviewId}`);
    }
  }, [review, user, reviewId, router]);

  // 로딩 중
  if (isLoadingReview || isLoadingHospital || isLoadingCategories || isAuthLoading) {
    return <ReviewEditLoadingState lang={lang} dict={dict} reviewId={reviewId} />;
  }

  // 에러
  if (error || !review || !hospital) {
    return <ReviewEditErrorState lang={lang} dict={dict} reviewId={reviewId} error={error} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <PageHeaderV2
        title={dict.reviewWrite?.form?.title || 'Edit Review'}
        fallbackUrl={`/${lang}/review/${reviewId}`}
      />

      {/* 컨텐츠 영역 */}
      <div className='pt-[58px] pb-[120px]'>
        {/* 병원 카드 섹션 */}
        {hospitalCardData && (
          <div className='p-5'>
            <DoctorAffiliatedHospitalCardV2 hospital={hospitalCardData} lang={lang} dict={dict} />
          </div>
        )}

        <ReviewEditFormContent
          lang={lang}
          dict={dict}
          formData={formData}
          errors={errors}
          medicalSpecialties={medicalSpecialties}
          existingBeforeImageUrls={existingBeforeImageUrls}
          existingAfterImageUrls={existingAfterImageUrls}
          beforeImages={beforeImages}
          afterImages={afterImages}
          onRatingChange={(rating) => updateField('rating', rating)}
          onProcedureNameChange={(value) => updateField('procedureName', value)}
          onMedicalSpecialtyChange={(value) => updateField('medicalSpecialtyId', value)}
          onContentChange={(value) => updateField('content', value)}
          onRemoveExistingBeforeImage={(index) => {
            setExistingBeforeImageUrls((prev) => prev.filter((_, i) => i !== index));
          }}
          onRemoveExistingAfterImage={(index) => {
            setExistingAfterImageUrls((prev) => prev.filter((_, i) => i !== index));
          }}
          onAddBeforeImage={addBeforeImage}
          onAddAfterImage={addAfterImage}
          onRemoveBeforeImage={removeBeforeImage}
          onRemoveAfterImage={removeAfterImage}
          isUploading={isUploading}
          uploadError={uploadError}
          submitError={submitError}
        />
      </div>

      {/* 플로팅 버튼 섹션 */}
      <ReviewEditFloatingButton
        dict={dict}
        isValid={isValid}
        isSubmitting={isSubmitting}
        isUploading={isUploading}
      />
    </form>
  );
}
