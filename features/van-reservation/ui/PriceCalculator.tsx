'use client';

import { type Dictionary } from 'shared/model/types';
import { formatPrice, type PriceBreakdown } from '../model/pricing';

interface PriceCalculatorProps {
  priceBreakdown: PriceBreakdown;
  dict: Dictionary;
}

export function PriceCalculator({ priceBreakdown, dict }: PriceCalculatorProps) {
  const { basePrice, picketingFee, totalPrice } = priceBreakdown;

  if (totalPrice === 0) {
    return null;
  }

  return (
    <div className='rounded-xl border border-neutral-200 bg-white p-4 shadow-sm'>
      <h3 className='mb-4 text-lg font-bold text-neutral-900'>
        {dict.package?.vanReservation?.price?.total || '총 금액'}
      </h3>

      <div className='space-y-3'>
        {/* Base Price */}
        <div className='flex items-center justify-between'>
          <span className='text-sm text-neutral-600'>
            {dict.package?.vanReservation?.price?.base || '기본 요금'}
          </span>
          <span className='text-sm font-medium text-neutral-900'>{formatPrice(basePrice)}</span>
        </div>

        {/* Picketing Fee */}
        {picketingFee > 0 && (
          <div className='flex items-center justify-between'>
            <span className='text-sm text-neutral-600'>
              {dict.package?.vanReservation?.price?.picketing || '피켓팅'}
            </span>
            <span className='text-sm font-medium text-neutral-900'>
              {formatPrice(picketingFee)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className='border-t border-neutral-200' />

        {/* Total Price */}
        <div className='flex items-center justify-between'>
          <span className='text-base font-bold text-neutral-900'>
            {dict.package?.vanReservation?.price?.total || '총 금액'}
          </span>
          <span className='text-xl font-bold text-[#DA47EF]'>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className='mt-3 text-xs text-neutral-500'>
        {dict.package?.vanReservation?.price?.currency || 'USD'}
      </div>
    </div>
  );
}
