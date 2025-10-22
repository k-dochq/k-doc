'use client';

import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type PriceBreakdown } from '../model/pricing';
import { type Dictionary } from 'shared/model/types';

interface FloatingPaymentButtonProps {
  priceBreakdown: PriceBreakdown;
  isFormValid: boolean;
  onSubmit: () => void;
  dict: Dictionary;
}

export function FloatingPaymentButton({
  priceBreakdown,
  isFormValid,
  onSubmit,
  dict,
}: FloatingPaymentButtonProps) {
  const { totalPrice } = priceBreakdown;
  const currency = dict.package?.vanReservation?.price?.currency || 'USD';

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-neutral-200 bg-[#fce4ff] px-5 pt-4 pb-10 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1'>
          <div className='text-sm text-neutral-600'>
            {dict.package?.vanReservation?.price?.total || '총 금액'}
          </div>
          <div className='text-2xl font-bold text-[#DA47EF]'>
            ${totalPrice} {currency}
          </div>
        </div>
        <button
          type='button'
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`rounded-xl px-8 py-4 font-semibold text-white transition-all duration-200 ${
            isFormValid
              ? 'bg-[#DA47EF] shadow-lg hover:bg-[#C73AE0] hover:shadow-xl'
              : 'cursor-not-allowed bg-neutral-300'
          } `}
        >
          {dict.package?.vanReservation?.buttons?.payment || '결제하기'}
        </button>
      </div>
    </div>
  );
}
