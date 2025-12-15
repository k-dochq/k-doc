'use client';

import { useState } from 'react';
import { type ReviewImage } from '../model/types';
import { BeforeImageSection } from './BeforeImageSection';
import { AfterImageSection } from './AfterImageSection';
import { ImageModalCarouselV2 } from 'shared/ui/image-modal-carousel/ImageModalCarouselV2';
import { type ImageModalItem } from 'shared/ui/image-modal-carousel/types';
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

  // 모든 이미지를 하나의 배열로 합치기 (before 먼저, after 나중)
  const allImages: ReviewImage[] = [...beforeImages, ...afterImages];

  // ImageModalItem 형태로 변환
  const modalImages: ImageModalItem[] = allImages.map((image) => ({
    id: image.id,
    imageUrl: image.imageUrl,
    alt: image.alt || '리뷰 이미지',
  }));

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

    // 이미지 모달 열기 (beforeImages와 afterImages를 합친 배열 기준 인덱스)
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 이미지 개수에 따른 flex 비율 결정
  // 예외: after 이미지가 1개일 경우 50:50
  // 기본: 왼쪽 2/3, 오른쪽 1/3
  const isEqualSplit = afterImages.length === 1;
  const beforeFlexClass = isEqualSplit ? 'flex-1' : 'flex-[2]';
  const afterFlexClass = 'flex-1';

  return (
    <>
      <div className={`flex h-56 overflow-hidden rounded-xl ${className}`}>
        <BeforeImageSection
          beforeImages={beforeImages}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
          className={beforeFlexClass}
        />
        <AfterImageSection
          afterImages={afterImages}
          beforeImagesCount={beforeImages.length}
          reviewId={reviewId}
          lang={lang}
          onImageClick={handleImageClick}
          className={afterFlexClass}
        />
      </div>

      {/* 리뷰 이미지 모달 V2 */}
      <ImageModalCarouselV2
        images={modalImages}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
