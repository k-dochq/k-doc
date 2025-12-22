'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ImageModalCarouselV2 } from 'shared/ui/image-modal-carousel/ImageModalCarouselV2';
import { type ImageModalItem } from 'shared/ui/image-modal-carousel/types';

interface AboutContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function AboutContentV2({ lang, dict }: AboutContentV2Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 모달용 이미지 데이터
  const modalImages: ImageModalItem[] = [
    {
      id: 'certificate',
      imageUrl: '/images/about_certificate.png',
      alt: dict.about.governmentCertified.certificateLabel,
    },
    {
      id: 'sgi',
      imageUrl: '/images/about_SGI.png',
      alt: dict.about.governmentCertified.sgiLabel,
    },
  ];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='relative px-5 py-14'>
        {/* 배경 이미지 */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='/images/buildings.png'
            alt='Buildings background'
            fill
            className='object-cover'
            priority
          />
        </div>

        {/* 콘텐츠 */}
        <div className='relative z-10'>
          <h2 className='mb-6 text-3xl font-bold whitespace-pre-line text-white'>
            {dict.about.governmentCertified.title}
          </h2>
          <p className='text-base font-normal whitespace-pre-line text-white'>
            {dict.about.governmentCertified.description}
          </p>

          {/* 인증서 이미지 섹션 */}
          <div className='mt-14 flex gap-1'>
            {/* 외국인 환자 유치업 등록증 */}
            <div className='flex-1'>
              <button
                onClick={() => handleImageClick(0)}
                className='relative w-full cursor-pointer overflow-hidden rounded-xl'
                aria-label={dict.about.governmentCertified.certificateLabel}
              >
                <div className='relative aspect-[159/212] w-full'>
                  <Image
                    src='/images/about_certificate.png'
                    alt={dict.about.governmentCertified.certificateLabel}
                    fill
                    className='object-cover'
                  />
                </div>
              </button>
              <p className='mt-0.5 text-sm font-normal text-white'>
                {dict.about.governmentCertified.certificateLabel}
              </p>
            </div>

            {/* 인·허가보증보험증권(SGI) */}
            <div className='flex-1'>
              <button
                onClick={() => handleImageClick(1)}
                className='relative w-full cursor-pointer overflow-hidden rounded-xl'
                aria-label={dict.about.governmentCertified.sgiLabel}
              >
                <div className='relative aspect-[159/212] w-full'>
                  <Image
                    src='/images/about_SGI.png'
                    alt={dict.about.governmentCertified.sgiLabel}
                    fill
                    className='object-cover'
                  />
                </div>
              </button>
              <p className='mt-0.5 text-sm font-normal text-white'>
                {dict.about.governmentCertified.sgiLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 모달 */}
      <ImageModalCarouselV2
        images={modalImages}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
