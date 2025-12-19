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
  const hanamLatitude = 37.5609;
  const hanamLongitude = 127.1928;

  // 서울지사 정확한 좌표
  const seoulLatitude = 37.526145;
  const seoulLongitude = 127.038836;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
  });

  const hanamCenter = {
    lat: hanamLatitude,
    lng: hanamLongitude,
  };

  const seoulCenter = {
    lat: seoulLatitude,
    lng: seoulLongitude,
  };

  const handleHanamMarkerClick = () => {
    const googleMapsUrl = getGoogleMapsUrl(hanamLatitude, hanamLongitude, dict.contact.address);
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSeoulMarkerClick = () => {
    const googleMapsUrl = getGoogleMapsUrl(
      seoulLatitude,
      seoulLongitude,
      dict.contact.seoulOffice.address,
    );
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyHanamAddress = () => {
    copyAddress(dict.contact.address);
  };

  const handleCopySeoulAddress = () => {
    copyAddress(dict.contact.seoulOffice.address);
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
            center={hanamCenter}
            zoom={15}
            options={defaultMapOptions}
          >
            <Marker position={hanamCenter} onClick={handleHanamMarkerClick} />
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
            onClick={handleCopyHanamAddress}
            className='flex w-fit items-center justify-center rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-normal text-neutral-500'
          >
            {dict.contact?.copyButton || '주소복사'}
          </button>
        </div>
      </div>

      {/* 서울지사 지도 영역 */}
      <div className='mt-8 aspect-[375/220] w-full'>
        {!isLoaded ? (
          <div className='flex h-full w-full items-center justify-center bg-gray-100'>
            <p className='text-sm text-gray-500'>{dict.hospital?.map?.loading}</p>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={seoulCenter}
            zoom={15}
            options={defaultMapOptions}
          >
            <Marker position={seoulCenter} onClick={handleSeoulMarkerClick} />
          </GoogleMap>
        )}
      </div>

      {/* 서울지사 정보 섹션 */}
      <div className='flex flex-col gap-2 px-5 py-5'>
        <h2 className='text-2xl font-semibold text-neutral-700'>
          {dict.contact?.seoulOffice?.subtitle || 'K-DOC 서울 지사'}
        </h2>
        <div className='flex flex-col gap-2'>
          <div className='flex items-start gap-1'>
            {/* 위치 핀 아이콘 */}
            <div className='h-5 w-5 shrink-0'>
              <LocationPinIcon />
            </div>
            {/* 주소 텍스트 */}
            <p className='flex-1 text-sm leading-5 font-normal text-neutral-500'>
              {dict.contact?.seoulOffice?.address || '서울 강남구 선릉로157길 14 한주빌딩 6층'}
            </p>
          </div>
          {/* 주소복사 버튼 */}
          <button
            onClick={handleCopySeoulAddress}
            className='flex w-fit items-center justify-center rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-normal text-neutral-500'
          >
            {dict.contact?.copyButton || '주소복사'}
          </button>
        </div>
      </div>

      {/* 그라데이션 텍스트 섹션 */}
      <div className='mt-8 px-5'>
        <p
          className='text-2xl leading-[32px] font-semibold'
          style={{
            background: 'linear-gradient(90deg, #3E57E2 0%, #B133FF 40%, #FF5DCA 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Get international patients
          <br />
          with the leading medical
          <br />
          tourism platform
        </p>
      </div>
    </div>
  );
}
