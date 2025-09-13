import { prisma } from 'shared/lib/prisma';
import {
  type GetHospitalReviewsParams,
  type GetHospitalReviewsResponse,
  type ReviewCardData,
} from '../../model/types';

export async function getHospitalReviews({
  hospitalId,
  page = 1,
  limit = 10,
  offset,
}: GetHospitalReviewsParams): Promise<GetHospitalReviewsResponse> {
  try {
    // offset 계산 (page가 제공된 경우 우선 사용)
    const calculatedOffset = offset !== undefined ? offset : (page - 1) * limit;

    // 병원의 총 리뷰 수 조회
    const totalCount = await prisma.review.count({
      where: {
        hospitalId,
      },
    });

    // 리뷰 목록 조회 (이미지 포함)
    const reviews = await prisma.review.findMany({
      where: {
        hospitalId,
      },
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
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: calculatedOffset,
    });

    // 데이터 변환
    const reviewCardData: ReviewCardData[] = reviews.map((review) => ({
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
        district: {
          name: review.Hospital.District?.name as Record<string, string>,
        },
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
    console.error('Error fetching hospital reviews:', error);
    throw new Error('병원 리뷰를 불러오는 중 오류가 발생했습니다.');
  }
}
