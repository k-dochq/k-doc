import { prisma } from 'shared/lib/prisma';
import type { LikedHospital } from '../../entities/types';

export interface ILikedHospitalsRepository {
  getLikedHospitalIds(userId: string): Promise<string[]>;
  getHospitalsByIds(hospitalIds: string[], offset: number, limit: number): Promise<LikedHospital[]>;
}

export class LikedHospitalsRepository implements ILikedHospitalsRepository {
  async getLikedHospitalIds(userId: string): Promise<string[]> {
    const likedHospitalIds = await prisma.hospitalLike.findMany({
      where: {
        userId,
      },
      select: {
        hospitalId: true,
      },
      orderBy: {
        createdAt: 'desc', // 최근에 좋아요한 순서
      },
    });

    return likedHospitalIds.map((like) => like.hospitalId);
  }

  async getHospitalsByIds(
    hospitalIds: string[],
    offset: number,
    limit: number,
  ): Promise<LikedHospital[]> {
    // 페이지네이션을 위한 병원 ID 슬라이스
    const paginatedHospitalIds = hospitalIds.slice(offset, offset + limit);

    if (paginatedHospitalIds.length === 0) {
      return [];
    }

    // 좋아요한 병원들의 상세 정보 가져오기
    const hospitals = await prisma.hospital.findMany({
      where: {
        id: {
          in: paginatedHospitalIds,
        },
        approvalStatusType: 'APPROVED',
      },
      include: {
        HospitalImage: {
          where: {
            imageType: 'THUMBNAIL',
            isActive: true,
          },
          select: {
            imageUrl: true,
            alt: true,
          },
          take: 1,
        },
        HospitalMedicalSpecialty: {
          include: {
            MedicalSpecialty: {
              select: {
                id: true,
                name: true,
                specialtyType: true,
              },
            },
          },
          take: 3, // 최대 3개의 전문 분야만 표시
        },
        District: {
          select: {
            id: true,
            name: true,
            countryCode: true,
          },
        },
        _count: {
          select: {
            Review: true,
            HospitalLike: true,
          },
        },
      },
    });

    // 좋아요한 순서대로 정렬
    const sortedHospitals = paginatedHospitalIds
      .map((id) => hospitals.find((hospital) => hospital.id === id))
      .filter((hospital): hospital is NonNullable<typeof hospital> => hospital !== undefined);

    // 응답 데이터 포맷팅 - Hospital 타입과 호환되도록 변환
    return sortedHospitals.map(
      (hospital) =>
        ({
          id: hospital.id,
          name: hospital.name,
          address: hospital.address,
          rating: hospital.rating,
          reviewCount: hospital._count.Review,
          bookmarkCount: hospital._count.HospitalLike,
          viewCount: hospital.viewCount,
          approvalStatusType: hospital.approvalStatusType,
          ranking: hospital.ranking,
          createdAt: hospital.createdAt,
          updatedAt: hospital.updatedAt,
          mainImageUrl: hospital.HospitalImage[0]?.imageUrl || null,
          medicalSpecialties: hospital.HospitalMedicalSpecialty.map((hms) => ({
            id: hms.MedicalSpecialty.id,
            name: hms.MedicalSpecialty.name,
            specialtyType: hms.MedicalSpecialty.specialtyType,
          })),
          district: hospital.District
            ? {
                id: hospital.District.id,
                name: hospital.District.name as Record<string, string>,
                countryCode: hospital.District.countryCode,
              }
            : null,
          isLiked: true, // 좋아요한 병원 목록이므로 항상 true
        }) as LikedHospital,
    );
  }
}
