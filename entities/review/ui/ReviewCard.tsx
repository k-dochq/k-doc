'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type ReviewCardData } from '../model/types';
import { Star, User, Calendar } from 'lucide-react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface ReviewCardProps {
  review: ReviewCardData;
  lang: Locale;
}

export function ReviewCard({ review, lang }: ReviewCardProps) {
  const router = useLocalizedRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const title = extractLocalizedText(review.title, lang) || '';
  const content = extractLocalizedText(review.content, lang) || '';
  const medicalSpecialtyName = extractLocalizedText(review.medicalSpecialty.name, lang) || '';

  // Before/After 이미지 분리
  const beforeImages = review.images.filter((img) => img.imageType === 'BEFORE');
  const afterImages = review.images.filter((img) => img.imageType === 'AFTER');

  // 표시할 이미지 선택 (After 우선, 없으면 Before)
  const displayImages = afterImages.length > 0 ? afterImages : beforeImages;
  const currentImage = displayImages[selectedImageIndex];

  // 사용자 표시명 (닉네임 우선, 없으면 displayName, 둘 다 없으면 익명)
  const userName = review.user.nickName || review.user.displayName || '익명';

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : lang === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  // 리뷰 상세 페이지로 이동
  const handleCardClick = () => {
    router.push(`/reviews/${review.id}`);
  };

  return (
    <div
      className='flex h-full cursor-pointer flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md'
      onClick={handleCardClick}
    >
      {/* 헤더 */}
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center space-x-1'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className='text-sm font-medium text-gray-900'>{review.rating.toFixed(1)}</span>
        </div>
        {review.isRecommended && (
          <span className='rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-800'>
            추천
          </span>
        )}
      </div>

      {/* 이미지 섹션 */}
      {displayImages.length > 0 && (
        <div className='mb-3'>
          <div className='relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100'>
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.alt || `${userName}님의 리뷰 이미지`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 90vw, 400px'
            />

            {/* Before/After 라벨 */}
            <div className='absolute top-2 left-2'>
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  currentImage.imageType === 'AFTER'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {currentImage.imageType === 'AFTER' ? 'After' : 'Before'}
              </span>
            </div>
          </div>

          {/* 이미지 네비게이션 */}
          {displayImages.length > 1 && (
            <div className='mt-2 flex justify-center space-x-1'>
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full ${
                    index === selectedImageIndex ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 제목 */}
      {title && <h3 className='mb-2 line-clamp-1 text-sm font-semibold text-gray-900'>{title}</h3>}

      {/* 시술 부위 */}
      {review.concerns && (
        <div className='mb-2'>
          <span className='inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600'>
            {review.concerns}
          </span>
        </div>
      )}

      {/* 내용 */}
      {content && <p className='mb-3 line-clamp-4 flex-1 text-sm text-gray-700'>{content}</p>}

      {/* 푸터 */}
      <div className='flex items-center justify-between text-xs text-gray-500'>
        <div className='flex items-center space-x-1'>
          <User className='h-3 w-3' />
          <span>{userName}</span>
        </div>
        <div className='flex items-center space-x-1'>
          <Calendar className='h-3 w-3' />
          <span>{formatDate(review.createdAt)}</span>
        </div>
      </div>

      {/* 시술 분야 */}
      <div className='mt-2 text-xs text-gray-500'>{medicalSpecialtyName}</div>
    </div>
  );
}
