import { prisma } from 'shared/lib/prisma';
import { type ReviewCardData } from '../../model/types';

export interface GetReviewDetailParams {
  reviewId: string;
}

export interface GetReviewDetailResponse {
  review: ReviewCardData;
}

export async function getReviewDetail({
  reviewId,
}: GetReviewDetailParams): Promise<GetReviewDetailResponse> {
  try {
    // 리뷰 상세 정보 조회 (이미지 포함)
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        User: {
          select: {
            displayName: true,
            nickName: true,
          },
        },
        MedicalSpecialty: {
          select: {
            name: true,
            specialtyType: true,
          },
        },
        Hospital: {
          select: {
            name: true,
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
          where: {
            isActive: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!review) {
      throw new Error('리뷰를 찾을 수 없습니다.');
    }

    // 데이터 변환
    const reviewCardData: ReviewCardData = {
      id: review.id,
      rating: review.rating,
      title: review.title as Record<string, string> | null,
      content: review.content as Record<string, string> | null,
      isRecommended: review.isRecommended,
      concerns: review.concerns,
      createdAt: review.createdAt,
      viewCount: review.viewCount,
      likeCount: review.likeCount,
      user: {
        displayName: review.User?.displayName || null,
        nickName: review.User?.nickName || null,
      },
      hospital: {
        name: review.Hospital.name as Record<string, string>,
      },
      medicalSpecialty: {
        name: review.MedicalSpecialty.name as Record<string, string>,
        specialtyType: review.MedicalSpecialty.specialtyType,
      },
      images: {
        before: review.ReviewImage.filter((img) => img.imageType === 'BEFORE').map((img) => ({
          id: img.id,
          imageType: img.imageType,
          imageUrl: img.imageUrl,
          alt: img.alt,
          order: img.order,
        })),
        after: review.ReviewImage.filter((img) => img.imageType === 'AFTER').map((img) => ({
          id: img.id,
          imageType: img.imageType,
          imageUrl: img.imageUrl,
          alt: img.alt,
          order: img.order,
        })),
      },
    };

    return {
      review: reviewCardData,
    };
  } catch (error) {
    console.error('Error fetching review detail:', error);
    throw new Error('리뷰 상세 정보를 불러오는 중 오류가 발생했습니다.');
  }
}
