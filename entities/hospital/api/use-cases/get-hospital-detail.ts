import { type Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError, extractLocalizedText } from 'shared/lib';
import { parsePriceInfo } from 'shared/model/types';
import { type Hospital } from '../entities/types';
import { type OpeningHours } from '../entities/opening-hours-types';
import { getHospitalDoctors } from './get-hospital-doctors';

// Prisma 타입 정의
type HospitalDetailWithRelations = Prisma.HospitalGetPayload<{
  select: {
    id: true;
    name: true;
    address: true;
    prices: true;
    rating: true;
    discountRate: true;
    reviewCount: true;
    bookmarkCount: true;
    viewCount: true;
    approvalStatusType: true;
    ranking: true;
    createdAt: true;
    updatedAt: true;
    description: true;
    openingHours: true;
    HospitalImage: true;
    HospitalMedicalSpecialty: {
      include: {
        MedicalSpecialty: true;
      };
    };
    _count: {
      select: {
        HospitalLike: true;
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
 * 병원 상세 정보를 조회합니다. (정적 생성용 - 조회수 증가 없음)
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
      select: {
        id: true,
        name: true,
        address: true,
        prices: true,
        rating: true,
        discountRate: true,
        reviewCount: true,
        bookmarkCount: true,
        viewCount: true,
        approvalStatusType: true,
        ranking: true,
        createdAt: true,
        updatedAt: true,
        description: true,
        openingHours: true,
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
        _count: {
          select: {
            HospitalLike: true,
          },
        },
      },
    });

    if (!hospitalData) {
      throw new Error(`Hospital not found with id: ${id}`);
    }

    // 소속 의사 정보 조회
    const { doctors } = await getHospitalDoctors({ hospitalId: id });

    // 데이터 변환 (조회수 증가 없음)
    const hospital = transformHospitalDetailStatic(hospitalData);
    hospital.doctors = doctors;

    return {
      hospital,
    };
  } catch (error) {
    console.error('Error fetching hospital detail:', error);
    throw handleDatabaseError(error, 'getHospitalDetail');
  }
}

/**
 * 모든 병원 ID 목록을 조회합니다. (정적 생성용)
 */
export async function getAllHospitalIds(): Promise<string[]> {
  try {
    const hospitals = await prisma.hospital.findMany({
      where: {
        approvalStatusType: 'APPROVED',
      },
      select: {
        id: true,
      },
    });

    return hospitals.map((hospital) => hospital.id);
  } catch (error) {
    console.error('Error fetching hospital IDs:', error);
    throw handleDatabaseError(error, 'getAllHospitalIds');
  }
}

/**
 * Prisma 데이터를 Hospital 타입으로 변환합니다. (정적 생성용 - 조회수 증가 없음)
 */
function transformHospitalDetailStatic(data: HospitalDetailWithRelations): Hospital & {
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
    viewCount: data.viewCount, // 조회수 증가 없음
    likeCount: data._count.HospitalLike,
    likedUserIds: [], // 빈 배열로 설정
    isLiked: false, // 기본값으로 false 설정
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
    prices: parsePriceInfo(data.prices),
    discountRate: data.discountRate,
  };
}

/**
 * Prisma 데이터를 Hospital 타입으로 변환합니다. (동적 조회용 - 조회수 증가 포함)
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
    likeCount: data._count.HospitalLike,
    likedUserIds: [], // 빈 배열로 설정
    isLiked: false, // 기본값으로 false 설정
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
