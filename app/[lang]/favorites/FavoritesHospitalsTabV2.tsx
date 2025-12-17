'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type User } from '@supabase/supabase-js';
import { HospitalCardV2 } from 'entities/hospital/ui/HospitalCardV2';
import { convertHospitalsToCardData } from 'entities/hospital';
import { useInfiniteLikedHospitals } from 'features/favorites-tabs/model/useInfiniteLikedHospitals';
import { useToggleHospitalLike } from 'entities/hospital/model/useToggleHospitalLike';
import { HospitalsSkeletonV2 } from 'app/[lang]/v2/hospitals/HospitalsSkeletonV2';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { EmptyFavoritesState } from 'shared/ui/empty-state';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';

interface FavoritesHospitalsTabV2Props {
  lang: Locale;
  dict: Dictionary;
  user: User | null;
}

export function FavoritesHospitalsTabV2({ lang, dict, user }: FavoritesHospitalsTabV2Props) {
  // 좋아요 토글 뮤테이션 (favorites 탭용 쿼리 파라미터)
  const queryParams = {
    limit: 10,
  };
  const toggleLikeMutation = useToggleHospitalLike({ queryParams });

  // TanStack Query를 사용하여 좋아요한 병원 데이터 페칭
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteLikedHospitals({ limit: 10 });

  // 좋아요 토글 핸들러
  const handleToggleLike = async (hospitalId: string) => {
    // 로그인 체크
    if (!user) {
      await openDrawer({
        content: <LoginRequiredDrawer lang={lang} dict={dict} />,
      });
      return;
    }

    toggleLikeMutation.mutate(hospitalId);
  };

  // 현재 로딩 중인 병원 ID (TanStack Query의 variables 활용)
  const loadingHospitalId = toggleLikeMutation.isPending ? toggleLikeMutation.variables : null;

  // 로딩 상태
  if (isLoading && !data) {
    return <HospitalsSkeletonV2 />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title={dict.favorites?.errorHospitals || '병원 데이터를 불러올 수 없습니다'}
        message={
          dict.favorites?.errorMessage || '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        }
        onRetry={() => refetch()}
        className='py-12'
      />
    );
  }

  // 데이터 플래튼 및 타입 변환
  const allLikedHospitals = data?.pages.flatMap((page) => page.hospitals) || [];
  const convertedHospitals = convertHospitalsToCardData(allLikedHospitals);

  return (
    <div>
      {/* 병원 리스트 */}
      {convertedHospitals.length > 0 ? (
        <div className='px-5 py-5'>
          {/* 2열 그리드 레이아웃 */}
          <div className='grid grid-cols-2 gap-x-[15px] gap-y-[16px]'>
            {convertedHospitals.map((hospital) => (
              <HospitalCardV2
                key={hospital.id}
                hospital={hospital}
                lang={lang}
                dict={dict}
                user={user}
                onToggleLike={handleToggleLike}
                isLikeLoading={loadingHospitalId === hospital.id}
                showLikeButton={true}
              />
            ))}
          </div>

          {/* 무한 스크롤 트리거 */}
          <div className='mt-6'>
            <InfiniteScrollTrigger
              onIntersect={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              loadingText={dict.hospitals.infiniteScroll.loading}
              endText={dict.hospitals.infiniteScroll.end}
            />
          </div>
        </div>
      ) : (
        <EmptyFavoritesState dict={dict} type='hospitals' />
      )}
    </div>
  );
}
