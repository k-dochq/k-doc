'use client';

import { useEffect, useRef } from 'react';
import { type Dictionary } from 'shared/model/types';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';

declare global {
  interface Window {
    kakao: any;
  }
}

interface ContactMapSectionProps {
  dict: Dictionary;
}

export function ContactMapSection({ dict }: ContactMapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { copyAddress } = useAddressCopy(dict);

  // 하남 본사 정확한 좌표
  const latitude = 37.5609;
  const longitude = 127.1928;

  const handleCopyAddress = () => {
    copyAddress(dict.contact.address);
  };

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
    <div className='mt-6'>
      <div className='rounded-xl border border-white bg-white/50 p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
        {/* 지도 */}
        <div className='h-[220px] w-full overflow-hidden rounded-lg'>
          <div ref={mapRef} className='h-full w-full' style={{ width: '100%', height: '100%' }} />
        </div>

        {/* 주소 정보 섹션 - 병원상세페이지와 똑같은 스타일 */}
        <div className='mt-3'>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex min-w-0 flex-1 items-start gap-1'>
              {/* 위치 핀 아이콘 */}
              <div className='h-5 w-5 flex-shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9.61667 18.6258L9.675 18.6592L9.69833 18.6725C9.79086 18.7225 9.89439 18.7487 9.99958 18.7487C10.1048 18.7487 10.2083 18.7225 10.3008 18.6725L10.3242 18.66L10.3833 18.6258C10.4339 18.5964 10.5047 18.5539 10.5958 18.4983C10.7767 18.3875 11.0325 18.2233 11.3375 18.0075C12.1381 17.442 12.8861 16.8055 13.5725 16.1058C15.1925 14.4475 16.875 11.9558 16.875 8.75C16.875 6.92664 16.1507 5.17795 14.8614 3.88864C13.572 2.59933 11.8234 1.875 10 1.875C8.17664 1.875 6.42795 2.59933 5.13864 3.88864C3.84933 5.17795 3.125 6.92664 3.125 8.75C3.125 11.955 4.80833 14.4475 6.4275 16.1058C7.11393 16.8055 7.86195 17.442 8.6625 18.0075C8.97215 18.2263 9.29046 18.4326 9.61667 18.6258ZM10 11.25C10.663 11.25 11.2989 10.9866 11.7678 10.5178C12.2366 10.0489 12.5 9.41304 12.5 8.75C12.5 8.08696 12.2366 7.45107 11.7678 6.98223C11.2989 6.51339 10.663 6.25 10 6.25C9.33696 6.25 8.70107 6.51339 8.23223 6.98223C7.76339 7.45107 7.5 8.08696 7.5 8.75C7.5 9.41304 7.76339 10.0489 8.23223 10.5178C8.70107 10.9866 9.33696 11.25 10 11.25Z'
                    fill='#DA47EF'
                  />
                </svg>
              </div>
              {/* 주소 텍스트 */}
              <p className='line-clamp-2 text-sm leading-5 font-normal text-[#171717]'>
                {dict.contact.address}
              </p>
            </div>

            {/* 주소복사 버튼 */}
            <button
              onClick={handleCopyAddress}
              className='flex-shrink-0 rounded border border-neutral-500 px-1 py-0.5 text-xs font-normal text-neutral-500'
            >
              {dict.contact.copyButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
