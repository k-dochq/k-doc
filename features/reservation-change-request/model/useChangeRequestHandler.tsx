'use client';

import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { openDrawer } from 'shared/lib/drawer';
import { info } from 'shared/lib/modal/modal-api';
import { queryKeys } from 'shared/lib/query-keys';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { getHospitalClosedWeekdays } from 'features/consultation-request/lib/hospital-closed-weekdays';
import { DatePickerDrawerContentV2 } from 'features/consultation-request/ui/DatePickerDrawerContentV2';
import { formatDateToString } from 'shared/lib/date-utils';
import { useReservationChangeRequest } from './useReservationChangeRequest';

const EN_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Params {
  reservationId: string;
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function useChangeRequestHandler({ reservationId, hospitalId, lang, dict }: Params) {
  const queryClient = useQueryClient();
  const { data: hospitalDetail } = useHospitalDetail(hospitalId);
  const openingHours = hospitalDetail?.hospital?.openingHours;
  const changeRequest = useReservationChangeRequest();

  const closedWeekdays = useMemo(() => getHospitalClosedWeekdays(openingHours), [openingHours]);

  const isDateDisabled = useMemo(
    (): ((date: Date) => boolean) =>
      (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return true;
        return closedWeekdays.has(date.getDay());
      },
    [closedWeekdays],
  );

  const handleChangeRequest = async () => {
    const rd = dict.consultation?.reservationDetail;

    const picked = await openDrawer<Date | undefined>({
      content: (
        <DatePickerDrawerContentV2
          locale={lang}
          dict={dict}
          disabled={isDateDisabled}
          confirmLabel={rd?.changeRequestSubmit || '변경 요청 전송'}
          titlePlaceholder={rd?.changeRequestNewDate || '변경 날짜 및 시간'}
          openingHours={openingHours}
        />
      ),
    });

    if (!(picked instanceof Date)) return;

    const requestedDate = formatDateToString(picked);
    const h = picked.getHours();
    const m = picked.getMinutes();
    const requestedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

    changeRequest.mutate(
      { reservationId, requestedDate, requestedTime },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.reservations.detail(reservationId) });
          queryClient.invalidateQueries({ queryKey: queryKeys.reservations.lists() });

          const dayOfWeek = EN_DAY_NAMES[picked.getDay()];
          const formattedDateTime = `${requestedDate}(${dayOfWeek}) ${requestedTime} (KST)`;

          await info({
            message: (
              <div className='flex flex-col gap-3 w-full text-center'>
                <p className='text-lg font-bold text-[#404040]'>
                  {rd?.changeRequestReceived || '예약 변경 요청이 접수되었습니다.'}
                </p>
                <p className='text-base font-normal text-[#737373] whitespace-pre-wrap'>
                  {`${rd?.changeRequestDateLabel || '변경 요청 일정'}\n${formattedDateTime}\n\n${rd?.changeRequestInfoMsg || '선택하신 일정의 예약 가능 여부는 상담을 통해 안내드릴 예정입니다.'}`}
                </p>
              </div>
            ),
            confirmText: rd?.changeRequestConfirm || '예',
          });
        },
      },
    );
  };

  return { handleChangeRequest, isChangeRequestPending: changeRequest.isPending };
}
