import { prisma } from 'shared/lib/prisma';
import {
  type GetHospitalReviewsParams,
  type GetHospitalReviewsResponse,
  type ReviewCardData,
} from '../../model/types';
import { parseLocalizedText, parsePriceInfo } from 'shared/model/types';

export async function getHospitalReviews({
  hospitalId,
  page = 1,
  limit = 10,
  offset,
  excludeReviewId,
}: GetHospitalReviewsParams): Promise<GetHospitalReviewsResponse> {
  try {
    // offset 계산 (page가 제공된 경우 우선 사용)
    const calculatedOffset = offset !== undefined ? offset : (page - 1) * limit;

    // 병원의 총 리뷰 수 조회
    const totalCount = await prisma.review.count({
      where: {
        hospitalId,
        ...(excludeReviewId && {
          id: {
            not: excludeReviewId,
          },
        }),
      },
    });

    // 리뷰 목록 조회 (이미지 포함)
    const reviews = await prisma.review.findMany({
      where: {
        hospitalId,
        ...(excludeReviewId && {
          id: {
            not: excludeReviewId,
          },
        }),
      },
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
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: calculatedOffset,
    });

    // 데이터 변환
    const reviewCardData: ReviewCardData[] = reviews.map((review) => {
      const likedUserIds = review.ReviewLike.map((like) => like.userId);

      return {
        id: review.id,
        rating: review.rating,
        title: review.title ? parseLocalizedText(review.title) : null,
        content: review.content ? parseLocalizedText(review.content) : null,
        isRecommended: review.isRecommended,
        concernsMultilingual: review.concernsMultilingual
          ? parseLocalizedText(review.concernsMultilingual)
          : null,
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
    console.error('Error fetching hospital reviews:', error);
    throw new Error('병원 리뷰를 불러오는 중 오류가 발생했습니다.');
  }
}
