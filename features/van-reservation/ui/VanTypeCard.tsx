'use client';

import { type VanType, type VanTypeInfo } from '../model/van-types';
import { type Dictionary } from 'shared/model/types';
import { cn } from 'shared/lib';
import { Car, Truck, Bus } from 'lucide-react';

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

  const getVanIcon = () => {
    switch (vanInfo.id) {
      case 'standard':
        return <Car className='h-10 w-10 text-gray-600' />;
      case 'premium':
        return <Truck className='h-10 w-10 text-gray-600' />;
      case 'luxury':
        return <Bus className='h-10 w-10 text-gray-600' />;
      default:
        return <Car className='h-10 w-10 text-gray-600' />;
    }
  };

  return (
    <button
      type='button'
      onClick={() => onSelect(vanInfo.id)}
      className={cn(
        'w-full rounded-xl border border-white p-4 text-left shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] transition-all',
        isSelected ? 'border-[#DA47EF] bg-[#fce4ff] shadow-lg' : 'hover:shadow-md',
      )}
      style={{
        background: isSelected ? '#fce4ff' : 'rgba(255, 255, 255, 0.50)',
      }}
    >
      <div className='flex items-start gap-4'>
        {/* Van Icon/Image Placeholder */}
        <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'>
          {getVanIcon()}
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
