'use client';

import { useEffect, useRef } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

declare global {
  interface Window {
    kakao: any;
  }
}

interface HospitalDetailMapProps {
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailMap({ lang, dict }: HospitalDetailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // 임의의 위도 경도 (강남역 근처)
  const latitude = 37.4979;
  const longitude = 127.0276;

  useEffect(() => {
    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('Kakao Maps API가 로드되지 않았습니다.');
        return;
      }

      if (!mapRef.current) return;

      // 지도 옵션
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3, // 확대 레벨
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(mapRef.current, options);

      // 마커 생성
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커를 지도에 표시
      marker.setMap(map);
    };

    // Kakao Maps API 스크립트 로드
    if (!window.kakao) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6aee4a708ad4757cc28cc5c546a20586&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(loadKakaoMap);
      };
      document.head.appendChild(script);
    } else {
      loadKakaoMap();
    }
  }, [latitude, longitude]);

  return (
    <div className=''>
      <h2 className='text-base font-bold text-white'>{dict.hospital.map.title}</h2>
      <div className='mt-4 h-[242px] w-full overflow-hidden rounded-lg'>
        <div ref={mapRef} className='h-full w-full' style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
