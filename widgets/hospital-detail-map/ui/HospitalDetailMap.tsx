'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalMap } from './HospitalMap';

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
export function HospitalDetailMap({ latitude, longitude }: HospitalDetailMapProps) {
  return <HospitalMap latitude={latitude} longitude={longitude} />;
}
