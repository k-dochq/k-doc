'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ShareButton } from 'shared/ui/share-button';

interface DoctorDetailHeaderActionsProps {
  doctorId: string;
  lang: Locale;
  dict: Dictionary;
  doctorName?: string;
}

export function DoctorDetailHeaderActions({
  doctorId,
  lang,
  dict,
  doctorName,
}: DoctorDetailHeaderActionsProps) {
  const shareTitle = doctorName ? `${doctorName} - K-DOC` : 'K-DOC';
  const shareText = doctorName
    ? `${doctorName}의 상세 정보를 확인해보세요`
    : '의사 정보를 확인해보세요';

  // 의사 상세 페이지 URL 생성
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${baseUrl}/${lang}/doctor/${doctorId}`;

  return (
    <div className='flex items-center gap-1'>
      <div className='md:hidden'>
        <ShareButton title={shareTitle} text={shareText} url={shareUrl} />
      </div>
    </div>
  );
}
