'use client';

import { type ServiceType } from '../model/van-types';
import { type Dictionary } from 'shared/model/types';
import { cn } from 'shared/lib';

interface ServiceTypeSelectorProps {
  selectedType: ServiceType | null;
  onSelect: (type: ServiceType) => void;
  dict: Dictionary;
}

export function ServiceTypeSelector({ selectedType, onSelect, dict }: ServiceTypeSelectorProps) {
  const serviceTypes: ServiceType[] = ['oneWay', 'hourlyCharter'];

  return (
    <div className='space-y-3'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        {dict.package?.vanReservation?.serviceType?.label || '서비스 유형'}
      </label>
      <div className='grid grid-cols-2 gap-3'>
        {serviceTypes.map((type) => (
          <button
            key={type}
            type='button'
            onClick={() => onSelect(type)}
            className={cn(
              'rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-all',
              selectedType === type
                ? 'border-[#DA47EF] bg-[#DA47EF]/5 text-[#DA47EF]'
                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300',
            )}
          >
            {type === 'oneWay'
              ? dict.package?.vanReservation?.serviceType?.oneWay
              : dict.package?.vanReservation?.serviceType?.hourlyCharter}
          </button>
        ))}
      </div>
    </div>
  );
}
