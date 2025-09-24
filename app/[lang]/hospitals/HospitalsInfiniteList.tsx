'use client';

import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { HospitalCard } from 'entities/hospital/ui/HospitalCard';
import { LocaleLink } from 'shared/ui/locale-link';
import { type HospitalCardData } from 'shared/model/types';
import { convertHospitalsToCardData } from 'entities/hospital';
import { useInfiniteHospitals } from 'entities/hospital/model/useInfiniteHospitals';
import { HospitalsSkeleton } from './HospitalsSkeleton';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useToggleHospitalLike } from 'entities/hospital/model/useToggleHospitalLike';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { EmptyHospitalsState } from 'shared/ui/empty-state';

interface HospitalsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: MedicalSpecialtyType;
    sort?: HospitalSortOption;
    search?: string;
    districtIds?: string[];
  };
}

export function HospitalsInfiniteList({ lang, dict, searchParams }: HospitalsInfiniteListProps) {
  const { category, sort, search, districtIds } = searchParams;
  const { user } = useAuth();

  // 타입 안전한 파라미터 구성
  const queryParams = {
    limit: 10,
    sortBy: sort || HOSPITAL_SORT_OPTIONS.POPULAR,
    sortOrder: 'desc' as const,
    category,
    search,
    districtIds, // 지역 필터 추가
  };

  // 좋아요 토글 뮤테이션
  const toggleLikeMutation = useToggleHospitalLike({ queryParams });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteHospitals(queryParams);

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
  if (isLoading) {
    return <HospitalsSkeleton />;
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
        <div className='space-y-6 p-5'>
          {convertedHospitals.map((hospital) => (
            <LocaleLink key={hospital.id} href={`/hospital/${hospital.id}`} className='block'>
              <HospitalCard
                hospital={hospital}
                dict={dict}
                lang={lang}
                user={user}
                onToggleLike={handleToggleLike}
                isLikeLoading={loadingHospitalId === hospital.id}
                showLikeButton={true}
              />
            </LocaleLink>
          ))}

          {/* 무한 스크롤 트리거 */}
          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadingText={dict.hospitals.infiniteScroll.loading}
            endText={dict.hospitals.infiniteScroll.end}
          />
        </div>
      ) : (
        <EmptyHospitalsState dict={dict} />
      )}
    </div>
  );
}
