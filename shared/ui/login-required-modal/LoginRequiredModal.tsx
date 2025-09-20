'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { getAuthPath } from 'shared/lib/auth/route-guard';
import { closeModal } from 'shared/lib/modal';
import { CloseIcon } from 'shared/ui/close-icon';

interface LoginRequiredModalProps {
  lang: Locale;
  dict: Dictionary;
  redirectPath?: string;
  title?: string;
  message?: string;
  confirmText?: string;
}

/**
 * 로그인이 필요한 경우 표시하는 모달 컴포넌트
 * 재사용 가능한 공통 컴포넌트
 */
export function LoginRequiredModal({
  lang,
  dict,
  redirectPath,
  title = '로그인 필요',
  message = '이 기능을 사용하려면 로그인이 필요합니다.',
  confirmText,
}: LoginRequiredModalProps) {
  const router = useLocalizedRouter();

  const handleLogin = () => {
    closeModal();

    // 리다이렉트 경로 설정
    const currentPath = redirectPath || window.location.pathname;
    const authPath = getAuthPath(lang);
    router.push(`${authPath}?redirect=${encodeURIComponent(currentPath)}`);
  };

  return (
    <div className='relative'>
      {/* X 버튼 */}
      <button className='absolute -top-8 right-0 z-10' onClick={closeModal}>
        <CloseIcon />
      </button>

      <div
        className='flex min-h-[361px] flex-col justify-end rounded-xl bg-cover bg-center bg-no-repeat px-4 py-6'
        style={{
          backgroundImage: 'url(/images/shared/login_required_bg.png)',
        }}
      >
        <div className='flex flex-col items-center space-y-4'>
          <button
            onClick={handleLogin}
            className='bg-primary hover:bg-primary/80 w-full rounded-xl px-8 py-4 text-center font-medium text-white transition-colors'
          >
            {dict.auth.login.loginButton}
          </button>
          <button
            onClick={closeModal}
            className='text-sm font-normal text-neutral-500 transition-colors hover:text-neutral-700'
          >
            {dict.auth.login.laterButton}
          </button>
        </div>
      </div>
    </div>
  );
}
