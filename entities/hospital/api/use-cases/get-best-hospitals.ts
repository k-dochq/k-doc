import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Hospital } from '../entities/types';

export async function getBestHospitals(): Promise<Hospital[]> {
  try {
    const hospitals = await prisma.hospital.findMany({
      where: {
        approvalStatusType: 'APPROVED',
        // rating: {
        //   gte: 1.0,
        // },
        // reviewCount: {
        //   gte: 5,
        // },
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' },
        { bookmarkCount: 'desc' },
        { viewCount: 'desc' },
      ],
      take: 10, // 상위 10개 병원
    });

    return hospitals;
  } catch (error) {
    throw handleDatabaseError(error, 'getBestHospitals');
  }
}
