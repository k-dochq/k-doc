import { prisma } from 'shared/lib/prisma';
import { type Prisma } from '@prisma/client';
import { type ReviewCreateData, type ReviewImageCreateData } from '../../entities/types';

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
   * 특정 병원의 평균 평점 계산 및 업데이트
   */
  async updateHospitalRating(hospitalId: string): Promise<void> {
    const reviews = await prisma.review.findMany({
      where: { hospitalId },
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
