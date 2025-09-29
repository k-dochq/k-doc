'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface HospitalMapProps {
  latitude: number;
  longitude: number;
  hospitalName?: string;
}

/**
 * 병원 지도 컴포넌트
 */
export function HospitalMap({ latitude, longitude, hospitalName }: HospitalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

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

      // 마커 클릭 시 카카오맵 외부링크로 이동
      window.kakao.maps.event.addListener(marker, 'click', function () {
        const title = hospitalName ? encodeURIComponent(hospitalName) : '병원';
        const kakaoMapUrl = `https://map.kakao.com/link/map/${title},${latitude},${longitude}`;
        window.open(kakaoMapUrl, '_blank', 'noopener,noreferrer');
      });
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
  }, [latitude, longitude, hospitalName]);

  return (
    <div className='mt-4 h-[220px] w-full overflow-hidden rounded-lg'>
      <div ref={mapRef} className='h-full w-full' style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
