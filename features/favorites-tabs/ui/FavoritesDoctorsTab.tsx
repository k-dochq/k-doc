'use client';

import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { ErrorState } from 'shared/ui/error-state';
import { DoctorCard } from 'widgets/hospital-detail-doctors/ui/DoctorCard';
import { LocaleLink } from 'shared/ui/locale-link';
import { useInfiniteLikedDoctors } from '../model/useInfiniteLikedDoctors';
import { useToggleDoctorLike } from 'entities/doctor/model/useToggleDoctorLike';
import { EmptyFavoritesState } from 'shared/ui/empty-state';
import { DoctorListSkeleton } from './DoctorListSkeleton';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface FavoritesDoctorsTabProps {
  lang: Locale;
  dict: Dictionary;
}

export function FavoritesDoctorsTab({ lang, dict }: FavoritesDoctorsTabProps) {
  const { user } = useAuth();

  // TanStack Query를 사용하여 좋아요한 의사 데이터 페칭
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteLikedDoctors({ limit: 10 });

  // 좋아요 토글 뮤테이션 (favorites 탭용 쿼리 파라미터)
  const queryParams = {
    limit: 10,
  };
  const toggleLikeMutation = useToggleDoctorLike({ queryParams });

  // 로딩 상태 (스켈레톤 UI)
  if (isLoading) {
    return <DoctorListSkeleton />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title={dict.favorites?.error || '좋아요한 의사를 불러올 수 없습니다'}
        message={
          dict.favorites?.errorMessage || '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        }
        onRetry={() => refetch()}
        className='py-12'
      />
    );
  }

  // 좋아요 토글 핸들러
  const handleToggleLike = (doctorId: string) => {
    // 로그인 체크
    if (!user) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    toggleLikeMutation.mutate(doctorId);
  };

  // 현재 로딩 중인 의사 ID (TanStack Query의 variables 활용)
  const loadingDoctorId = toggleLikeMutation.isPending ? toggleLikeMutation.variables : null;

  // 데이터 플래튼
  const allLikedDoctors = data?.pages.flatMap((page) => page.doctors) || [];

  // 빈 상태
  if (allLikedDoctors.length === 0) {
    return <EmptyFavoritesState dict={dict} type='doctors' />;
  }

  // 의사 리스트 표시
  return (
    <div className='w-full space-y-4 p-5'>
      {/* 의사 리스트 */}
      {allLikedDoctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          lang={lang}
          dict={dict}
          variant='light'
          showMoreButton={true}
          showLikeButton={true}
          showBackground={true}
        />
      ))}

      {/* 무한 스크롤 트리거 */}
      <InfiniteScrollTrigger
        onIntersect={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadingText={dict.favorites?.loadingMore || '더 많은 의사를 불러오는 중...'}
        endText={dict.favorites?.allLoaded || '모든 의사를 불러왔습니다.'}
      />
    </div>
  );
}
