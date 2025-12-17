'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ReservationDetailHeaderActions } from 'features/reservation-detail/ui';
import { ReservationDetailFloatingButtons } from 'widgets/reservation-detail-floating/ui';
import { useReservationDetail } from 'entities/reservation';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { ReservationRequestDate } from 'features/reservation-detail/ui/ReservationRequestDate';
import { ReservationStatusHeader } from 'features/reservation-detail/ui/ReservationStatusHeader';
import { ReservationInfoCard } from 'features/reservation-detail/ui/ReservationInfoCard';

interface ReservationDetailContentProps {
  reservationId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationDetailContent({
  reservationId,
  lang,
  dict,
}: ReservationDetailContentProps) {
  const { data, isLoading, isError } = useReservationDetail(reservationId);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='min-h-screen bg-white'>
        <PageHeaderV2
          title={dict.consultation?.reservationDetail?.title || '예약 상세'}
          rightContent={
            <ReservationDetailHeaderActions reservationId={reservationId} lang={lang} dict={dict} />
          }
        />
        <div className='h-[58px]' />
        <div className='flex min-h-[calc(100vh-58px)] items-center justify-center'>
          <p className='text-neutral-400'>{dict.consultation?.loading || '로딩 중...'}</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError || !data) {
    return (
      <div className='min-h-screen bg-white'>
        <PageHeaderV2
          title={dict.consultation?.reservationDetail?.title || '예약 상세'}
          rightContent={
            <ReservationDetailHeaderActions reservationId={reservationId} lang={lang} dict={dict} />
          }
        />
        <div className='h-[58px]' />
        <div className='flex min-h-[calc(100vh-58px)] items-center justify-center'>
          <p className='text-neutral-400'>
            {dict.consultation?.error || '데이터를 불러오는 중 오류가 발생했습니다.'}
          </p>
        </div>
      </div>
    );
  }

  const reservation = data.reservation;
  const hospitalName = extractLocalizedText(reservation.hospital.name, lang);

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.consultation?.reservationDetail?.title || '예약 상세'}
        rightContent={
          <ReservationDetailHeaderActions
            reservationId={reservationId}
            lang={lang}
            dict={dict}
            hospitalName={hospitalName}
          />
        }
      />
      <div className='h-[58px]' />

      {/* 예약 상세 컨텐츠 */}
      <div className='pb-28'>
        <div className='flex flex-col p-5'>
          {/* 신청 일시 */}
          <ReservationRequestDate createdAt={reservation.createdAt} lang={lang} dict={dict} />

          <div className='h-5' />

          {/* 예약 상태 헤더 */}
          <ReservationStatusHeader
            status={reservation.status}
            reservationDate={reservation.reservationDate}
            reservationTime={reservation.reservationTime}
            lang={lang}
            dict={dict}
          />

          <div className='h-3' />

          {/* 예약 정보 카드 */}
          <ReservationInfoCard
            thumbnailImageUrl={reservation.hospital.thumbnailImageUrl}
            hospitalName={hospitalName}
            reservationDate={reservation.reservationDate}
            reservationTime={reservation.reservationTime}
            hospitalId={reservation.hospital.id}
            lang={lang}
            dict={dict}
          />
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <ReservationDetailFloatingButtons
        hospitalId={reservation.hospital.id}
        reservationId={reservationId}
        lang={lang}
        dict={dict}
      />
    </div>
  );
}
