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

      <div className='relative flex flex-col justify-end overflow-hidden rounded-xl'>
        {/* 컨텐츠 오버레이 */}
        <div className='relative z-10'>{/* TODO: 모달 내용 추가 */}</div>
      </div>
    </div>
  );
}
