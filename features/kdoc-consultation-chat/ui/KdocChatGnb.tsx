'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { BackArrowIcon, CloseIcon } from './icons/KdocChatIcons';
import { useOperatingStatus } from '../lib/use-operating-status';

interface KdocChatGnbProps {
  dict: Dictionary;
  lang: Locale;
  onBack: () => void;
  onClose: () => void;
}

/** 다음 운영 개시 요일 표기를 위한 로케일별 Intl 태그 */
const INTL_LOCALE: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  th: 'th-TH',
  'zh-Hant': 'zh-Hant',
  ja: 'ja-JP',
  hi: 'hi-IN',
  tl: 'fil-PH',
  ar: 'ar',
  ru: 'ru-RU',
};

export function KdocChatGnb({ dict, lang, onBack, onClose }: KdocChatGnbProps) {
  const t = dict.kdocChat.gnb;
  const status = useOperatingStatus();

  const isOpen = status?.isOpen ?? false;

  let statusText = '';
  if (status) {
    if (status.isOpen) {
      statusText = t.statusOpen;
    } else if (status.nextOpen) {
      const weekday = new Intl.DateTimeFormat(INTL_LOCALE[lang], {
        weekday: 'long',
        timeZone: 'Asia/Seoul',
      }).format(status.nextOpen);
      const schedule = `${weekday} 09:00 (KST)`;
      statusText = t.statusClosedFormat.replace('{schedule}', schedule);
    }
  }

  return (
    <header className='flex h-[58px] items-center justify-between bg-white px-5'>
      <div className='flex flex-1 items-center gap-1'>
        <button
          onClick={onBack}
          className='flex h-6 w-6 items-center justify-center'
          aria-label={t.backLabel}
        >
          <BackArrowIcon />
        </button>
        <div className='flex flex-1 items-center gap-[6px]'>
          <Image
            src='/images/kdoc-chat/kdoc-avatar.png'
            alt='K-DOC'
            width={40}
            height={40}
            className='h-10 w-10 shrink-0 rounded-full border border-[#e5e5e5]'
            priority
          />
          <div className='flex flex-col items-start justify-center'>
            <p className='text-base font-semibold leading-6 text-[#404040]'>{t.title}</p>
            {statusText && (
              <div className='flex items-center gap-1'>
                <span
                  className='h-1.5 w-1.5 shrink-0 rounded-full'
                  style={{ backgroundColor: isOpen ? '#34C759' : '#a3a3a3' }}
                />
                <p
                  className='text-xs font-medium leading-4'
                  style={{ color: isOpen ? '#34C759' : '#a3a3a3' }}
                >
                  {statusText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className='flex h-6 w-6 items-center justify-center'
        aria-label={t.closeLabel}
      >
        <CloseIcon />
      </button>
    </header>
  );
}
