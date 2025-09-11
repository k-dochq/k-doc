import type { ReviewLike, Prisma } from '@prisma/client';

// 리뷰 좋아요 도메인 엔티티 타입 정의
export interface ReviewLikeRequest {
  reviewId: string;
  userId: string;
}

export interface ReviewLikeStatusRequest {
  reviewId: string;
  userId: string;
}

export interface ReviewLikeResult {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
}

export interface ReviewLikeStatusResult {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
}

// Prisma 타입 활용
export type ReviewLikeCreateInput = Prisma.ReviewLikeCreateInput;
export type ReviewLikeWhereUniqueInput = Prisma.ReviewLikeWhereUniqueInput;
export type ReviewLikeWhereInput = Prisma.ReviewLikeWhereInput;

// 리뷰 좋아요 엔티티 타입
export type { ReviewLike };
