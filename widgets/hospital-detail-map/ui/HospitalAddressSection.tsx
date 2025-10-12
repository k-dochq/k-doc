import { MapPinIcon } from 'shared/ui/map-pin-icon';
import { AddressCopyButton } from './AddressCopyButton';

interface HospitalAddressSectionProps {
  address: string;
  onCopyAddress: () => void;
}

/**
 * 병원 주소 섹션 컴포넌트
 */
export function HospitalAddressSection({ address, onCopyAddress }: HospitalAddressSectionProps) {
  if (!address) return null;

  return (
    <div className='mt-4 flex items-center justify-between gap-2'>
      <div className='flex min-w-0 flex-1 items-center gap-1'>
        {/* 지도 핀 아이콘 */}
        <div className='h-5 w-5 flex-shrink-0'>
          <MapPinIcon size={20} />
        </div>
        {/* 주소 텍스트 */}
        <p className='text-sm leading-5'>{address}</p>
      </div>

      {/* 주소복사 버튼 */}
      <AddressCopyButton address={address} onCopy={onCopyAddress} />
    </div>
  );
}
