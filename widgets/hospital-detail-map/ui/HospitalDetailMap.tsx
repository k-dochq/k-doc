'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalAddress } from '../model/useHospitalAddress';
import { useAddressCopy } from '../model/useAddressCopy';
import { HospitalMap } from './HospitalMap';
import { HospitalAddressSection } from './HospitalAddressSection';

interface HospitalDetailMapProps {
  lang: Locale;
  dict: Dictionary;
  latitude: number;
  longitude: number;
}

/**
 * 병원 상세 지도 컴포넌트
 * 지도와 주소 정보를 표시합니다.
 */
export function HospitalDetailMap({ lang, dict, latitude, longitude }: HospitalDetailMapProps) {
  const { address } = useHospitalAddress({ latitude, longitude });
  const { copyAddress } = useAddressCopy();

  const handleCopyAddress = () => {
    copyAddress(address);
  };

  return (
    <div className=''>
      <HospitalMap latitude={latitude} longitude={longitude} />
    </div>
  );
}
