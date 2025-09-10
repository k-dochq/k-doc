'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib';
import { type ReviewCardData } from '../model/types';
import { Star, User, Calendar, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface ReviewDetailCardProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewDetailCard({ review, lang, dict }: ReviewDetailCardProps) {
  const router = useLocalizedRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageType, setSelectedImageType] = useState<'BEFORE' | 'AFTER'>('AFTER');

  const title = extractLocalizedText(review.title, lang) || '';
  const content = extractLocalizedText(review.content, lang) || '';
  const medicalSpecialtyName = extractLocalizedText(review.medicalSpecialty.name, lang) || '';

  // Before/After 이미지 분리
  const beforeImages = review.images.filter((img) => img.imageType === 'BEFORE');
  const afterImages = review.images.filter((img) => img.imageType === 'AFTER');

  // 현재 선택된 타입의 이미지들
  const currentImages = selectedImageType === 'AFTER' ? afterImages : beforeImages;
  const currentImage = currentImages[selectedImageIndex];

  // 사용자 표시명 (닉네임 우선, 없으면 displayName, 둘 다 없으면 익명)
  const userName = review.user.nickName || review.user.displayName || '익명';

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : lang === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  // 이미지 타입 변경
  const handleImageTypeChange = (type: 'BEFORE' | 'AFTER') => {
    setSelectedImageType(type);
    setSelectedImageIndex(0);
  };

  // 이전/다음 이미지
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className='mx-auto max-w-4xl px-4'>
      {/* 헤더 */}
      <div className='mb-6 flex items-center space-x-4'>
        <button
          onClick={() => router.back()}
          className='flex items-center justify-center rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200'
        >
          <ArrowLeft className='h-5 w-5 text-gray-600' />
        </button>
        <div>
          <h1 className='text-xl font-bold text-gray-900'>
            {dict.reviewDetail?.title || '시술후기'}
          </h1>
          <p className='text-sm text-gray-500'>{medicalSpecialtyName}</p>
        </div>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
        {/* 리뷰 헤더 */}
        <div className='mb-6 flex items-start justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className='text-lg font-semibold text-gray-900'>{review.rating.toFixed(1)}</span>
          </div>
          {review.isRecommended && (
            <span className='rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800'>
              추천
            </span>
          )}
        </div>

        {/* 제목 */}
        {title && <h2 className='mb-4 text-lg font-semibold text-gray-900'>{title}</h2>}

        {/* 시술 부위 */}
        {review.concerns && (
          <div className='mb-6'>
            <span className='inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600'>
              {review.concerns}
            </span>
          </div>
        )}

        {/* 이미지 섹션 */}
        {(beforeImages.length > 0 || afterImages.length > 0) && (
          <div className='mb-6'>
            {/* 이미지 타입 선택 */}
            <div className='mb-4 flex space-x-2'>
              {beforeImages.length > 0 && (
                <button
                  onClick={() => handleImageTypeChange('BEFORE')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedImageType === 'BEFORE'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Before ({beforeImages.length})
                </button>
              )}
              {afterImages.length > 0 && (
                <button
                  onClick={() => handleImageTypeChange('AFTER')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedImageType === 'AFTER'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  After ({afterImages.length})
                </button>
              )}
            </div>

            {/* 메인 이미지 */}
            {currentImage && (
              <div className='relative'>
                <div className='relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100'>
                  <Image
                    src={currentImage.imageUrl}
                    alt={currentImage.alt || `${userName}님의 ${selectedImageType} 이미지`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 800px'
                    priority
                  />

                  {/* 이미지 네비게이션 버튼 */}
                  {currentImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70'
                      >
                        <ChevronLeft className='h-5 w-5' />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70'
                      >
                        <ChevronRight className='h-5 w-5' />
                      </button>
                    </>
                  )}

                  {/* 이미지 카운터 */}
                  {currentImages.length > 1 && (
                    <div className='absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs text-white'>
                      {selectedImageIndex + 1} / {currentImages.length}
                    </div>
                  )}
                </div>

                {/* 썸네일 */}
                {currentImages.length > 1 && (
                  <div className='mt-3 flex space-x-2 overflow-x-auto pb-2'>
                    {currentImages.map((img, index) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition-colors ${
                          index === selectedImageIndex
                            ? 'border-blue-500'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={img.imageUrl}
                          alt={`썸네일 ${index + 1}`}
                          fill
                          className='object-cover'
                          sizes='64px'
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 내용 */}
        {content && (
          <div className='mb-6'>
            <h3 className='mb-3 text-sm font-medium text-gray-900'>
              {dict.reviewDetail?.content || '후기 내용'}
            </h3>
            <div className='text-sm leading-relaxed whitespace-pre-wrap text-gray-700'>
              {content}
            </div>
          </div>
        )}

        {/* 푸터 */}
        <div className='flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500'>
          <div className='flex items-center space-x-1'>
            <User className='h-4 w-4' />
            <span>{userName}</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Calendar className='h-4 w-4' />
            <span>{formatDate(review.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
