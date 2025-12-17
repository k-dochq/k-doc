'use client';

import { useAuth } from 'shared/lib/auth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
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

  const handleToggleLike = async () => {
    // 로그인 체크
    if (!isAuthenticated) {
      await openDrawer({
        content: <LoginRequiredDrawer lang={lang} dict={dict} />,
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
    />
  );
}
