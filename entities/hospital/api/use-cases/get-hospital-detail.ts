import { type Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError, extractLocalizedText } from 'shared/lib';
import { type Hospital } from '../entities/types';
import { type OpeningHours } from '../entities/opening-hours-types';

// Prisma 타입 정의
type HospitalDetailWithRelations = Prisma.HospitalGetPayload<{
  include: {
    HospitalImage: true;
    HospitalMedicalSpecialty: {
      include: {
        MedicalSpecialty: true;
      };
    };
  };
}>;

export interface GetHospitalDetailRequest {
  id: string;
}

export interface GetHospitalDetailResponse {
  hospital: Hospital & {
    description?: string;
    openingHours?: OpeningHours;
  };
}

/**
 * 병원 상세 정보를 조회합니다.
 */
export async function getHospitalDetail(
  request: GetHospitalDetailRequest,
): Promise<GetHospitalDetailResponse> {
  try {
    const { id } = request;

    console.log(`[${new Date().toISOString()}] 병원 상세 조회: ${id}`);

    const hospitalData = await prisma.hospital.findUnique({
      where: {
        id,
        approvalStatusType: 'APPROVED', // 승인된 병원만 조회
      },
      include: {
        HospitalImage: {
          where: {
            isActive: true,
          },
          orderBy: [
            { imageType: 'asc' }, // MAIN이 먼저 오도록
            { order: 'asc' },
          ],
        },
        HospitalMedicalSpecialty: {
          include: {
            MedicalSpecialty: true,
          },
        },
      },
    });

    if (!hospitalData) {
      throw new Error(`Hospital not found with id: ${id}`);
    }

    // 조회수 증가
    await prisma.hospital.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    // 데이터 변환
    const hospital = transformHospitalDetail(hospitalData);

    return {
      hospital,
    };
  } catch (error) {
    console.error('Error fetching hospital detail:', error);
    throw handleDatabaseError(error, 'getHospitalDetail');
  }
}

/**
 * Prisma 데이터를 Hospital 타입으로 변환합니다.
 */
function transformHospitalDetail(data: HospitalDetailWithRelations): Hospital & {
  description?: string;
  openingHours?: OpeningHours;
} {
  // 메인 이미지 URL 추출 (MAIN 타입 우선, 없으면 첫 번째 이미지)
  const mainImage =
    data.HospitalImage.find((img) => img.imageType === 'MAIN') || data.HospitalImage[0];
  const mainImageUrl = mainImage?.imageUrl || null;

  // 진료 부위 변환
  const medicalSpecialties = data.HospitalMedicalSpecialty.map((hms) => ({
    id: hms.MedicalSpecialty.id,
    name: hms.MedicalSpecialty.name,
    specialtyType: hms.MedicalSpecialty.specialtyType,
  }));

  // 운영시간은 JSON 필드에서 직접 가져옴 (타입 안전성을 위해 캐스팅)
  const openingHours = data.openingHours as OpeningHours;

  return {
    id: data.id,
    name: data.name,
    address: data.address,
    rating: data.rating,
    reviewCount: data.reviewCount,
    bookmarkCount: data.bookmarkCount,
    viewCount: data.viewCount + 1, // 조회수 증가 반영
    approvalStatusType: data.approvalStatusType,
    ranking: data.ranking,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    mainImageUrl,
    hospitalImages: data.HospitalImage.map((img) => ({
      id: img.id,
      hospitalId: img.hospitalId,
      imageType: img.imageType,
      imageUrl: img.imageUrl,
      alt: img.alt,
      order: img.order,
      isActive: img.isActive,
      createdAt: img.createdAt,
      updatedAt: img.updatedAt,
    })),
    medicalSpecialties,
    description: extractLocalizedText(data.description, 'ko') || undefined,
    openingHours,
  };
}
