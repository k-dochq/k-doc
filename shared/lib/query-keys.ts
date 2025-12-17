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
    detailVideos: (id: string) => [...queryKeys.hospitals.details(), id, 'videos'] as const,
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

  // 의사 관련 쿼리
  doctors: {
    all: ['doctors'] as const,
    lists: () => [...queryKeys.doctors.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.doctors.lists(), filters] as const,
    details: () => [...queryKeys.doctors.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.doctors.details(), id] as const,
    hospital: (hospitalId: string) => [...queryKeys.doctors.all, 'hospital', hospitalId] as const,
    liked: {
      all: () => [...queryKeys.doctors.all, 'liked'] as const,
      list: (params: Record<string, unknown>) =>
        [...queryKeys.doctors.liked.all(), params] as const,
    },
  },

  // 의사 좋아요 관련 쿼리
  doctorLike: {
    all: ['doctor-like'] as const,
    status: (doctorId: string) => [...queryKeys.doctorLike.all, doctorId] as const,
  },

  // 리뷰 관련 쿼리
  reviews: {
    all: ['reviews'] as const,
    lists: () => [...queryKeys.reviews.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.reviews.lists(), filters] as const,
    byId: (id: string) => ['reviews', id] as const,
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

  // 사용자 관련 쿼리
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
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

  // 공지사항 관련 쿼리
  notices: {
    all: ['notices'] as const,
    lists: () => [...queryKeys.notices.all, 'list'] as const,
    infinite: (filters: Record<string, unknown>) =>
      [...queryKeys.notices.lists(), 'infinite', filters] as const,
  },

  // 카테고리 관련 쿼리
  categories: {
    all: ['categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
  },

  // 지역 관련 쿼리
  districts: {
    all: ['districts'] as const,
    lists: () => [...queryKeys.districts.all, 'list'] as const,
    parentDistricts: () => [...queryKeys.districts.lists(), 'parent'] as const,
    childDistricts: (parentId: string) =>
      [...queryKeys.districts.lists(), 'children', parentId] as const,
  },

  // 댓글 관련 쿼리
  comments: {
    all: ['comments'] as const,
    lists: () => [...queryKeys.comments.all, 'list'] as const,
    review: (reviewId: string) => [...queryKeys.comments.all, 'review', reviewId] as const,
    reviewInfinite: (reviewId: string, filters: Record<string, unknown>) =>
      [...queryKeys.comments.review(reviewId), 'infinite', filters] as const,
  },

  // 예약 관련 쿼리
  reservations: {
    all: ['reservations'] as const,
    lists: () => [...queryKeys.reservations.all, 'list'] as const,
    hospitals: () => [...queryKeys.reservations.all, 'hospitals'] as const,
    hospitalsInfinite: (params: Record<string, unknown>) =>
      [...queryKeys.reservations.hospitals(), 'infinite', params] as const,
    infinite: (params: Record<string, unknown>) =>
      [...queryKeys.reservations.lists(), 'infinite', params] as const,
  },
} as const;
