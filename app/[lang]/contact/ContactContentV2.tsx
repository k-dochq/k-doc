'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import {
  defaultMapOptions,
  getGoogleMapsUrl,
  GOOGLE_MAPS_API_KEY,
  googleMapsLibraries,
} from 'shared/lib';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';
import { LocationPinIcon } from './LocationPinIcon';

interface ContactContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ContactContentV2({ lang, dict }: ContactContentV2Props) {
  const title = dict.contact?.title || 'Contact us';
  const { copyAddress } = useAddressCopy(dict);

  // 하남 본사 정확한 좌표
  const latitude = 37.5609;
  const longitude = 127.1928;

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
    const googleMapsUrl = getGoogleMapsUrl(latitude, longitude, dict.contact.address);
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyAddress = () => {
    copyAddress(dict.contact.address);
  };

  return (
    <div>
      {/* ContactUs 섹션 */}
      <div className='px-5 py-8'>
        <h1 className='text-3xl font-semibold text-neutral-700'>{title}</h1>
      </div>

      {/* 하남본사 지도 영역 */}
      <div className='aspect-[375/220] w-full'>
        {!isLoaded ? (
          <div className='flex h-full w-full items-center justify-center bg-gray-100'>
            <p className='text-sm text-gray-500'>{dict.hospital?.map?.loading}</p>
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

      {/* 하남본사 정보 섹션 */}
      <div className='flex flex-col gap-2 px-5 py-5'>
        <h2 className='text-2xl font-semibold text-neutral-700'>
          {dict.contact?.subtitle || 'K-DOC 하남 본사'}
        </h2>
        <div className='flex flex-col gap-2'>
          <div className='flex items-start gap-1'>
            {/* 위치 핀 아이콘 */}
            <div className='h-5 w-5 shrink-0'>
              <LocationPinIcon />
            </div>
            {/* 주소 텍스트 */}
            <p className='flex-1 text-sm leading-5 font-normal text-neutral-500'>
              {dict.contact?.address || '경기도 하남시 미사강변남로 103, 701-014호'}
            </p>
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
    </div>
  );
}
