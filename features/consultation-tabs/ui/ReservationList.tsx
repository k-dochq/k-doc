'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReservationData } from 'entities/reservation';
import { ReservationItemCard } from './ReservationItemCard';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';

interface ReservationListProps {
  reservations: ReservationData[];
  lang: Locale;
  dict: Dictionary;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export function ReservationList({
  reservations,
  lang,
  dict,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: ReservationListProps) {
  if (reservations.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3 p-5'>
      {reservations.map((reservation) => (
        <ReservationItemCard
          key={reservation.id}
          reservation={reservation}
          lang={lang}
          dict={dict}
        />
      ))}

      {/* 인피니트 스크롤 트리거 */}
      <InfiniteScrollTrigger
        onIntersect={onLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadingText={
          dict.consultation?.appointment?.loadingMore || '더 많은 예약 내역을 불러오는 중...'
        }
        endText={dict.consultation?.appointment?.allLoaded || '모든 예약 내역을 불러왔습니다.'}
      />
    </div>
  );
}
