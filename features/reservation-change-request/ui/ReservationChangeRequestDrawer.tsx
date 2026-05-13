'use client';

import { useMemo, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { resolveDrawer } from 'shared/lib/drawer';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { getHospitalClosedWeekdays } from 'features/consultation-request/lib/hospital-closed-weekdays';
import { FormDatePickerDrawerV2 } from 'features/consultation-request/ui/FormDatePickerDrawerV2';
import { formatDateToString } from 'shared/lib/date-utils';
import { useReservationChangeRequest } from '../model/useReservationChangeRequest';

interface ReservationChangeRequestDrawerProps {
  reservationId: string;
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  onSuccess?: () => void;
}

export function ReservationChangeRequestDrawer({
  reservationId,
  hospitalId,
  lang,
  dict,
  onSuccess,
}: ReservationChangeRequestDrawerProps) {
  const rd = dict.consultation?.reservationDetail;
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(undefined);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  );

  const { data: hospitalDetail } = useHospitalDetail(hospitalId);
  const openingHours = hospitalDetail?.hospital?.openingHours;

  const closedWeekdays = useMemo(() => getHospitalClosedWeekdays(openingHours), [openingHours]);
  const isDateDisabled = useMemo(
    () =>
      (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return true;
        return closedWeekdays.has(date.getDay());
      },
    [closedWeekdays],
  );

  const changeRequest = useReservationChangeRequest();

  const handleSubmit = () => {
    if (!selectedDateTime) return;

    const requestedDate = formatDateToString(selectedDateTime);
    const h = selectedDateTime.getHours();
    const m = selectedDateTime.getMinutes();
    const requestedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

    changeRequest.mutate(
      { reservationId, requestedDate, requestedTime },
      {
        onSuccess: () => {
          setFeedback({
            type: 'success',
            message: rd?.changeRequestSuccess || '변경 요청이 전송되었습니다.',
          });
          onSuccess?.();
          setTimeout(() => resolveDrawer(), 1500);
        },
        onError: () => {
          setFeedback({
            type: 'error',
            message: rd?.changeRequestError || '변경 요청 전송에 실패했습니다.',
          });
        },
      },
    );
  };

  return (
    <div className='flex flex-col gap-5 px-5 pb-8 pt-6'>
      <h2 className='text-lg font-semibold text-[#404040]'>
        {rd?.changeRequestTitle || '예약 변경 요청'}
      </h2>

      <FormDatePickerDrawerV2
        label={rd?.changeRequestNewDate || '변경 날짜 및 시간'}
        value={selectedDateTime}
        onChange={(date) => setSelectedDateTime(date)}
        locale={lang}
        dict={dict}
        placeholder='날짜와 시간을 선택해주세요'
        disabled={isDateDisabled}
        required
        openingHours={openingHours}
      />

      {feedback && (
        <p
          className={`text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-500'}`}
        >
          {feedback.message}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedDateTime || changeRequest.isPending}
        className='bg-primary-900 hover:bg-primary-900/90 flex h-14 w-full items-center justify-center rounded-xl text-base font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
      >
        {changeRequest.isPending
          ? dict.consultation?.loading || '처리 중...'
          : rd?.changeRequestSubmit || '변경 요청 전송'}
      </button>
    </div>
  );
}
