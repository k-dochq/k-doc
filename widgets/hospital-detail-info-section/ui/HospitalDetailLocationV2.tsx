import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { HospitalDetailMap } from 'widgets/hospital-detail-map';
import { LocationPinPinkIconV2 } from 'shared/ui/icons/LocationPinPinkIconV2';
import { type GetHospitalDetailResponse } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';

interface HospitalDetailLocationV2Props {
  hospital: GetHospitalDetailResponse['hospital'];
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

  if (!hasCoordinates) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
        {dict.hospital.map.title}
      </h2>

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
          <button
            onClick={() => copyAddress(address)}
            className='w-fit rounded-full bg-neutral-100 px-3 py-1.5 text-xs leading-4 text-neutral-500'
          >
            {dict.hospital.address.copyButton}
          </button>
        </div>
      )}
    </div>
  );
}
