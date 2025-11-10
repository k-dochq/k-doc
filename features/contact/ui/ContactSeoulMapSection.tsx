'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { type Dictionary } from 'shared/model/types';
import {
  defaultMapOptions,
  getGoogleMapsUrl,
  GOOGLE_MAPS_API_KEY,
  googleMapsLibraries,
} from 'shared/lib';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';

interface ContactSeoulMapSectionProps {
  dict: Dictionary;
}

export function ContactSeoulMapSection({ dict }: ContactSeoulMapSectionProps) {
  const { copyAddress } = useAddressCopy(dict);

  // 서울지사 정확한 좌표
  const latitude = 37.526145;
  const longitude = 127.038836;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
  });

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const handleMarkerClick = () => {
    const googleMapsUrl = getGoogleMapsUrl(latitude, longitude, dict.contact.seoulOffice.address);
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyAddress = () => {
    copyAddress(dict.contact.seoulOffice.address);
  };

  return (
    <div className='mt-9'>
      {/* 서울지사 제목 */}
      <h2 className='text-2xl font-bold' style={{ color: '#AE33FB' }}>
        {dict.contact.seoulOffice.subtitle}
      </h2>

      {/* GlassCard - 병원상세페이지와 똑같은 스타일 */}
      <div className='mt-6 rounded-xl border border-white bg-white/50 p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
        {/* 지도 */}
        <div className='h-[220px] w-full overflow-hidden rounded-lg'>
          {!isLoaded ? (
            <div className='flex h-full w-full items-center justify-center bg-gray-100'>
              <p className='text-sm text-gray-500'>{dict.hospital.map.loading}</p>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={15}
              options={defaultMapOptions}
            >
              <Marker position={center} onClick={handleMarkerClick} />
            </GoogleMap>
          )}
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
              <p className='text-sm leading-5 font-normal text-[#171717]'>
                {dict.contact.seoulOffice.address}
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
