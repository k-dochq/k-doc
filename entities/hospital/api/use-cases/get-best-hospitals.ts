import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Hospital } from '../entities/types';

/**
 * 썸네일 이미지 URL을 추출하는 헬퍼 함수
 */
function extractThumbnailImageUrl(hospitalImages: any[]): string | null {
  if (!hospitalImages || hospitalImages.length === 0) {
    return null;
  }

  // THUMBNAIL 타입의 활성 이미지 중 첫 번째를 찾기
  const thumbnailImage = hospitalImages.find(
    (image) => image.imageType === 'THUMBNAIL' && image.isActive === true,
  );

  return thumbnailImage?.imageUrl || null;
}

export async function getBestHospitals(): Promise<Hospital[]> {
  try {
    const hospitals = await prisma.hospital.findMany({
      where: {
        approvalStatusType: 'APPROVED',
      },
      include: {
        HospitalImage: {
          where: {
            isActive: true,
            imageType: 'THUMBNAIL',
          },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          take: 1, // 첫 번째 썸네일 이미지만
        },
      },
      orderBy: [{ ranking: 'asc' }, { rating: 'desc' }, { reviewCount: 'desc' }],
      take: 10, // 상위 10개 병원
    });

    // Hospital 타입에 맞게 데이터 변환
    return hospitals.map((hospital) => ({
      id: hospital.id,
      name: hospital.name,
      rating: hospital.rating,
      reviewCount: hospital.reviewCount,
      bookmarkCount: hospital.bookmarkCount,
      viewCount: hospital.viewCount,
      approvalStatusType: hospital.approvalStatusType,
      ranking: hospital.ranking,
      createdAt: hospital.createdAt,
      updatedAt: hospital.updatedAt,
      mainImageUrl: extractThumbnailImageUrl(hospital.HospitalImage),
      hospitalImages: hospital.HospitalImage.map((image) => ({
        id: image.id,
        hospitalId: image.hospitalId,
        imageType: image.imageType as 'MAIN' | 'THUMBNAIL' | 'PROMOTION' | 'DETAIL' | 'INTERIOR',
        imageUrl: image.imageUrl,
        alt: image.alt,
        order: image.order,
        isActive: image.isActive,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
      })),
    }));
  } catch (error) {
    throw handleDatabaseError(error, 'getBestHospitals');
  }
}
