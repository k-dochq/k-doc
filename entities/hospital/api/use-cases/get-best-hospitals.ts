import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Hospital } from '../entities/types';

export async function getBestHospitals(): Promise<Hospital[]> {
  try {
    const hospitals = await prisma.hospital.findMany({
      where: {
        approvalStatusType: 'APPROVED',
      },
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
      mainImageUrl: null,
    }));
  } catch (error) {
    throw handleDatabaseError(error, 'getBestHospitals');
  }
}
