import { prisma } from 'shared/lib/prisma';
import type { ConsultationHospitalResponse } from '../../entities/types';

export class ConsultationHospitalRepository {
  async findConsultationHospitalsByUserId(userId: string): Promise<ConsultationHospitalResponse[]> {
    try {
      // 상담 메시지가 있는 병원들을 조회 (최근 메시지 기준으로 정렬)
      const consultationHospitals = await prisma.consultationMessage.findMany({
        where: {
          userId,
        },
        select: {
          hospitalId: true,
          createdAt: true,
          Hospital: {
            select: {
              id: true,
              name: true,
              address: true,
              phoneNumber: true,
              HospitalImage: {
                select: {
                  imageUrl: true,
                },
                where: {
                  isActive: true,
                },
                orderBy: {
                  order: 'asc',
                },
                take: 1,
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // 병원별로 그룹화하고 최근 메시지 시간 기준으로 정렬
      const hospitalMap = new Map();

      consultationHospitals.forEach((item) => {
        const hospitalId = item.hospitalId;
        if (
          !hospitalMap.has(hospitalId) ||
          hospitalMap.get(hospitalId).lastMessageAt < item.createdAt
        ) {
          hospitalMap.set(hospitalId, {
            hospital: item.Hospital,
            lastMessageAt: item.createdAt,
          });
        }
      });

      // Map을 배열로 변환하고 최근 메시지 시간 기준으로 정렬
      const result = Array.from(hospitalMap.values())
        .map(({ hospital, lastMessageAt }) => ({
          id: hospital.id,
          name: hospital.name,
          address: hospital.address,
          phoneNumber: hospital.phoneNumber,
          profileImageUrl: hospital.HospitalImage?.[0]?.imageUrl || null,
          lastMessageAt,
        }))
        .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());

      return result;
    } catch (error) {
      console.error('Error fetching consultation hospitals:', error);
      throw new Error('Failed to fetch consultation hospitals');
    }
  }
}
