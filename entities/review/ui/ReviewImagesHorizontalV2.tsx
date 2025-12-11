'use client';

import { useState } from 'react';
import { type ReviewImage } from '../model/types';
import { ImageModalCarouselV2 } from 'shared/ui/image-modal-carousel/ImageModalCarouselV2';
import { type ImageModalItem } from 'shared/ui/image-modal-carousel/types';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { info } from 'shared/lib/modal';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { getAuthPath } from 'shared/lib/auth/route-guard';
import { ImageTag } from './ImageTag';

interface ReviewImagesHorizontalV2Props {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
  className?: string;
  requiresLogin?: boolean;
}

/**
 * 후기 상세 V2용 가로 스크롤 이미지 리스트
 * - Before → After 순서로 나열
 * - 각 이미지 크기: 142x142
 * - gap: 4px (Tailwind gap-1)
 * - 클릭 시 기존 모달 로직 재사용
 */
export function ReviewImagesHorizontalV2({
  beforeImages,
  afterImages,
  reviewId,
  lang,
  dict,
  className = '',
  requiresLogin = false,
}: ReviewImagesHorizontalV2Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useLocalizedRouter();

  // 전체 이미지 없으면 렌더링 안 함
  if ((!beforeImages || beforeImages.length === 0) && (!afterImages || afterImages.length === 0)) {
    return null;
  }

  // Before → After 순서로 합치기
  const allImages: ReviewImage[] = [...beforeImages, ...afterImages];

  // 모달용 데이터 변환
  const modalImages: ImageModalItem[] = allImages.map((image) => ({
    id: image.id,
    imageUrl: image.imageUrl,
    alt: image.alt || '리뷰 이미지',
  }));

  const handleImageClick = async (index: number) => {
    if (requiresLogin) {
      await info({
        message: dict.reviewImages?.loginRequired || '이미지를 보려면\n로그인을 해주세요.',
        lang,
        dict,
        onConfirm: () => {
          const currentPath = window.location.pathname;
          const authPath = getAuthPath(lang);
          router.push(`${authPath}?redirect=${encodeURIComponent(currentPath)}`);
        },
      });
      return;
    }

    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`flex gap-1 overflow-x-auto px-5 ${className}`}>
        {allImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleImageClick(index)}
            className='relative h-[142px] w-[142px] shrink-0 overflow-hidden rounded-xl bg-neutral-100'
            aria-label={image.alt || '리뷰 이미지'}
            type='button'
          >
            <img
              src={image.imageUrl}
              alt={image.alt || '리뷰 이미지'}
              className='h-full w-full object-cover'
            />
            <ImageTag type={image.imageType === 'AFTER' ? 'after' : 'before'} className='' />
          </button>
        ))}
      </div>

      <ImageModalCarouselV2
        images={modalImages}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
