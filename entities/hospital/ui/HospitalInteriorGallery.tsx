'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Building2, Bed, Users, Stethoscope } from 'lucide-react';
import { type HospitalImage } from '../api/entities/types';

interface HospitalInteriorGalleryProps {
  images: HospitalImage[];
  hospitalName: string;
}

// 기본 내부 이미지 데이터
const DEFAULT_INTERIOR_IMAGES = [
  {
    id: 'default-1',
    icon: Building2,
    title: '접수 및 대기실',
    description: '편안한 대기 공간',
  },
  {
    id: 'default-2',
    icon: Stethoscope,
    title: '진료실',
    description: '최신 의료 장비',
  },
  {
    id: 'default-3',
    icon: Bed,
    title: '회복실',
    description: '안전한 회복 공간',
  },
  {
    id: 'default-4',
    icon: Users,
    title: '상담실',
    description: '전문 상담 공간',
  },
];

export function HospitalInteriorGallery({ images, hospitalName }: HospitalInteriorGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const interiorImages = images
    .filter((img) => img.imageType === 'INTERIOR' && img.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // 실제 이미지가 없으면 기본 이미지 사용
  const hasRealImages = interiorImages.length > 0;

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    const totalImages = hasRealImages ? interiorImages.length : DEFAULT_INTERIOR_IMAGES.length;
    if (selectedImageIndex !== null && selectedImageIndex < totalImages - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <>
      <div className='mb-6'>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>병원 내부</h3>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
          {hasRealImages
            ? // 실제 이미지가 있는 경우
              interiorImages.map((image, index) => (
                <div
                  key={image.id}
                  className='group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100'
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.alt || `${hospitalName} 내부`}
                    fill
                    className='object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110'
                    sizes='(max-width: 768px) 50vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-blue-600/0 transition-all duration-300 group-hover:bg-blue-600/5' />

                  {/* 확대 아이콘 */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <div className='rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm'>
                      <svg
                        className='h-5 w-5 text-gray-700'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            : // 기본 이미지 표시
              DEFAULT_INTERIOR_IMAGES.map((defaultImage, index) => {
                const IconComponent = defaultImage.icon;
                return (
                  <div
                    key={defaultImage.id}
                    className='group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-300 hover:from-blue-100 hover:to-indigo-200 hover:shadow-lg'
                    onClick={() => openModal(index)}
                  >
                    <div className='flex h-full flex-col items-center justify-center p-4 text-center'>
                      <div className='mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                          <IconComponent className='h-6 w-6 text-blue-600' />
                        </div>
                      </div>
                      <h4 className='mb-1 text-sm font-semibold text-gray-800'>
                        {defaultImage.title}
                      </h4>
                      <p className='text-xs text-gray-600'>{defaultImage.description}</p>
                    </div>
                    <div className='absolute inset-0 bg-blue-600/0 transition-all duration-300 group-hover:bg-blue-600/5' />

                    {/* 확대 아이콘 */}
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      <div className='rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm'>
                        <svg
                          className='h-5 w-5 text-gray-700'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImageIndex !== null && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm'
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className='relative max-h-[90vh] max-w-[90vw]' onClick={(e) => e.stopPropagation()}>
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className='absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 hover:text-gray-100'
            >
              <X className='h-6 w-6' />
            </button>

            {/* 이전 버튼 */}
            {selectedImageIndex > 0 && (
              <button
                onClick={goToPrevious}
                className='absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:text-gray-100'
              >
                <ChevronLeft className='h-6 w-6' />
              </button>
            )}

            {/* 다음 버튼 */}
            {selectedImageIndex <
              (hasRealImages ? interiorImages.length : DEFAULT_INTERIOR_IMAGES.length) - 1 && (
              <button
                onClick={goToNext}
                className='absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:text-gray-100'
              >
                <ChevronRight className='h-6 w-6' />
              </button>
            )}

            {/* 이미지 */}
            <div className='relative h-[80vh] w-[80vw]'>
              {hasRealImages ? (
                <Image
                  src={interiorImages[selectedImageIndex].imageUrl}
                  alt={interiorImages[selectedImageIndex].alt || `${hospitalName} 내부`}
                  fill
                  className='object-contain'
                  sizes='80vw'
                  priority
                />
              ) : (
                // 기본 이미지 모달 표시
                <div className='flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow-2xl'>
                  <div className='p-8 text-center'>
                    {(() => {
                      const defaultImage = DEFAULT_INTERIOR_IMAGES[selectedImageIndex];
                      const IconComponent = defaultImage.icon;
                      return (
                        <div className='flex flex-col items-center'>
                          <div className='mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-blue-100/50'>
                            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100'>
                              <IconComponent className='h-12 w-12 text-blue-600' />
                            </div>
                          </div>
                          <h2 className='mb-3 text-3xl font-bold text-slate-800'>
                            {defaultImage.title}
                          </h2>
                          <p className='mb-2 text-lg text-slate-600'>{defaultImage.description}</p>
                          <p className='rounded-full bg-white/60 px-4 py-2 text-sm text-slate-500'>
                            실제 이미지 준비 중입니다
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* 이미지 카운터 */}
            <div className='absolute -bottom-12 left-1/2 -translate-x-1/2'>
              <div className='rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm'>
                <p className='text-sm font-medium text-white'>
                  {selectedImageIndex + 1} /{' '}
                  {hasRealImages ? interiorImages.length : DEFAULT_INTERIOR_IMAGES.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
