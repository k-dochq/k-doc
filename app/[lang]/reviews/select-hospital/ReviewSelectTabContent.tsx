'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useInfiniteReservations, type ReservationData } from 'entities/reservation';
import { ChatRoomEmptyStateV2 } from 'features/consultation-tabs/ui/ChatRoomEmptyStateV2';
import { ReservationList } from 'features/consultation-tabs/ui/ReservationList';
import { ReservationListSkeleton } from 'features/consultation-tabs/ui/ReservationListSkeleton';

interface ReviewSelectTabContentProps {
  lang: Locale;
  dict: Dictionary;
  hasReviewed: boolean;
}

export function ReviewSelectTabContent({
  lang,
  dict,
  hasReviewed,
}: ReviewSelectTabContentProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteReservations({
      limit: 10,
      hasReviewed,
    });

  if (isLoading) {
    return <ReservationListSkeleton />;
  }

  if (isError) {
    return (
      <ChatRoomEmptyStateV2
        lang={lang}
        dict={dict}
        title={dict.reviewWrite?.selectHospital?.error?.title || '데이터를 불러올 수 없습니다'}
        description={
          dict.reviewWrite?.selectHospital?.error?.message || '잠시 후 다시 시도해주세요.'
        }
      />
    );
  }

  const allReservations =
    data?.pages.flatMap((page) => page.reservations as ReservationData[]) || [];

  if (allReservations.length > 0) {
    return (
      <ReservationList
        reservations={allReservations}
        lang={lang}
        dict={dict}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    );
  }

  const emptyTitle = hasReviewed
    ? dict.reviewWrite?.selectHospital?.empty?.writtenTitle || '작성 완료한 후기가 없어요'
    : dict.reviewWrite?.selectHospital?.empty?.writableTitle || '작성 가능한 후기가 없어요';
  const emptyDescription =
    dict.reviewWrite?.selectHospital?.empty?.writableDescription ||
    '궁금한 시술이나 병원에 상담을 시작해보세요';

  return (
    <ChatRoomEmptyStateV2
      lang={lang}
      dict={dict}
      title={emptyTitle}
      description={emptyDescription}
    />
  );
}
