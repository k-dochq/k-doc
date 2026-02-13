'use client';

import { type Dictionary } from 'shared/model/types';

interface ReservationActionButtonsProps {
  address: string;
  latitude: number | null;
  longitude: number | null;
  hospitalName: string;
  onCopyAddress: () => void;
  onViewMap: () => void;
  dict: Dictionary;
}

export function ReservationActionButtons({
  address,
  latitude,
  longitude,
  onCopyAddress,
  onViewMap,
  dict,
}: ReservationActionButtonsProps) {
  return (
    <div className='flex flex-wrap gap-1.5'>
      <button
        onClick={onCopyAddress}
        className='shrink-0 whitespace-nowrap rounded-full bg-[#f5f5f5] px-3 py-1.5 text-xs leading-4 text-[#737373]'
      >
        {dict.hospital?.address?.copyButton || '주소복사'}
      </button>
      {latitude && longitude && (
        <button
          onClick={onViewMap}
          className='shrink-0 whitespace-nowrap rounded-full bg-[#f5f5f5] px-3 py-1.5 text-xs leading-4 text-[#737373]'
        >
          {dict.hospital?.map?.title || '지도보기'}
        </button>
      )}
    </div>
  );
}
