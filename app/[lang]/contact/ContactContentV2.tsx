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

interface ContactContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ContactContentV2({ lang, dict }: ContactContentV2Props) {
  const title = dict.contact?.title || 'Contact us';

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
    </div>
  );
}
