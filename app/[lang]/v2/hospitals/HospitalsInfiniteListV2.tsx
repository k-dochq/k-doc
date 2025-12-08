'use client';

import { type Locale } from 'shared/config';
import {
  type Dictionary,
  type HospitalSortOption,
  type HospitalCategoryType,
  HOSPITAL_SORT_OPTIONS,
} from 'shared/model/types';
import { HospitalCardV2 } from 'entities/hospital/ui/HospitalCardV2';
import { convertHospitalsToCardData } from 'entities/hospital';
import { useInfiniteHospitalsV2 } from 'entities/hospital/model/useInfiniteHospitalsV2';
import { useToggleHospitalLike } from 'entities/hospital/model/useToggleHospitalLike';
import { HospitalsSkeletonV2 } from './HospitalsSkeletonV2';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { EmptyHospitalsState } from 'shared/ui/empty-state';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';

interface HospitalsInfiniteListV2Props {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: HospitalCategoryType;
    sort?: HospitalSortOption;
    search?: string;
    districtIds?: string[];
  };
}

export function HospitalsInfiniteListV2({
  lang,
  dict,
  searchParams,
}: HospitalsInfiniteListV2Props) {
  const { category, sort, search, districtIds } = searchParams;
  const { user } = useAuth();

  // 타입 안전한 파라미터 구성
  const queryParams = {
    limit: 10,
    sortBy: sort || HOSPITAL_SORT_OPTIONS.POPULAR,
    sortOrder: 'desc' as const,
    category,
    search,
    districtIds,
  };

  // 좋아요 토글 뮤테이션
  const toggleLikeMutation = useToggleHospitalLike({ queryParams });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteHospitalsV2(queryParams);

  // 좋아요 토글 핸들러
  const handleToggleLike = (hospitalId: string) => {
    // 로그인 체크
    if (!user) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    toggleLikeMutation.mutate(hospitalId);
  };

  // 현재 로딩 중인 병원 ID (TanStack Query의 variables 활용)
  const loadingHospitalId = toggleLikeMutation.isPending ? toggleLikeMutation.variables : null;

  // 로딩 상태
  // placeholderData로 인해 isLoading이어도 이전 데이터가 표시될 수 있음
  // 초기 로딩 시에만 스켈레톤 표시 (데이터가 없을 때만)
  if (isLoading && !data) {
    return <HospitalsSkeletonV2 />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title='병원 데이터를 불러올 수 없습니다'
        message='네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        onRetry={() => window.location.reload()}
        className='py-12'
      />
    );
  }

  // 데이터 플래튼 및 타입 변환
  const allHospitals = data?.pages.flatMap((page) => page.hospitals) || [];
  const convertedHospitals = convertHospitalsToCardData(allHospitals);

  return (
    <div>
      {/* 병원 리스트 */}
      {convertedHospitals.length > 0 ? (
        <div className='px-5 py-[11px]'>
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
        <EmptyHospitalsState dict={dict} />
      )}
    </div>
  );
}
