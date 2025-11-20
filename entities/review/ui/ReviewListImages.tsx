'use client';

import { useState } from 'react';
import { type ReviewImage } from '../model/types';
import { BeforeImageSection } from './BeforeImageSection';
import { AfterImageSection } from './AfterImageSection';
import { ReviewImagesModal } from './ReviewImagesModal';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { info } from 'shared/lib/modal';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { getAuthPath } from 'shared/lib/auth/route-guard';

interface ReviewListImagesProps {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
  className?: string;
  requiresLogin?: boolean; // 로그인이 필요한 리뷰인지 여부
}

export function ReviewListImages({
  beforeImages,
  afterImages,
  reviewId,
  lang,
  dict,
  className = '',
  requiresLogin = false,
}: ReviewListImagesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useLocalizedRouter();

  // beforeImages와 afterImages가 모두 빈값이거나 없으면 컴포넌트를 렌더링하지 않음
  if ((!beforeImages || beforeImages.length === 0) && (!afterImages || afterImages.length === 0)) {
    return null;
  }

  const handleImageClick = async (index: number) => {
    if (requiresLogin) {
      // 로그인 모달 열기
      await info({
        message: dict.reviewImages?.loginRequired || '이미지를 보려면\n로그인을 해주세요.',
        lang,
        dict,
        onConfirm: () => {
          // 로그인 페이지로 이동 (현재 경로를 redirect 파라미터로 전달)
          const currentPath = window.location.pathname;
          const authPath = getAuthPath(lang);
          router.push(`${authPath}?redirect=${encodeURIComponent(currentPath)}`);
        },
      });
      return;
    }

    // 기존 이미지 모달 열기
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`flex h-56 overflow-hidden rounded-xl ${className}`}>
        <BeforeImageSection
          beforeImages={beforeImages}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
        />
        <AfterImageSection
          afterImages={afterImages}
          beforeImagesCount={beforeImages.length}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
        />
      </div>

      {/* 리뷰 이미지 모달 */}
      <ReviewImagesModal
        beforeImages={beforeImages}
        afterImages={afterImages}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dict={dict}
      />
    </>
  );
}
