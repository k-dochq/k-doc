import { type ReviewCardData, type ReviewImage } from '../../../model/types';
import { parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getUserDisplayName } from 'shared/lib';
import { type Prisma } from '@prisma/client';

/**
 * Prisma Review 쿼리 결과 타입
 * getAllReviews, getHospitalReviews에서 사용하는 Review 타입
 */
type PrismaReviewWithRelations = Prisma.ReviewGetPayload<{
  include: {
    User: {
      select: {
        displayName: true;
        nickName: true;
        name: true;
      };
    };
    Hospital: {
      select: {
        id: true;
        name: true;
        address: true;
        prices: true;
        rating: true;
        discountRate: true;
        ranking: true;
        displayLocationName: true;
        District: {
          select: {
            name: true;
            displayName: true;
          };
        };
        HospitalImage: {
          where: {
            imageType: 'THUMBNAIL';
          };
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }];
          take: 1;
          select: {
            imageUrl: true;
          };
        };
        _count: {
          select: {
            Review: true;
          };
        };
      };
    };
    MedicalSpecialty: {
      select: {
        name: true;
        specialtyType: true;
      };
    };
    ReviewImage: {
      select: {
        id: true;
        imageType: true;
        imageUrl: true;
        alt: true;
        order: true;
      };
    };
    ReviewLike: {
      select: {
        userId: true;
      };
    };
    _count: {
      select: {
        ReviewLike: true;
      };
    };
  };
}>;

/**
 * Doctor route에서 사용하는 Review 타입
 */
type DoctorRouteReview = {
  id: string;
  userId: string;
  rating: number;
  title: Prisma.JsonValue | null;
  content: Prisma.JsonValue | null;
  isRecommended: boolean;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  concerns: string | null;
  concernsMultilingual: Prisma.JsonValue | null;
  commentCount: number;
  User: {
    displayName: string | null;
    nickName: string | null;
    name: string | null;
  };
  MedicalSpecialty: {
    name: Prisma.JsonValue;
    specialtyType: string;
  };
  ReviewImage: Array<{
    id: string;
    imageType: string;
    imageUrl: string;
    alt: string | null;
    order: number | null;
  }>;
  ReviewLike: Array<{
    userId: string;
  }>;
  _count: {
    ReviewLike: number;
  };
};

/**
 * Doctor route에서 사용하는 Hospital 타입
 */
type DoctorRouteHospital = {
  id: string;
  name: Prisma.JsonValue;
  address: Prisma.JsonValue;
  prices: Prisma.JsonValue;
  rating: number;
  discountRate: number | null;
  ranking: number | null;
  displayLocationName: Prisma.JsonValue | null;
  District: {
    id: string;
    name: Prisma.JsonValue;
    displayName: Prisma.JsonValue | null;
    countryCode: string;
    level: number;
    order: number | null;
    parentId: string | null;
  } | null;
  HospitalImage: Array<{
    id: string;
    imageType: string;
    imageUrl: string;
    alt: string | null;
    order: number | null;
  }>;
  _count: {
    Review: number;
  };
};

/**
 * 리뷰 이미지를 before/after로 분리
 */
function separateReviewImages(images: Array<{ imageType: string; [key: string]: unknown }>): {
  before: ReviewImage[];
  after: ReviewImage[];
} {
  const before: ReviewImage[] = images
    .filter((img) => img.imageType === 'BEFORE')
    .map((img) => ({
      id: img.id as string,
      imageType: 'BEFORE' as const,
      imageUrl: img.imageUrl as string,
      alt: (img.alt as string | null) || null,
      order: (img.order as number | null) || null,
    }));

  const after: ReviewImage[] = images
    .filter((img) => img.imageType === 'AFTER')
    .map((img) => ({
      id: img.id as string,
      imageType: 'AFTER' as const,
      imageUrl: img.imageUrl as string,
      alt: (img.alt as string | null) || null,
      order: (img.order as number | null) || null,
    }));

  return { before, after };
}

/**
 * Hospital 데이터를 ReviewCardData 형식으로 변환
 */
