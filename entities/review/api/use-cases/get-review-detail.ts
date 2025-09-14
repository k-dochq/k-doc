import { prisma } from 'shared/lib/prisma';
import { type ReviewCardData } from '../../model/types';
import { type LocalizedText } from 'shared/lib/localized-text';

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
            name: true,
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
            District: {
              select: {
                name: true,
              },
            },
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
        ReviewLike: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            ReviewLike: true,
          },
        },
      },
    });

    if (!review) {
      throw new Error('리뷰를 찾을 수 없습니다.');
    }

    // 데이터 변환
    const likedUserIds = review.ReviewLike.map((like) => like.userId);

    const reviewCardData: ReviewCardData = {
      id: review.id,
      rating: review.rating,
      title: review.title as LocalizedText | null,
      content: review.content as LocalizedText | null,
      isRecommended: review.isRecommended,
      concerns: review.concerns,
      createdAt: review.createdAt,
      viewCount: review.viewCount,
      likeCount: review._count.ReviewLike, // 실시간 좋아요 수 계산
      likedUserIds, // 좋아요를 한 사용자 ID들
      isLiked: false, // 기본값으로 false 설정 (클라이언트에서 처리)
      user: {
        displayName: review.User?.displayName || null,
        nickName: review.User?.nickName || null,
        name: review.User?.name || null,
      },
      hospital: {
        name: review.Hospital.name as LocalizedText,
        district: {
          name: review.Hospital.District?.name as LocalizedText,
        },
      },
      medicalSpecialty: {
        name: review.MedicalSpecialty.name as LocalizedText,
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
