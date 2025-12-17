'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReservationUserInfoProps {
  passportName: string | null;
  gender: string | null;
  nationality: string | null;
  phoneNumber: string | null;
  lang: Locale;
  dict: Dictionary;
}

export function ReservationUserInfo({
  passportName,
  gender,
  nationality,
  phoneNumber,
  lang,
  dict,
}: ReservationUserInfoProps) {
  // 성별 텍스트 변환
  const getGenderText = (): string | null => {
    if (!gender) return null;

    if (gender === 'MALE' || gender === 'male') {
      return dict.consultation?.reservationDetail?.userInfo?.male || '남성';
    }
    if (gender === 'FEMALE' || gender === 'female') {
      return dict.consultation?.reservationDetail?.userInfo?.female || '여성';
    }

    // raw_user_meta_data.gender가 문자열인 경우 그대로 반환
    return gender;
  };

  const genderText = getGenderText();

  return (
    <div className='flex flex-col gap-1'>
      {/* 여권 영문 이름 */}
      {passportName && (
        <div className='flex gap-2 text-base leading-[24px]'>
          <p className='font-medium text-[#404040]'>
            {dict.consultation?.reservationDetail?.userInfo?.passportName || '여권 영문 이름'}
          </p>
          <p className='font-normal text-[#737373]'>{passportName}</p>
        </div>
      )}

      {/* 성별 */}
      {genderText && (
        <div className='flex gap-2 text-base leading-[24px]'>
          <p className='font-medium text-[#404040]'>
            {dict.consultation?.reservationDetail?.userInfo?.gender || '성별'}
          </p>
          <p className='font-normal text-[#737373]'>{genderText}</p>
        </div>
      )}

      {/* 국적 */}
      {nationality && (
        <div className='flex gap-2 text-base leading-[24px]'>
          <p className='font-medium text-[#404040]'>
            {dict.consultation?.reservationDetail?.userInfo?.nationality || '국적'}
          </p>
          <p className='font-normal text-[#737373]'>{nationality}</p>
        </div>
      )}

      {/* 연락처 정보 */}
      {phoneNumber && (
        <div className='flex gap-2 text-base leading-[24px]'>
          <p className='font-medium text-[#404040]'>
            {dict.consultation?.reservationDetail?.userInfo?.contactInfo || '연락처 정보'}
          </p>
          <p className='font-normal text-[#737373]'>{phoneNumber}</p>
        </div>
      )}
    </div>
  );
}
