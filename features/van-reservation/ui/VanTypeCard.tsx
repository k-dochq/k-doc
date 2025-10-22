'use client';

import { type VanType, type VanTypeInfo } from '../model/van-types';
import { type Dictionary } from 'shared/model/types';
import { cn } from 'shared/lib';

interface VanTypeCardProps {
  vanInfo: VanTypeInfo;
  isSelected: boolean;
  onSelect: (vanType: VanType) => void;
  dict: Dictionary;
}

export function VanTypeCard({ vanInfo, isSelected, onSelect, dict }: VanTypeCardProps) {
  const getName = () => {
    return dict.package?.vanReservation?.vanTypes?.[vanInfo.id]?.name || vanInfo.id;
  };

  const getDescription = () => {
    return dict.package?.vanReservation?.vanTypes?.[vanInfo.id]?.description || '';
  };

  const getCapacity = () => {
    return dict.package?.vanReservation?.vanTypes?.[vanInfo.id]?.capacity || '';
  };

  return (
    <button
      type='button'
      onClick={() => onSelect(vanInfo.id)}
      className={cn(
        'w-full rounded-xl border-2 bg-white p-4 text-left transition-all',
        isSelected
          ? 'border-[#DA47EF] shadow-lg'
          : 'border-neutral-200 hover:border-neutral-300 hover:shadow-md',
      )}
    >
      <div className='flex items-start gap-4'>
        {/* Van Icon/Image Placeholder */}
        <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100'>
          <svg
            className='h-10 w-10 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
            />
          </svg>
        </div>

        {/* Van Info */}
        <div className='flex-1'>
          <h3 className='text-lg font-bold text-neutral-900'>{getName()}</h3>
          <p className='mt-1 text-sm text-neutral-600'>{getDescription()}</p>
          <p className='mt-2 text-xs text-neutral-500'>{getCapacity()}</p>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className='flex-shrink-0'>
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#DA47EF]'>
              <svg className='h-4 w-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Price Preview */}
      <div className='mt-3 flex items-baseline gap-2 border-t border-neutral-100 pt-3'>
        <span className='text-sm text-neutral-500'>
          {dict.package?.vanReservation?.serviceType?.oneWay}:
        </span>
        <span className='text-lg font-bold text-[#DA47EF]'>${vanInfo.basePrice.oneWay}</span>
        <span className='text-xs text-neutral-400'>|</span>
        <span className='text-sm text-neutral-500'>
          {dict.package?.vanReservation?.serviceType?.hourlyCharter}:
        </span>
        <span className='text-lg font-bold text-[#DA47EF]'>${vanInfo.basePrice.hourlyCharter}</span>
      </div>
    </button>
  );
}
