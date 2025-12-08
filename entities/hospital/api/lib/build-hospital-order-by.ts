import { type Prisma } from '@prisma/client';
import {
  type HospitalSortOption,
  type SortOrderOption,
  HOSPITAL_SORT_OPTIONS,
} from 'shared/model/types/hospital-query';

/**
 * 병원 정렬 옵션에 따라 Prisma orderBy 배열을 생성하는 함수
 *
 * 정렬 규칙:
 * - 추천순(RECOMMENDED): recommendedRanking ASC만 적용 (2순위 없음)
 * - 인기순(POPULAR): recommendedRanking ASC → HospitalLike._count DESC
 * - 신규 병원순(NEWEST): createdAt DESC만 적용 (recommendedRanking 제외)
 * - 기본값: recommendedRanking ASC → HospitalLike._count DESC
 */
export function buildHospitalOrderBy(
  sortBy: HospitalSortOption,
  sortOrder: SortOrderOption,
): Prisma.HospitalOrderByWithRelationInput[] {
  // 신규 병원순은 recommendedRanking을 제외하고 createdAt만 사용
  if (sortBy === HOSPITAL_SORT_OPTIONS.NEWEST) {
    return [
      {
        createdAt: sortOrder,
      },
    ];
  }

  // 그 외의 경우: recommendedRanking을 1순위로 적용
  const orderBy: Prisma.HospitalOrderByWithRelationInput[] = [
    {
      recommendedRanking: 'asc',
    },
  ];

  // 2순위 정렬 추가
  if (sortBy === HOSPITAL_SORT_OPTIONS.RECOMMENDED) {
    // 추천순: recommendedRanking만 사용, 2순위 정렬 없음
    // orderBy 배열에 추가하지 않음
  } else if (sortBy === HOSPITAL_SORT_OPTIONS.POPULAR) {
    // 인기순: likeCount (HospitalLike count) DESC
    orderBy.push({
      HospitalLike: {
        _count: sortOrder,
      },
    });
  } else {
    // 기본값: 인기순
    orderBy.push({
      HospitalLike: {
        _count: 'desc',
      },
    });
  }

  return orderBy;
}
