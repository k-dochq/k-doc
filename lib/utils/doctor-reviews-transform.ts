import { type ReviewCardData } from 'entities/review/model/types';
import { type DoctorDetail } from '@/lib/queries/doctor';
import { type ReviewImageType } from '@prisma/client';
import { parsePriceInfo, parseLocalizedText } from 'shared/model/types';
import { getUserDisplayName } from 'shared/lib';

/**
 * DoctorDetail의 hospital.reviews를 ReviewCardData 타입으로 변환
 */
export function transformDoctorReviewsToReviewCardData(doctor: DoctorDetail): ReviewCardData[] {
  return doctor.hospital.reviews.map((review) => ({
    id: review.id,
    rating: review.rating,
    title: review.title,
    content: review.content,
    isRecommended: review.isRecommended,
    concernsMultilingual: review.concernsMultilingual
      ? parseLocalizedText(review.concernsMultilingual)
      : null,
    createdAt: review.createdAt,
    viewCount: review.viewCount,
    likeCount: review.likeCount,
    commentCount: review.commentCount,
    likedUserIds: [], // doctor 상세에서는 좋아요 기능 비활성화
    isLiked: false,
    user: {
      displayName: getUserDisplayName(review.user),
      nickName: review.user.nickName,
      name: review.user.name,
    },
    hospital: {
      id: doctor.hospital.id,
      name: doctor.hospital.name,
      address: doctor.hospital.address,
      prices: parsePriceInfo(doctor.hospital.prices),
      rating: doctor.hospital.rating,
      reviewCount: doctor.hospital.reviewCount,
      thumbnailImageUrl:
        doctor.hospital.hospitalImages.find((img) => img.imageType === 'MAIN')?.imageUrl ||
        doctor.hospital.hospitalImages[0]?.imageUrl ||
        null,
      discountRate: doctor.hospital.discountRate,
      ranking: doctor.hospital.ranking,
      district: doctor.hospital.district
        ? {
            name: doctor.hospital.district.name,
            displayName: doctor.hospital.district.displayName
              ? parseLocalizedText(doctor.hospital.district.displayName)
              : null,
          }
        : {
            name: { ko_KR: '서울', en_US: 'Seoul', th_TH: 'กรุงเทพ' },
            displayName: null,
          },
      displayLocationName: doctor.hospital.displayLocationName,
    },
    medicalSpecialty: {
      name: review.medicalSpecialty.name,
      specialtyType: review.medicalSpecialty.specialtyType,
    },
    images: {
      before: review.reviewImages
        .filter((img) => img.imageType === 'BEFORE')
        .map((img) => ({
          id: img.id,
          imageType: img.imageType as ReviewImageType,
          imageUrl: img.imageUrl,
          alt: img.alt,
          order: img.order,
        })),
      after: review.reviewImages
        .filter((img) => img.imageType === 'AFTER')
        .map((img) => ({
          id: img.id,
          imageType: img.imageType as ReviewImageType,
          imageUrl: img.imageUrl,
          alt: img.alt,
          order: img.order,
        })),
    },
  }));
}
