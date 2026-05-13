'use client';

import { MAX_MOBILE_WIDTH_CLASS, type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { useCancelReservation } from 'features/reservation-cancel/model/useCancelReservation';
import { useChangeRequestHandler } from 'features/reservation-change-request/model/useChangeRequestHandler';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

interface ReservationDetailFloatingButtonsProps {
  hospitalId: string;
  reservationId: string;
  reservationStatus: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationDetailFloatingButtons({
  hospitalId,
  reservationId,
  reservationStatus,
  lang,
  dict,
}: ReservationDetailFloatingButtonsProps) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const cancelReservation = useCancelReservation();
  const { handleChangeRequest } = useChangeRequestHandler({ reservationId, hospitalId, lang, dict });

  const isCancelled = reservationStatus === 'CANCELLED';
  const isChangeRequested = reservationStatus === 'CHANGE_REQUESTED';
  const isChangeRequestable = !isCancelled && !isChangeRequested;

  const handleChangeRequestWithAuth = async () => {
    if (!isAuthenticated) {
      await openDrawer({ content: <LoginRequiredDrawer lang={lang} dict={dict} /> });
      return;
    }
    await handleChangeRequest();
  };

  const handleCancelReservation = () => {
    cancelReservation.mutate(reservationId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.reservations.detail(reservationId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.reservations.lists() });
      },
    });
  };

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <div className='flex gap-2'>
        <button
          onClick={handleCancelReservation}
          disabled={isCancelled || cancelReservation.isPending}
          className='flex h-14 flex-1 items-center justify-center rounded-xl bg-[#e5e5e5] px-5 py-4 text-base leading-6 font-medium text-[#404040] transition-colors duration-200 hover:bg-[#d5d5d5] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
        >
          {cancelReservation.isPending
            ? dict.consultation?.loading || '처리 중...'
            : dict.consultation?.reservationDetail?.cancel || '예약 취소'}
        </button>

        {isChangeRequestable && (
          <button
            onClick={handleChangeRequestWithAuth}
            className='bg-primary-900 hover:bg-primary-900/90 flex h-14 flex-1 items-center justify-center rounded-xl px-5 py-4 text-base leading-6 font-medium text-white transition-colors duration-200'
          >
            {dict.consultation?.reservationDetail?.changeRequest || '예약 변경'}
          </button>
        )}
      </div>
    </div>
  );
}
