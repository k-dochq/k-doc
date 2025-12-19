'use client';

import { type Dictionary } from 'shared/model/types';

interface ContactButtonSectionV2Props {
  dict: Dictionary;
}

export function ContactButtonSectionV2({ dict }: ContactButtonSectionV2Props) {
  return (
    <div className='mt-8 flex flex-col gap-2 px-5'>
      {/* 입점신청하기 버튼 */}
      <a
        href='https://docs.google.com/forms/d/1HxiHa4hVG4lbTTaO7lW78FiAiMmQnTLlGjzPVYb9iZ8/edit'
        target='_blank'
        rel='noopener noreferrer'
        className='bg-sub-900 hover:bg-sub-900/90 flex h-14 w-full items-center justify-center rounded-xl px-5 py-4 text-base leading-6 font-medium text-white transition-colors duration-200'
      >
        {dict.contact?.partnershipInquiry?.button || '입점 신청하기'}
      </a>

      {/* 이메일 문의 버튼 */}
      <a
        href='mailto:cs@k-doc.kr'
        className='flex h-14 w-full items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 px-5 py-4 text-base leading-6 font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-200'
      >
        {dict.contact?.emailInquiry?.button || '이메일 문의'}
      </a>
    </div>
  );
}
