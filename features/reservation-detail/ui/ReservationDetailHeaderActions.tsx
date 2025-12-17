'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useShare } from 'shared/lib/hooks/useShare';
import { ShareIconV2 } from 'shared/ui/icons';

interface ReservationDetailHeaderActionsProps {
  reservationId: string;
  lang: Locale;
  dict: Dictionary;
  hospitalName?: string;
}

export function ReservationDetailHeaderActions({
  reservationId,
  lang,
  dict,
  hospitalName,
}: ReservationDetailHeaderActionsProps) {
  const { share, isLoading } = useShare();

  const shareTitle = hospitalName ? `${hospitalName} - K-DOC` : 'K-DOC';
  const shareText = hospitalName
    ? `${hospitalName}의 예약 정보를 확인해보세요`
    : '예약 정보를 확인해보세요';

  // 예약 상세 페이지 URL 생성
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${baseUrl}/${lang}/reservation/${reservationId}`;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await share({ title: shareTitle, text: shareText, url: shareUrl });

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
      handleShare(e as any);
    }
  };

  return (
    <div className='flex items-center gap-3'>
      <div className='md:hidden'>
        <button
          onClick={handleShare}
          onKeyDown={handleKeyDown}
          className={`flex items-center justify-center p-0 ${isLoading ? 'opacity-50' : ''}`}
          aria-label='공유하기'
          disabled={isLoading}
          type='button'
        >
          <ShareIconV2 />
        </button>
      </div>
    </div>
  );
}
