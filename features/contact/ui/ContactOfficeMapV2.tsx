'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { type Dictionary } from 'shared/model/types';
import {
  defaultMapOptions,
  getGoogleMapsUrl,
  GOOGLE_MAPS_API_KEY,
  googleMapsLibraries,
} from 'shared/lib';

interface ContactOfficeMapV2Props {
  latitude: number;
  longitude: number;
  address: string;
  dict: Dictionary;
}

export function ContactOfficeMapV2({
  latitude,
  longitude,
  address,
  dict,
}: ContactOfficeMapV2Props) {
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
    const googleMapsUrl = getGoogleMapsUrl(latitude, longitude, address);
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
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
  );
}
