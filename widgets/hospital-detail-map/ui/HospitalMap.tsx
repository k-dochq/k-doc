'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { type Dictionary } from 'shared/model/types';
import {
  defaultMapOptions,
  getGoogleMapsUrl,
  GOOGLE_MAPS_API_KEY,
  googleMapsLibraries,
} from 'shared/lib';

interface HospitalMapProps {
  latitude: number;
  longitude: number;
  hospitalName?: string;
  dict: Dictionary;
}

/**
 * 병원 지도 컴포넌트
 */
export function HospitalMap({ latitude, longitude, hospitalName, dict }: HospitalMapProps) {
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
    const googleMapsUrl = getGoogleMapsUrl(latitude, longitude, hospitalName);
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isLoaded) {
    return (
      <div className='mt-4 h-[220px] w-full overflow-hidden rounded-lg'>
        <div className='flex h-full w-full items-center justify-center bg-gray-100'>
          <p className='text-sm text-gray-500'>{dict.hospital.map.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-4 h-[220px] w-full overflow-hidden rounded-lg'>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={15}
        options={defaultMapOptions}
      >
        <Marker position={center} onClick={handleMarkerClick} />
      </GoogleMap>
    </div>
  );
}
