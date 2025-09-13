/**
 * 중앙 집중식 쿼리 키 관리
 * TanStack Query의 쿼리 키를 일관성 있게 관리합니다.
 */

export const queryKeys = {
  // 병원 관련 쿼리
  hospitals: {
    all: ['hospitals'] as const,
    lists: () => [...queryKeys.hospitals.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.hospitals.lists(), filters] as const,
    details: () => [...queryKeys.hospitals.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.hospitals.details(), id] as const,
    liked: {
      all: () => [...queryKeys.hospitals.all, 'liked'] as const,
      list: (params: Record<string, unknown>) =>
        [...queryKeys.hospitals.liked.all(), params] as const,
    },
    infinite: <T extends Record<string, unknown>>(filters: T) =>
      [...queryKeys.hospitals.lists(), 'infinite', filters] as const,
  },

  // 병원 좋아요 관련 쿼리
  hospitalLike: {
    all: ['hospital-like'] as const,
    status: (hospitalId: string) => [...queryKeys.hospitalLike.all, hospitalId] as const,
  },

  // 리뷰 관련 쿼리
  reviews: {
    all: ['reviews'] as const,
    lists: () => [...queryKeys.reviews.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.reviews.lists(), filters] as const,
    hospital: (hospitalId: string) => [...queryKeys.reviews.all, 'hospital', hospitalId] as const,
    hospitalInfinite: (hospitalId: string, filters: Record<string, unknown>) =>
      [...queryKeys.reviews.hospital(hospitalId), 'infinite', filters] as const,
    allInfinite: (filters: Record<string, unknown>) =>
      [...queryKeys.reviews.lists(), 'infinite', filters] as const,
    liked: {
      all: () => [...queryKeys.reviews.all, 'liked'] as const,
      list: (params: Record<string, unknown>) =>
        [...queryKeys.reviews.liked.all(), params] as const,
    },
  },

  // 리뷰 좋아요 관련 쿼리
  reviewLike: {
    all: ['review-like'] as const,
    status: (reviewId: string) => [...queryKeys.reviewLike.all, reviewId] as const,
  },

  // 상담 채팅 관련 쿼리
  consultationMessages: {
    all: ['consultation-messages'] as const,
    lists: () => [...queryKeys.consultationMessages.all, 'list'] as const,
    list: (hospitalId: string, userId: string) =>
      [...queryKeys.consultationMessages.lists(), hospitalId, userId] as const,
    hospital: (hospitalId: string) =>
      [...queryKeys.consultationMessages.all, 'hospital', hospitalId] as const,
    user: (userId: string) => [...queryKeys.consultationMessages.all, 'user', userId] as const,
  },

  // 상담중인 병원 관련 쿼리
  consultationHospitals: {
    all: () => ['consultation-hospitals'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.consultationHospitals.all(), 'list', params] as const,
  },

  // 카테고리 관련 쿼리
  categories: {
    all: ['categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
  },
} as const;
