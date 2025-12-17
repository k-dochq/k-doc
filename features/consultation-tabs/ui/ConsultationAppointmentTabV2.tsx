'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useInfiniteReservations, type ReservationData } from 'entities/reservation';
import { ChatRoomEmptyStateV2 } from './ChatRoomEmptyStateV2';
import { ReservationList } from './ReservationList';
import { ReservationListSkeleton } from './ReservationListSkeleton';

interface ConsultationAppointmentTabV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationAppointmentTabV2({ lang, dict }: ConsultationAppointmentTabV2Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteReservations({
      limit: 10,
    });

  // 로딩 상태
  if (isLoading) {
    return <ReservationListSkeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ChatRoomEmptyStateV2
        lang={lang}
        dict={dict}
        title={dict.consultation?.error || '데이터를 불러오는 중 오류가 발생했습니다.'}
        description={dict.consultation?.retry || '다시 시도해주세요.'}
      />
    );
  }

  // 데이터 플래튼
  const allReservations =
    data?.pages.flatMap((page) => page.reservations as ReservationData[]) || [];

  // 데이터가 있는 경우 리스트 표시
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

  // 빈 상태
  return (
    <ChatRoomEmptyStateV2
      lang={lang}
      dict={dict}
      title={dict.consultation?.empty?.appointment?.title || '예약된 내역이 없어요'}
      description={
        dict.consultation?.empty?.appointment?.description || '원하는 병원에 예약을 신청해보세요'
      }
    />
  );
}
