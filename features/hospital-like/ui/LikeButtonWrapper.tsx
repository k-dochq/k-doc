'use client';

import { useAuth } from 'shared/lib/auth';
import { openModal } from 'shared/lib/modal/modal-api';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { LikeButton } from 'shared/ui/like-button';
import { useHospitalLike } from '../model/useHospitalLike';
import { type Locale } from 'shared/config/locales';
import { type Dictionary } from 'shared/model/types';

interface LikeButtonWrapperProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function LikeButtonWrapper({ hospitalId, lang, dict }: LikeButtonWrapperProps) {
  const { isAuthenticated } = useAuth();
  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike } = useHospitalLike({
    hospitalId,
    enabled: !!hospitalId,
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
    return <LikeButton likeCount={0} isLiked={false} onLikeToggle={() => {}} />;
  }

  // 에러 상태 처리
  if (error) {
    return <LikeButton likeCount={0} isLiked={false} onLikeToggle={() => {}} />;
  }

  return (
    <LikeButton
      likeCount={likeCount}
      isLiked={isLiked}
      onLikeToggle={handleToggleLike}
      isLoading={isToggling}
      variant='detail'
    />
  );
}
