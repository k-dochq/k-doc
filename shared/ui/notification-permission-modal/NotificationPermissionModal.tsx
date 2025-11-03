'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { closeModal } from 'shared/lib/modal';
import { CloseIcon } from 'shared/ui/close-icon';

interface NotificationPermissionModalProps {
  lang: Locale;
  dict: Dictionary;
}

/**
 * 알림 권한이 필요할 때 표시하는 모달 컴포넌트
 */
export function NotificationPermissionModal({ lang, dict }: NotificationPermissionModalProps) {
  return (
    <div className='relative'>
      {/* X 버튼 */}
      <button className='absolute -top-8 right-0 z-10' onClick={closeModal}>
        <CloseIcon />
      </button>

      <div className='relative flex flex-col justify-end overflow-hidden rounded-xl bg-white'>
        {/* 컨텐츠 */}
        <div className='relative z-10 flex flex-col items-center gap-6 px-5 py-8'>
          {/* 텍스트 영역 */}
          <div className='flex w-full flex-col items-center gap-2 text-center'>
            <h2 className='w-full text-xl leading-[28px] font-bold text-neutral-900'>
              {dict.consultation.notificationPermission.title}
            </h2>
            <p className='w-full text-base leading-6 font-normal whitespace-pre-line text-neutral-500'>
              {dict.consultation.notificationPermission.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
