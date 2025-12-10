'use client';

import { useAuth } from 'shared/lib/auth';
import { openModal } from 'shared/lib/modal/modal-api';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { LikeButtonV2 } from 'shared/ui/like-button';
import { useDoctorLike } from '../model/useDoctorLike';
import { type Locale } from 'shared/config/locales';
import { type Dictionary } from 'shared/model/types';

interface LikeButtonWrapperV2Props {
  doctorId: string;
  lang: Locale;
  dict: Dictionary;
}

export function LikeButtonWrapperV2({ doctorId, lang, dict }: LikeButtonWrapperV2Props) {
  const { isAuthenticated } = useAuth();
  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike } = useDoctorLike({
    doctorId,
    enabled: !!doctorId,
  });

  const handleToggleLike = () => {
    // 로그인 체크
    if (!isAuthenticated) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    // 좋아요 토글 실행
    toggleLike();
  };

  // 로딩 상태 처리
  if (isLoading) {
    return <LikeButtonV2 likeCount={0} isLiked={false} onLikeToggle={() => {}} />;
  }

  // 에러 상태 처리
  if (error) {
    return <LikeButtonV2 likeCount={0} isLiked={false} onLikeToggle={() => {}} />;
  }

  return (
    <LikeButtonV2
      likeCount={likeCount}
      isLiked={isLiked}
      onLikeToggle={handleToggleLike}
      isLoading={isToggling}
    />
  );
}
