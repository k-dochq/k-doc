'use client';

import { ShareIcon } from 'shared/ui/icons';
import { useShare } from 'shared/lib/hooks/useShare';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function ShareButton({
  title = 'K-DOC',
  text = '병원 정보를 확인해보세요',
  url = typeof window !== 'undefined' ? window.location.href : '',
  onClick,
  className = '',
  disabled = false,
}: ShareButtonProps) {
  const { share, isLoading } = useShare();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick();
      return;
    }

    const result = await share({ title, text, url });

    if (result.success) {
      switch (result.method) {
        case 'native':
          // 네이티브 공유 성공 - 별도 피드백 불필요
          break;
        case 'clipboard':
          // 클립보드 복사 성공
          console.log('URL이 클립보드에 복사되었습니다.');
          break;
        case 'fallback':
          // fallback 성공 - 사용자에게 수동 복사 안내 필요
          console.log('URL이 선택되었습니다. Ctrl+C로 복사하세요.');
          break;
      }
    } else {
      if (result.error === 'Share cancelled by user') {
        // 사용자 취소는 피드백 불필요
        return;
      }
      console.error('공유하기 실패:', result.error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter 또는 Space 키로 공유 실행
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`flex items-center justify-center p-2 ${isDisabled ? 'opacity-50' : ''} ${className}`}
      aria-label='공유하기'
      disabled={isDisabled}
      type='button'
    >
      <ShareIcon />
    </button>
  );
}
