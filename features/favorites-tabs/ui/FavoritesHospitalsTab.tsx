'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalListSkeleton } from 'widgets/hospital-list/ui/HospitalListSkeleton';
import { useInfiniteLikedHospitals } from '../model/useInfiniteLikedHospitals';
import { FavoritesHospitalsEmptyState } from './FavoritesHospitalsEmptyState';
import { FavoritesHospitalsErrorState } from './FavoritesHospitalsErrorState';
import { FavoritesHospitalsList } from './FavoritesHospitalsList';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useToggleHospitalLike } from 'entities/hospital/model/useToggleHospitalLike';

interface FavoritesHospitalsTabProps {
  lang: Locale;
  dict: Dictionary;
}

export function FavoritesHospitalsTab({ lang, dict }: FavoritesHospitalsTabProps) {
  const { user } = useAuth();

  // TanStack Query를 사용하여 좋아요한 병원 데이터 페칭
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteLikedHospitals({ limit: 10 });

  // 좋아요 토글 뮤테이션 (favorites 탭용 쿼리 파라미터)
  const queryParams = {
    limit: 10,
  };
  const toggleLikeMutation = useToggleHospitalLike({ queryParams, user });

  // 로딩 상태 (스켈레톤 UI)
  if (isLoading) {
    return <HospitalListSkeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <FavoritesHospitalsErrorState
        error={error instanceof Error ? error : undefined}
        dict={dict}
        onRetry={() => refetch()}
      />
    );
  }

  // 좋아요 토글 핸들러
  const handleToggleLike = (hospitalId: string) => {
    toggleLikeMutation.mutate(hospitalId);
  };

  // 현재 로딩 중인 병원 ID (TanStack Query의 variables 활용)
  const loadingHospitalId = toggleLikeMutation.isPending ? toggleLikeMutation.variables : null;

  // 데이터 플래튼
  const allLikedHospitals = data?.pages.flatMap((page) => page.hospitals) || [];

  // 빈 상태
  if (allLikedHospitals.length === 0) {
    return <FavoritesHospitalsEmptyState lang={lang} dict={dict} />;
  }

  // 병원 리스트 표시
  return (
    <FavoritesHospitalsList
      hospitals={allLikedHospitals}
      lang={lang}
      dict={dict}
      user={user}
      onToggleLike={handleToggleLike}
      loadingHospitalId={loadingHospitalId}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
