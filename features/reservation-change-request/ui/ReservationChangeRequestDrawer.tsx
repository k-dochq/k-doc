'use client';

import { useState } from 'react';
import { type Dictionary } from 'shared/model/types';
import { resolveDrawer } from 'shared/lib/drawer';
import { useReservationChangeRequest } from '../model/useReservationChangeRequest';

interface ReservationChangeRequestDrawerProps {
  reservationId: string;
  dict: Dictionary;
  onSuccess?: () => void;
}

export function ReservationChangeRequestDrawer({
  reservationId,
  dict,
  onSuccess,
}: ReservationChangeRequestDrawerProps) {
  const rd = dict.consultation?.reservationDetail;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  );

  const changeRequest = useReservationChangeRequest();

  const handleSubmit = () => {
    if (!date || !time) return;

    changeRequest.mutate(
      { reservationId, requestedDate: date, requestedTime: time },
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='flex flex-col gap-5 px-5 pb-8 pt-6'>
      <h2 className='text-lg font-semibold text-[#404040]'>
        {rd?.changeRequestTitle || '예약 변경 요청'}
      </h2>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-[#737373]'>
            {rd?.changeRequestNewDate || '변경 날짜'}
          </label>
          <input
            type='date'
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='h-12 w-full rounded-xl border border-neutral-200 px-4 text-base text-[#404040] focus:border-neutral-400 focus:outline-none'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-[#737373]'>
            {rd?.changeRequestNewTime || '변경 시간'}
          </label>
          <input
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className='h-12 w-full rounded-xl border border-neutral-200 px-4 text-base text-[#404040] focus:border-neutral-400 focus:outline-none'
          />
        </div>
      </div>

      {feedback && (
        <p
          className={`text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-500'}`}
        >
          {feedback.message}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!date || !time || changeRequest.isPending}
        className='bg-sub-900 hover:bg-sub-900/90 flex h-14 w-full items-center justify-center rounded-xl text-base font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
      >
        {changeRequest.isPending
          ? dict.consultation?.loading || '처리 중...'
          : rd?.changeRequestSubmit || '변경 요청 전송'}
      </button>
    </div>
  );
}
