import { prisma } from 'shared/lib/prisma';
import {
  type GetAllReviewsParams,
  type GetAllReviewsResponse,
  type ReviewCardData,
} from '../../model/types';
import { type LocalizedText } from 'shared/lib/localized-text';

export async function getAllReviews({
  page = 1,
  limit = 10,
  medicalSpecialtyId,
  sortBy = 'latest',
  offset,
}: GetAllReviewsParams): Promise<GetAllReviewsResponse> {
  // offset이 제공되면 사용하고, 그렇지 않으면 page를 기반으로 계산
  const calculatedOffset = offset !== undefined ? offset : (page - 1) * limit;

  try {
    // 필터 조건 구성
    const whereCondition = {
      ...(medicalSpecialtyId && { medicalSpecialtyId }),
    };

    // 정렬 조건 구성
    const orderBy = (() => {
      switch (sortBy) {
        case 'popular':
          return [
            { likeCount: 'desc' as const },
            { viewCount: 'desc' as const },
            { createdAt: 'desc' as const },
          ];
        case 'latest':
        default:
          return [{ createdAt: 'desc' as const }];
      }
    })();

    // 전체 리뷰 수 조회
    const totalCount = await prisma.review.count({
      where: whereCondition,
    });

    // 리뷰 목록 조회 (이미지 포함)
    const reviews = await prisma.review.findMany({
      where: whereCondition,
      include: {
        User: {
          select: {
            displayName: true,
            nickName: true,
          },
        },
        Hospital: {
          select: {
            name: true,
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
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy,
      take: limit,
      skip: calculatedOffset,
    });

    // ReviewCardData 형태로 변환
    const reviewCardData: ReviewCardData[] = reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      title: review.title as LocalizedText | null,
      content: review.content as LocalizedText | null,
      concerns: review.concerns,
      createdAt: review.createdAt,
      viewCount: review.viewCount,
      likeCount: review.likeCount,
      isRecommended: review.isRecommended,
      user: {
        displayName: review.User.displayName,
        nickName: review.User.nickName,
      },
      hospital: {
        name: review.Hospital.name as LocalizedText,
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
    }));

    const hasNextPage = calculatedOffset + limit < totalCount;
    const hasMore = hasNextPage; // 기존 호환성을 위해 유지

    return {
      reviews: reviewCardData,
      totalCount,
      currentPage: page,
      hasNextPage,
      hasMore,
    };
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw new Error('전체 리뷰 목록을 불러오는 중 오류가 발생했습니다.');
  }
}
