import type { Prisma } from '@prisma/client';

/**
 * 전체 리뷰/병원 리뷰 목록 조회용 Prisma include 설정
 * get-all-reviews, get-hospital-reviews에서 공통 사용
 */
export const REVIEW_LIST_INCLUDE = {
  User: {
    select: {
      displayName: true,
      nickName: true,
      name: true,
    },
  },
  Hospital: {
    select: {
      id: true,
      name: true,
      address: true,
      prices: true,
      rating: true,
      discountRate: true,
      ranking: true,
      displayLocationName: true,
      badge: true,
      approvalStatusType: true,
      District: {
        select: {
          name: true,
          displayName: true,
        },
      },
      HospitalImage: {
        where: { imageType: 'THUMBNAIL' },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
        take: 1,
        select: { imageUrl: true },
      },
      _count: { select: { Review: true } },
    },
  },
  MedicalSpecialty: {
    select: {
      name: true,
      specialtyType: true,
    },
  },
  ReviewImage: {
    select: {
      id: true,
      imageType: true,
      imageUrl: true,
      alt: true,
      order: true,
    },
    where: { isActive: true },
    orderBy: { order: 'asc' },
  },
  ReviewLike: {
    select: { userId: true },
  },
  _count: {
    select: { ReviewLike: true },
  },
} satisfies Prisma.ReviewInclude;
