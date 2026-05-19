import { type Prisma } from '@prisma/client';
import {
  type HospitalSortOption,
  type SortOrderOption,
  HOSPITAL_SORT_OPTIONS,
} from 'shared/model/types/hospital-query';

export function buildHospitalOrderBy(
  sortBy: HospitalSortOption,
  sortOrder: SortOrderOption,
): Prisma.HospitalOrderByWithRelationInput[] {
  if (sortBy === HOSPITAL_SORT_OPTIONS.NEWEST) {
    return [{ createdAt: sortOrder }, { id: 'asc' }];
  }

  if (sortBy === HOSPITAL_SORT_OPTIONS.RECOMMENDED) {
    return [{ Review: { _count: 'desc' } }, { id: 'asc' }];
  }

  // POPULAR: recommendedRanking → HospitalLike._count
  return [
    { recommendedRanking: 'asc' },
    { HospitalLike: { _count: sortOrder } },
    { id: 'asc' },
  ];
}
