'use client';

import { type Dictionary } from 'shared/model/types';

interface PrivacyAgreementNoticeProps {
  dict: Dictionary;
}

export function PrivacyAgreementNotice({ dict }: PrivacyAgreementNoticeProps) {
  return (
    <div className='space-y-1 px-5 pb-[173px]'>
      <p className='text-[13px] font-semibold text-neutral-500'>
        {dict.consultation?.request?.form?.privacyAgreement?.title || '민감정보 수집 이용 동의'}
      </p>
      <p className='text-[13px] font-normal text-neutral-500'>
        {dict.consultation?.request?.form?.privacyAgreement?.description ||
          '시술후기 작성 및 앱내 활용을 위한 민감정보 수집, 이용 규정을 확인하였으며 이에 동의합니다.'}
      </p>
    </div>
  );
}
