import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { HospitalDetailMap } from 'widgets/hospital-detail-map';
import { LocationPinPinkIconV2 } from 'shared/ui/icons/LocationPinPinkIconV2';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';
import { getGoogleMapsUrl } from 'shared/lib/google-maps-utils';
import { type Prisma } from '@prisma/client';

interface HospitalLocationData {
  name: Prisma.JsonValue | Record<string, string>;
  address?: Prisma.JsonValue | Record<string, string> | null;
  directions?: Prisma.JsonValue | Record<string, string> | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface HospitalDetailLocationV2Props {
  hospital: HospitalLocationData;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailLocationV2({ hospital, lang, dict }: HospitalDetailLocationV2Props) {
  const { copyAddress } = useAddressCopy(dict);
  const hasCoordinates = hospital.latitude && hospital.longitude;
  const address =
    extractLocalizedText(hospital.directions, lang) ||
    extractLocalizedText(hospital.address, lang) ||
    '';

  const handleCopyAddress = () => {
    if (address) {
      copyAddress(address);
    }
  };

  const hospitalName = extractLocalizedText(hospital.name, lang) || '';
  const googleMapsUrl =
    hospital.latitude && hospital.longitude
      ? getGoogleMapsUrl(hospital.latitude, hospital.longitude, hospitalName)
      : '';

  if (!hasCoordinates) {
    return null;
  }

  return (
    <div className='space-y-3'>
      {/* 지도 영역 */}
      <HospitalDetailMap
        lang={lang}
        dict={dict}
        latitude={hospital.latitude as number}
        longitude={hospital.longitude as number}
        hospitalName={extractLocalizedText(hospital.name, lang)}
      />

      {/* 주소 영역 */}
      {address && (
        <div className='space-y-2'>
          <div className='flex items-start gap-2'>
            <LocationPinPinkIconV2 className='shrink-0' />
            <p className='min-w-0 text-sm leading-5 whitespace-pre-wrap text-neutral-500'>
              {address}
            </p>
          </div>
          <div className='flex items-start gap-1.5'>
            <button
              onClick={handleCopyAddress}
              className='rounded-full bg-neutral-100 px-3 py-1.5 text-xs leading-4 text-neutral-500'
            >
              {dict.hospital.address.copyButton}
            </button>
            {hospital.latitude && hospital.longitude && googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-full bg-neutral-100 px-3 py-1.5 text-xs leading-4 text-neutral-500'
              >
                {dict.hospital?.map?.title || '지도보기'}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
