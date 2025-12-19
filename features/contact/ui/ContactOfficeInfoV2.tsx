'use client';

import { type Dictionary } from 'shared/model/types';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';
import { LocationPinIcon } from '../../../app/[lang]/contact/LocationPinIcon';

interface ContactOfficeInfoV2Props {
  title: string;
  address: string;
  dict: Dictionary;
}

export function ContactOfficeInfoV2({ title, address, dict }: ContactOfficeInfoV2Props) {
  const { copyAddress } = useAddressCopy(dict);

  const handleCopyAddress = () => {
    copyAddress(address);
  };

  return (
    <div className='flex flex-col gap-2 px-5 py-5'>
      <h2 className='text-2xl font-semibold text-neutral-700'>{title}</h2>
      <div className='flex flex-col gap-2'>
        <div className='flex items-start gap-1'>
          {/* 위치 핀 아이콘 */}
          <div className='h-5 w-5 shrink-0'>
            <LocationPinIcon />
          </div>
          {/* 주소 텍스트 */}
          <p className='flex-1 text-sm leading-5 font-normal text-neutral-500'>{address}</p>
        </div>
        {/* 주소복사 버튼 */}
        <button
          onClick={handleCopyAddress}
          className='flex w-fit items-center justify-center rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-normal text-neutral-500'
        >
          {dict.contact?.copyButton || '주소복사'}
        </button>
      </div>
    </div>
  );
}