function transformHospitalData(
  hospital: PrismaReviewWithRelations['Hospital'] | DoctorRouteHospital,
): ReviewCardData['hospital'] {
  // HospitalImage 처리
  let thumbnailImageUrl: string | null = null;
  if ('HospitalImage' in hospital) {
    const hospitalImages = hospital.HospitalImage;
    if (Array.isArray(hospitalImages)) {
      // PrismaReviewWithRelations의 경우 (THUMBNAIL 필터링된 배열, imageUrl만 있음)
      if (hospitalImages.length > 0 && 'imageUrl' in hospitalImages[0]) {
        thumbnailImageUrl = hospitalImages[0].imageUrl || null;
      }
      // DoctorRouteHospital의 경우 (전체 이미지 배열, imageType 포함)
      else if (hospitalImages.length > 0 && 'imageType' in hospitalImages[0]) {
        thumbnailImageUrl =
          (hospitalImages as Array<{ imageType?: string; imageUrl?: string }>).find(
            (img) => img.imageType === 'MAIN',
          )?.imageUrl ||
          (hospitalImages as Array<{ imageUrl?: string }>)[0]?.imageUrl ||
          null;
      }
    }
  }

  // District 처리
  const district = 'District' in hospital ? hospital.District : null;

  // ReviewCount 처리
  const reviewCount =
    '_count' in hospital && 'Review' in hospital._count
      ? hospital._count.Review
      : (hospital as DoctorRouteHospital)._count.Review;

  return {
    id: hospital.id,
    name: parseLocalizedText(hospital.name),
    address: parseLocalizedText(hospital.address),
    prices: parsePriceInfo(hospital.prices),
    rating: hospital.rating,
    reviewCount,
    thumbnailImageUrl,
    discountRate: hospital.discountRate,
    ranking: hospital.ranking,
    district: {
      name: district?.name
        ? parseLocalizedText(district.name)
        : { ko_KR: '', en_US: '', th_TH: '' },
      displayName: district?.displayName ? parseLocalizedText(district.displayName) : null,
    },
    displayLocationName: hospital.displayLocationName
      ? parseLocalizedText(hospital.displayLocationName)
      : null,
  };
}

/**
 * Prisma Review를 ReviewCardData로 변환 (Hospital 정보 포함)
 */
export function transformReviewToCardData(review: PrismaReviewWithRelations): ReviewCardData {
  const likedUserIds = review.ReviewLike.map((like) => like.userId);
  const { before, after } = separateReviewImages(review.ReviewImage);

  return {
    id: review.id,
    userId: review.userId,
    rating: review.rating,
    title: review.title ? parseLocalizedText(review.title) : null,
    content: review.content ? parseLocalizedText(review.content) : null,
    concernsMultilingual: review.concernsMultilingual
      ? parseLocalizedText(review.concernsMultilingual)
      : null,
    createdAt: review.createdAt,
    viewCount: review.viewCount,
    likeCount: review._count.ReviewLike,
    commentCount: review.commentCount,
    likedUserIds,
    isLiked: false,
    isRecommended: review.isRecommended,
    user: {
      displayName: getUserDisplayName(review.User),
      nickName: review.User.nickName,
      name: review.User.name,
    },
    hospital: transformHospitalData(review.Hospital),
    medicalSpecialty: {
      name: parseLocalizedText(review.MedicalSpecialty.name),
      specialtyType: review.MedicalSpecialty.specialtyType,
    },
    images: {
      before,
      after,
    },
    requiresLogin: false, // 기본값, route handler에서 로그인 상태 확인 후 설정
  };
}

/**
 * Doctor route의 Review를 ReviewCardData로 변환 (Hospital 정보 별도 전달)
 */
export function transformDoctorReviewToCardData(
  review: DoctorRouteReview,
  hospital: DoctorRouteHospital,
): ReviewCardData {
  const likedUserIds = review.ReviewLike.map((like) => like.userId);
  const { before, after } = separateReviewImages(review.ReviewImage);

  return {
    id: review.id,
    userId: review.userId,
    rating: review.rating,
    title: review.title ? parseLocalizedText(review.title) : null,
    content: review.content ? parseLocalizedText(review.content) : null,
    concernsMultilingual: review.concernsMultilingual
      ? parseLocalizedText(review.concernsMultilingual)
      : null,
    createdAt: review.createdAt,
    viewCount: review.viewCount,
    likeCount: review._count.ReviewLike,
    commentCount: review.commentCount,
    likedUserIds,
    isLiked: false,
    isRecommended: review.isRecommended,
    user: {
      displayName: getUserDisplayName(review.User),
      nickName: review.User.nickName,
      name: review.User.name,
    },
    hospital: transformHospitalData(hospital),
    medicalSpecialty: {
      name: parseLocalizedText(review.MedicalSpecialty.name),
      specialtyType: review.MedicalSpecialty.specialtyType,
    },
    images: {
      before,
      after,
    },
    requiresLogin: false, // 기본값, route handler에서 로그인 상태 확인 후 설정
  };
}
