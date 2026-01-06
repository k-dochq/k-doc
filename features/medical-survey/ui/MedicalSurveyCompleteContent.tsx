'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { extractHospitalIdFromRoomId } from 'features/consultation-chat/lib/chat-utils';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

interface MedicalSurveyCompleteContentProps {
  lang: Locale;
  dict: Dictionary;
  consultationId: string;
}

export function MedicalSurveyCompleteContent({
  lang,
  dict,
  consultationId,
}: MedicalSurveyCompleteContentProps) {
  const hospitalId =
    consultationId.length >= 36
      ? consultationId.slice(0, 36)
      : extractHospitalIdFromRoomId(consultationId);
  const completePage = dict.consultation?.medicalSurvey?.completePage;

  const title = completePage?.title || '설문지 작성 완료';
  const message1 =
    completePage?.message1 ||
    '입력해 주신 정보를 바탕으로 병원 측에서 시술 가능 여부를 검토 중입니다.';
  const message2 =
    completePage?.message2 ||
    '검토가 완료되는 대로 채팅을 통해 상담을 안내드릴 예정이니 잠시만 기다려 주세요.';
  const notice = completePage?.notice;
  const backToChatButton = completePage?.backToChatButton || '채팅으로 돌아가기';

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <div className='flex-1 px-5 py-8'>
        <div className='flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            aria-hidden='true'
          >
            <path
              d='M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z'
              fill='#F15BFF'
            />
            <path
              d='M17 8.5L10.125 15.5L7 12.3182'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <h1 className='text-2xl font-semibold text-neutral-700'>{title}</h1>
        </div>

        <div className='mt-11'>
          <p className='text-xl font-semibold text-neutral-700'>{message1}</p>
        </div>

        <div className='mt-2'>
          <p className='text-base font-normal text-neutral-500'>{message2}</p>
        </div>

        {notice && (
          <div className='mt-11 rounded-xl bg-[#f5f5f5] p-4'>
            <p className='text-[13px] leading-[19px] font-semibold text-neutral-700'>
              {notice.title}
            </p>
            <div className='mt-1 space-y-1 text-[13px] leading-[19px] font-normal text-neutral-700'>
              {Array.isArray(notice.description) ? (
                notice.description.map((line, index) => <p key={index}>{line}</p>)
              ) : (
                <p>{notice.description}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className='pb-32' />

      <div
        className={`fixed right-0 bottom-0 left-0 z-30 mx-auto bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
      >
        <LocaleLink href={`/chat/${hospitalId}`} className='block'>
          <button
            type='button'
            className='bg-sub-900 hover:bg-sub-900/90 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200'
          >
            {backToChatButton}
          </button>
        </LocaleLink>
      </div>
    </div>
  );
}
