import { prisma } from 'shared/lib/prisma';
import type { LikedHospital } from '../../entities/types';
import { getHospitalMainImageUrl } from 'entities/hospital/lib/image-utils';

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
        approvalStatusType: {
          not: 'REJECTED',
        },
        id: {
          in: paginatedHospitalIds,
        },
      },
      select: {
        id: true,
        name: true,
        address: true,
        prices: true, // 가격 정보 추가
        discountRate: true, // 할인율 추가
        rating: true,
        viewCount: true,
        approvalStatusType: true,
        ranking: true,
        createdAt: true,
        updatedAt: true,
        displayLocationName: true,
        latitude: true,
        longitude: true,
        badge: true,
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
        HospitalMedicalSpecialty: {
          select: {
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
            displayName: true,
            countryCode: true,
            level: true,
            order: true,
            parentId: true,
          },
        },
        _count: {
          select: {
            Review: true,
            HospitalLike: true,
          },
        },
        HospitalLike: {
          select: {
            userId: true,
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
          prices: hospital.prices, // 가격 정보 추가
          discountRate: hospital.discountRate, // 할인율 추가
          rating: hospital.rating,
          reviewCount: hospital._count.Review,
          bookmarkCount: hospital._count.HospitalLike,
          likeCount: hospital._count.HospitalLike, // 좋아요 수
          likedUserIds: hospital.HospitalLike.map((like) => like.userId), // 좋아요한 사용자 ID들
          viewCount: hospital.viewCount,
          approvalStatusType: hospital.approvalStatusType,
          ranking: hospital.ranking,
          createdAt: hospital.createdAt,
          updatedAt: hospital.updatedAt,
          mainImageUrl: getHospitalMainImageUrl(hospital.HospitalImage),
          hospitalImages: hospital.HospitalImage,
          medicalSpecialties: hospital.HospitalMedicalSpecialty.map((hms) => ({
            id: hms.MedicalSpecialty.id,
            name: hms.MedicalSpecialty.name,
            specialtyType: hms.MedicalSpecialty.specialtyType,
          })),
          displayLocationName: hospital.displayLocationName,
          district: hospital.District || null,
          latitude: hospital.latitude,
          longitude: hospital.longitude,
          badge: hospital.badge,
          isLiked: true, // 좋아요한 병원 목록이므로 항상 true
        }) as LikedHospital,
    );
  }
}
