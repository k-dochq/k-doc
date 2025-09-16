'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalCard } from 'entities/hospital/ui/HospitalCard';
import { LocaleLink } from 'shared/ui/locale-link';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { convertLikedHospitalsToCardData } from '../lib/convertLikedHospitalData';
import { type LikedHospital } from '../api/entities/types';
import { type User } from '@supabase/supabase-js';

interface FavoritesHospitalsListProps {
  hospitals: LikedHospital[];
  lang: Locale;
  dict: Dictionary;
  user: User | null;
  onToggleLike?: (hospitalId: string) => void;
  loadingHospitalId?: string | null;
  // 무한 스크롤 관련 props
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  className?: string;
}

export function FavoritesHospitalsList({
  hospitals,
  lang,
  dict,
  user,
  onToggleLike,
  loadingHospitalId,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  className = '',
}: FavoritesHospitalsListProps) {
  // 중복된 병원 ID 제거
  const uniqueHospitals = hospitals.filter(
    (hospital, index, array) => array.findIndex((h) => h.id === hospital.id) === index,
  );

  // LikedHospital을 HospitalCardData로 변환 (best hospitals와 동일한 구조)
  const hospitalCardData = convertLikedHospitalsToCardData(uniqueHospitals);

  return (
    <div className={`w-full p-5 ${className}`}>
      {/* 병원 리스트 - best hospitals와 동일한 HospitalCard 사용 */}
      <div className='space-y-4'>
        {hospitalCardData.map((hospital) => (
          <LocaleLink key={hospital.id} href={`/hospital/${hospital.id}`} className='block'>
            <HospitalCard
              hospital={hospital}
              dict={dict}
              lang={lang}
              user={user}
              onToggleLike={onToggleLike}
              isLikeLoading={loadingHospitalId === hospital.id}
              showLikeButton={true}
            />
          </LocaleLink>
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      <InfiniteScrollTrigger
        onIntersect={onLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadingText={dict.favorites.loadingMore}
        endText={dict.favorites.allLoaded}
      />
    </div>
  );
}
