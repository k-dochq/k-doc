'use client';

import { LikeButton } from 'shared/ui/like-button';
import { useHospitalLike } from '../model/useHospitalLike';

interface LikeButtonWrapperProps {
  hospitalId: string;
}

export function LikeButtonWrapper({ hospitalId }: LikeButtonWrapperProps) {
  const { isLiked, likeCount, isLoading, isToggling, error, toggleLike } = useHospitalLike({
    hospitalId,
    enabled: !!hospitalId,
  });

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
      onLikeToggle={toggleLike}
      isLoading={isToggling}
      variant='detail'
    />
  );
}
