import { prisma } from 'shared/lib/prisma';
import { type ReviewCardData } from '../../model/types';
import { type LocalizedText } from 'shared/lib/localized-text';
import { parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getReviewNickname } from 'shared/lib/review-nickname';
import { getHospitalThumbnailImageUrl } from 'entities/hospital/lib/image-utils';

export interface GetReviewDetailParams {
  reviewId: string;
  /** true면 조회수 증가 생략 (generateMetadata 등에서 사용) */
  skipViewCountIncrement?: boolean;
}

export interface GetReviewDetailResponse {
  review: ReviewCardData;
}

/**
 * 모든 리뷰 ID를 조회하는 함수 (정적 생성용)
 */
export async function getAllReviewIds(): Promise<string[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        // isActive가 false인 리뷰는 제외 (null과 true는 포함)
        isActive: { not: false },
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      // 최대 1000개로 제한 (빌드 시간 고려)
      take: 1000,
    });

    return reviews.map((review) => review.id);
  } catch (error) {
    console.error('Error fetching all review IDs:', error);
    return [];
  }
}

export async function getReviewDetail({
  reviewId,
  skipViewCountIncrement = false,
}: GetReviewDetailParams): Promise<GetReviewDetailResponse> {
  try {
    // 리뷰 상세 정보 조회 (이미지 포함)
    // findFirst를 사용하여 isActive 조건 포함
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        // isActive가 false인 리뷰는 제외 (null과 true는 포함)
        isActive: { not: false },
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
            id: true,
            name: true,
            address: true,
            prices: true,
            rating: true,
            discountRate: true,
            ranking: true,
            displayLocationName: true,
            badge: true,
            approvalStatusType: true,
            isActive: true,
            District: {
              select: {
                name: true,
                displayName: true,
              },
            },
            HospitalImage: {
              where: {
                isActive: true,
              },
              orderBy: [
                { imageType: 'asc' }, // MAIN이 먼저 오도록
                { order: 'asc' },
              ],
              select: {
                imageType: true,
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
        ReviewRecommend: {
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

    // 상세 페이지 진입 시 조회수 1 증가 (메타데이터용 호출에서는 생략)
    let didIncrementViewCount = false;
    if (!skipViewCountIncrement) {
      try {
        await prisma.review.update({
          where: { id: reviewId },
          data: { viewCount: { increment: 1 } },
        });
        didIncrementViewCount = true;
      } catch (err) {
        console.error('Error incrementing review viewCount:', err);
      }
    }

    // 리뷰 작성일자 기준으로 닉네임 결정
    const { displayName, nickName } = await getReviewNickname(
      review.id,
      review.createdAt,
      review.User?.nickName || null,
      review.User?.displayName || null,
      review.User?.name || null,
    );

    // 데이터 변환
    const likedUserIds = review.ReviewLike.map((like) => like.userId);
    const recommendedUserIds = review.ReviewRecommend.map((r) => r.userId);

    const isUncontractedHospital = review.Hospital?.approvalStatusType !== 'APPROVED';

    const reviewCardData: ReviewCardData = {
      id: review.id,
      userId: review.userId,
      rating: review.rating,
      title: review.title ? parseLocalizedText(review.title) : null,
      content: review.content ? parseLocalizedText(review.content) : null,
      isRecommended: review.isRecommended,
      concernsMultilingual: review.concernsMultilingual
        ? parseLocalizedText(review.concernsMultilingual)
        : null,
      createdAt: review.createdAt,
      viewCount: didIncrementViewCount ? review.viewCount + 1 : review.viewCount,
      likeCount: review._count.ReviewLike, // 실시간 좋아요 수 계산
      commentCount: review.commentCount, // 댓글 수 (DB 필드 직접 사용)
      likedUserIds, // 좋아요를 한 사용자 ID들
      isLiked: false, // 기본값으로 false 설정 (클라이언트에서 처리)
      recommendedUserIds, // 추천을 한 사용자 ID들
      recommendCount: recommendedUserIds.length,
      user: {
        displayName,
        nickName,
        name: review.User?.name || null,
      },
      hospital: {
        id: review.Hospital.id,
        name: parseLocalizedText(review.Hospital.name),
        address: parseLocalizedText(review.Hospital.address),
        prices: parsePriceInfo(review.Hospital.prices),
        rating: review.Hospital.rating,
        reviewCount: review.Hospital._count.Review,
        thumbnailImageUrl: getHospitalThumbnailImageUrl(review.Hospital.HospitalImage),
        discountRate: review.Hospital.discountRate,
        ranking: review.Hospital.ranking,
        district: {
          name: review.Hospital.District?.name
            ? parseLocalizedText(review.Hospital.District.name)
            : { ko_KR: '', en_US: '', th_TH: '', zh_TW: '', ja_JP: '', hi_IN: '', tl_PH: '' },
          displayName: review.Hospital.District?.displayName
            ? parseLocalizedText(review.Hospital.District.displayName)
            : null,
        },
        displayLocationName: review.Hospital.displayLocationName
          ? parseLocalizedText(review.Hospital.displayLocationName)
          : null,
        badge: review.Hospital.badge,
        approvalStatusType: review.Hospital.approvalStatusType ?? null,
      },
      medicalSpecialty: {
        name: parseLocalizedText(review.MedicalSpecialty.name),
        specialtyType: review.MedicalSpecialty.specialtyType,
      },
      images: {
        before: isUncontractedHospital
          ? []
          : review.ReviewImage.filter((img) => img.imageType === 'BEFORE').map((img) => ({
              id: img.id,
              imageType: img.imageType,
              imageUrl: img.imageUrl,
              alt: img.alt,
              order: img.order,
            })),
        after: isUncontractedHospital
          ? []
          : review.ReviewImage.filter((img) => img.imageType === 'AFTER').map((img) => ({
              id: img.id,
              imageType: img.imageType,
              imageUrl: img.imageUrl,
              alt: img.alt,
              order: img.order,
            })),
      },
      requiresLogin: false, // 기본값, route handler에서 로그인 상태 확인 후 설정
    };

    return {
      review: reviewCardData,
    };
  } catch (error) {
    console.error('Error fetching review detail:', error);
    throw new Error('리뷰 상세 정보를 불러오는 중 오류가 발생했습니다.');
  }
}
