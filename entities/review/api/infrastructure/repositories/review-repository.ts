import { prisma } from 'shared/lib/prisma';
import { type Prisma } from '@prisma/client';
import {
  type ReviewCreateData,
  type ReviewImageCreateData,
  type ReviewUpdateData,
} from '../../entities/types';

export class ReviewRepository {
  /**
   * 리뷰 생성 (트랜잭션)
   * 1. Review 생성
   * 2. ReviewImage 다중 생성
   * 3. Hospital의 reviewCount 증가
   */
  async createReview(
    reviewData: ReviewCreateData,
    images: Omit<ReviewImageCreateData, 'reviewId'>[],
  ): Promise<{ reviewId: string }> {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Review 생성
      const reviewId = crypto.randomUUID();
      const now = new Date();
      const review = await tx.review.create({
        data: {
          id: reviewId,
          rating: reviewData.rating,
          title: reviewData.title as Prisma.InputJsonObject,
          content: reviewData.content as Prisma.InputJsonObject,
          concernsMultilingual: reviewData.concernsMultilingual as Prisma.InputJsonObject,
          User: {
            connect: { id: reviewData.userId },
          },
          Hospital: {
            connect: { id: reviewData.hospitalId },
          },
          MedicalSpecialty: {
            connect: { id: reviewData.medicalSpecialtyId },
          },
          isRecommended: reviewData.isRecommended,
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          updatedAt: now,
        } as Prisma.ReviewCreateInput,
      });

      // 2. ReviewImage 다중 생성
      if (images.length > 0) {
        for (const img of images) {
          await tx.reviewImage.create({
            data: {
              id: crypto.randomUUID(),
              Review: {
                connect: { id: review.id },
              },
              imageType: img.imageType,
              imageUrl: img.imageUrl,
              order: img.order ?? undefined,
              alt: img.alt ?? undefined,
              isActive: img.isActive,
              updatedAt: now,
            } as Prisma.ReviewImageCreateInput,
          });
        }
      }

      // 3. Hospital의 reviewCount 증가
      await tx.hospital.update({
        where: { id: reviewData.hospitalId },
        data: {
          reviewCount: {
            increment: 1,
          },
        },
      });

      return { reviewId: review.id };
    });

    return result;
  }

  /**
   * 리뷰 수정 (트랜잭션)
   * 1. 기존 ReviewImage 삭제 (isActive = false)
   * 2. Review 업데이트
   * 3. 새로운 ReviewImage 생성
   */
  async updateReview(
    reviewId: string,
    reviewData: ReviewUpdateData,
    images: Omit<ReviewImageCreateData, 'reviewId'>[],
  ): Promise<{ reviewId: string }> {
    const result = await prisma.$transaction(async (tx) => {
      // 1. 기존 ReviewImage를 isActive = false로 업데이트 (소프트 삭제)
      await tx.reviewImage.updateMany({
        where: {
          reviewId,
          isActive: true,
        },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      });

      // 2. Review 업데이트
      await tx.review.update({
        where: { id: reviewId },
        data: {
          rating: reviewData.rating,
          title: reviewData.title as Prisma.InputJsonObject,
          content: reviewData.content as Prisma.InputJsonObject,
          concernsMultilingual: reviewData.concernsMultilingual as Prisma.InputJsonObject,
          MedicalSpecialty: {
            connect: { id: reviewData.medicalSpecialtyId },
          },
          isRecommended: reviewData.isRecommended,
          updatedAt: new Date(),
        } as Prisma.ReviewUpdateInput,
      });

      // 3. 새로운 ReviewImage 생성
      if (images.length > 0) {
        const now = new Date();
        for (const img of images) {
          await tx.reviewImage.create({
            data: {
              id: crypto.randomUUID(),
              Review: {
                connect: { id: reviewId },
              },
              imageType: img.imageType,
              imageUrl: img.imageUrl,
              order: img.order ?? undefined,
              alt: img.alt ?? undefined,
              isActive: img.isActive,
              updatedAt: now,
            } as Prisma.ReviewImageCreateInput,
          });
        }
      }

      return { reviewId };
    });

    return result;
  }

  /**
   * 리뷰 ID로 리뷰 조회 (hospitalId 포함)
   */
  async getReviewById(reviewId: string): Promise<{ hospitalId: string } | null> {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { hospitalId: true },
    });

    return review;
  }

  /**
   * 리뷰 삭제 (트랜잭션)
   * 1. 리뷰 조회 (hospitalId 포함)
   * 2. 리뷰 이미지 삭제
   * 3. 리뷰 삭제
   * 4. 병원의 reviewCount 감소
   * 5. 병원의 rating 재계산
   */
  async deleteReview(reviewId: string): Promise<{ reviewId: string; hospitalId: string }> {
    const result = await prisma.$transaction(async (tx) => {
      // 1. 리뷰 조회 (hospitalId 포함)
      const review = await tx.review.findUnique({
        where: { id: reviewId },
        select: { id: true, hospitalId: true },
      });

      if (!review) {
        throw new Error('Review not found');
      }

      // 2. 리뷰 이미지 삭제
      await tx.reviewImage.deleteMany({
        where: { reviewId },
      });

      // 3. 리뷰 삭제
      await tx.review.delete({
        where: { id: reviewId },
      });

      // 4. 병원의 reviewCount 감소
      await tx.hospital.update({
        where: { id: review.hospitalId },
        data: {
          reviewCount: {
            decrement: 1,
          },
        },
      });

      return { reviewId: review.id, hospitalId: review.hospitalId };
    });

    // 5. 병원의 rating 재계산 (트랜잭션 외부에서 실행)
    await this.updateHospitalRating(result.hospitalId);

    return result;
  }

  /**
   * 특정 병원의 평균 평점 계산 및 업데이트
   */
  async updateHospitalRating(hospitalId: string): Promise<void> {
    const reviews = await prisma.review.findMany({
      where: {
        hospitalId,
        // isActive가 false인 리뷰는 제외 (null과 true는 포함)
        isActive: { not: false },
      },
      select: { rating: true },
    });

    if (reviews.length === 0) {
      return;
    }

    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await prisma.hospital.update({
      where: { id: hospitalId },
      data: {
        rating: avgRating,
      },
    });
  }
}
