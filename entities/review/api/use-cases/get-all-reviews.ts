import { prisma } from 'shared/lib/prisma';
import {
  type GetAllReviewsParams,
  type GetAllReviewsResponse,
  type ReviewCardData,
} from '../../model/types';
import { type LocalizedText } from 'shared/lib/localized-text';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getUserDisplayName } from 'shared/lib';

export async function getAllReviews({
  page = 1,
  limit = 10,
  category,
  sort = 'popular',
  offset,
  hospitalId,
  likedOnly = false,
  userId,
  hasBothImages = false,
}: GetAllReviewsParams): Promise<GetAllReviewsResponse> {
  // offset이 제공되면 사용하고, 그렇지 않으면 page를 기반으로 계산
  const calculatedOffset = offset !== undefined ? offset : (page - 1) * limit;

  try {
    // 필터 조건 구성
    const whereCondition: Prisma.ReviewWhereInput = {};

    // hospitalId가 있으면 해당 병원의 리뷰만 필터링
    if (hospitalId) {
      whereCondition.hospitalId = hospitalId;
    }

    // category가 있으면 MedicalSpecialty의 some 조건으로 필터링
    if (category && category !== 'ALL') {
      whereCondition.MedicalSpecialty = {
        specialtyType: category as MedicalSpecialtyType,
        isActive: true,
      };
    }

    // likedOnly가 true이면 해당 사용자가 좋아요한 리뷰만 필터링
    if (likedOnly && userId) {
      whereCondition.ReviewLike = {
        some: {
          userId: userId,
        },
      };
    }

    // hasBothImages가 true이면 before/after 이미지가 모두 있는 리뷰만 필터링
    if (hasBothImages) {
      whereCondition.AND = [
        {
          ReviewImage: {
            some: {
              imageType: 'BEFORE',
            },
          },
        },
        {
          ReviewImage: {
            some: {
              imageType: 'AFTER',
            },
          },
        },
      ];
    }

    // 정렬 조건 구성
    const orderBy = (() => {
      switch (sort) {
        case 'popular':
          return [
            { viewCount: 'desc' as const },
            { likeCount: 'desc' as const },
            { createdAt: 'desc' as const },
          ];
        case 'recommended':
          return [
            { likeCount: 'desc' as const },
            { viewCount: 'desc' as const },
            { createdAt: 'desc' as const },
          ];
        default:
          return [
            { viewCount: 'desc' as const },
            { likeCount: 'desc' as const },
            { createdAt: 'desc' as const },
          ];
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
            id: true,
            name: true,
            address: true,
            prices: true,
            rating: true,
            discountRate: true,
            displayLocationName: true,
            District: {
              select: {
                name: true,
                displayName: true,
              },
            },
            HospitalImage: {
              where: {
                imageType: 'THUMBNAIL',
              },
              orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
              take: 1,
              select: {
                imageUrl: true,
              },
            },
            _count: {
              select: {
                Review: true,
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
        _count: {
          select: {
            ReviewLike: true,
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
        title: review.title ? parseLocalizedText(review.title) : null,
        content: review.content ? parseLocalizedText(review.content) : null,
        concernsMultilingual: review.concernsMultilingual
          ? parseLocalizedText(review.concernsMultilingual)
          : null,
        createdAt: review.createdAt,
        viewCount: review.viewCount,
        likeCount: review._count.ReviewLike, // 실시간 좋아요 수 계산
        commentCount: review.commentCount, // 댓글 수 (DB 필드 직접 사용)
        likedUserIds, // 좋아요를 한 사용자 ID들
        isLiked: false, // 기본값으로 false 설정 (클라이언트에서 처리)
        isRecommended: review.isRecommended,
        user: {
          displayName: getUserDisplayName(review.User),
          nickName: review.User.nickName,
          name: review.User.name,
        },
        hospital: {
          id: review.Hospital.id,
          name: parseLocalizedText(review.Hospital.name),
          address: parseLocalizedText(review.Hospital.address),
          prices: parsePriceInfo(review.Hospital.prices),
          rating: review.Hospital.rating,
          reviewCount: review.Hospital._count.Review,
          thumbnailImageUrl: review.Hospital.HospitalImage[0]?.imageUrl || null,
          discountRate: review.Hospital.discountRate,
          district: {
            name: review.Hospital.District?.name
              ? parseLocalizedText(review.Hospital.District.name)
              : { ko_KR: '', en_US: '', th_TH: '' },
            displayName: review.Hospital.District?.displayName
              ? parseLocalizedText(review.Hospital.District.displayName)
              : null,
          },
          displayLocationName: review.Hospital.displayLocationName
            ? parseLocalizedText(review.Hospital.displayLocationName)
            : null,
        },
        medicalSpecialty: {
          name: parseLocalizedText(review.MedicalSpecialty.name),
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
