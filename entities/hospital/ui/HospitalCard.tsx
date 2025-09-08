'use client';

import { useState } from 'react';
import { Star, MapPin, Users, Eye, Building2 } from 'lucide-react';
import { type Locale, getHospitalImageUrl } from 'shared/config';
import { type Hospital } from '../api/entities/types';

interface HospitalCardProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCard({ hospital, lang }: HospitalCardProps) {
  const [imageError, setImageError] = useState(false);
  const getHospitalName = (hospital: Hospital): string => {
    // JsonValue를 안전하게 처리
    if (!hospital.name || typeof hospital.name !== 'object' || hospital.name === null) {
      return 'Unknown Hospital';
    }

    const nameObj = hospital.name as Record<string, string>;

    switch (lang) {
      case 'ko':
        return nameObj.ko_KR || nameObj.ko || 'Unknown Hospital';
      case 'en':
        return nameObj.en_US || nameObj.en || 'Unknown Hospital';
      case 'th':
        return nameObj.th_TH || nameObj.th || 'Unknown Hospital';
      default:
        return nameObj.ko_KR || nameObj.ko || 'Unknown Hospital'; // Fallback
    }
  };

  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className='flex min-h-[200px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md'>
      {/* 병원 이미지 */}
      <div className='mb-3'>
        {hospital.mainImageUrl && !imageError ? (
          <img
            src={hospital.mainImageUrl}
            alt={getHospitalName(hospital)}
            className='h-20 w-full rounded object-cover'
            onError={() => setImageError(true)}
          />
        ) : (
          <div className='flex h-20 w-full items-center justify-center rounded bg-gray-100'>
            <Building2 className='h-8 w-8 text-gray-400' />
          </div>
        )}
      </div>

      {/* 병원 이름 */}
      <div>
        <h3 className='truncate text-lg font-semibold text-gray-900'>
          {getHospitalName(hospital)}
        </h3>
      </div>

      {/* 평점 및 리뷰 */}
      <div className='flex items-center space-x-2'>
        <div className='flex items-center space-x-1'>
          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
          <span className='text-sm font-medium text-gray-900'>{formatRating(hospital.rating)}</span>
        </div>
        <div className='flex items-center space-x-1 text-gray-500'>
          <Users className='h-4 w-4' />
          <span className='text-sm'>{formatCount(hospital.reviewCount)}</span>
        </div>
      </div>

      {/* 통계 정보 */}
      <div className='flex items-center justify-between text-sm text-gray-500'>
        <div className='flex items-center space-x-1'>
          <Eye className='h-4 w-4' />
          <span>{formatCount(hospital.viewCount)}</span>
        </div>
        {hospital.ranking && (
          <div className='rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800'>
            #{hospital.ranking}
          </div>
        )}
      </div>
    </div>
  );
}
