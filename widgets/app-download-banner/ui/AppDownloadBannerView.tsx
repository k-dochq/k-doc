'use client';

import { CloseIcon } from 'shared/ui/close-icon';

const ONELINK_URL = 'https://k-doc.onelink.me/2xT5/s7hkblam';
const BRAND = 'K-DOC';

interface AppDownloadBannerViewProps {
  message: string;
  cta: string;
  closeLabel: string;
  onClose: () => void;
}

/**
 * 메시지 안의 "K-DOC"을 primary 컬러로 강조해 렌더링한다.
 * 모든 로케일이 메시지에 "K-DOC" 문자열을 포함하므로 split 기반 처리가 가능.
 */
function renderMessage(message: string) {
  const parts = message.split(BRAND);
  if (parts.length === 1) return message;
  const result: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i > 0) {
      result.push(
        <span key={`brand-${i}`} className='font-bold text-primary'>
          {BRAND}
        </span>,
      );
    }
    result.push(<span key={`part-${i}`}>{part}</span>);
  });
  return result;
}

export function AppDownloadBannerView({
  message,
  cta,
  closeLabel,
  onClose,
}: AppDownloadBannerViewProps) {
  return (
    <div className='flex w-full items-center gap-2 border-b border-neutral-100 bg-white px-3 py-2'>
      <button
        type='button'
        onClick={onClose}
        aria-label={closeLabel}
        className='flex h-8 w-8 shrink-0 items-center justify-center'
      >
        <CloseIcon className='h-5 w-5' />
      </button>
      <p className='flex-1 text-[13px] leading-snug text-neutral-900'>{renderMessage(message)}</p>
      <a
        href={ONELINK_URL}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-[13px] font-bold text-white'
      >
        {cta}
      </a>
    </div>
  );
}
