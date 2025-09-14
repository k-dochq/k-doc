import { prisma } from 'shared/lib/prisma';
import {
  type GetAllReviewsParams,
  type GetAllReviewsResponse,
  type ReviewCardData,
} from '../../model/types';
import { type LocalizedText } from 'shared/lib/localized-text';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';

export async function getAllReviews({
  page = 1,
  limit = 10,
  category,
  sortBy = 'latest',
  offset,
}: GetAllReviewsParams): Promise<GetAllReviewsResponse> {
  // offset이 제공되면 사용하고, 그렇지 않으면 page를 기반으로 계산
  const calculatedOffset = offset !== undefined ? offset : (page - 1) * limit;

  try {
    // 필터 조건 구성
    const whereCondition: Prisma.ReviewWhereInput = {};

    // category가 있으면 MedicalSpecialty의 some 조건으로 필터링
    if (category && category !== 'ALL') {
      whereCondition.MedicalSpecialty = {
        specialtyType: category as MedicalSpecialtyType,
        isActive: true,
      };
    }

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
            name: true,
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
        ReviewLike: {
          select: {
            userId: true,
          },
        },
      },
      orderBy,
      take: limit,
      skip: calculatedOffset,
    });

    // ReviewCardData 형태로 변환
    const reviewCardData: ReviewCardData[] = reviews.map((review) => {
      const likedUserIds = review.ReviewLike.map((like) => like.userId);

      return {
        id: review.id,
        rating: review.rating,
        title: review.title as LocalizedText | null,
        content: review.content as LocalizedText | null,
        concerns: review.concerns,
        createdAt: review.createdAt,
        viewCount: review.viewCount,
        likeCount: review.likeCount,
        likedUserIds, // 좋아요를 한 사용자 ID들
        isLiked: false, // 기본값으로 false 설정 (클라이언트에서 처리)
        isRecommended: review.isRecommended,
        user: {
          displayName: review.User.displayName,
          nickName: review.User.nickName,
          name: review.User.name,
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
    });

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
