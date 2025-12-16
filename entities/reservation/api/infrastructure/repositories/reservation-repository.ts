import { prisma } from 'shared/lib/prisma';
import { type ReservationWithHospital } from '../../entities/types';

/**
 * Reservation Repository
 * 예약 데이터 접근 계층
 */
export class ReservationRepository {
  /**
   * 사용자의 예약 내역을 병원 정보와 함께 조회
   * @param userId 사용자 ID
   * @param page 페이지 번호
   * @param limit 페이지당 항목 수
   * @returns 예약 내역 배열
   */
  async getUserReservationsWithHospitals(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ReservationWithHospital[]> {
    try {
      const reservations = await prisma.reservation.findMany({
        where: {
          userId,
        },
        include: {
          Hospital: {
            include: {
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
                include: {
                  MedicalSpecialty: true,
                },
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
            },
          },
        },
        orderBy: {
          createdAt: 'desc', // 최신 예약순
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return reservations;
    } catch (error) {
      console.error('Error fetching user reservations with hospitals:', error);
      throw new Error('예약 내역을 불러오는 중 오류가 발생했습니다.');
    }
  }

  /**
   * 사용자의 전체 예약 수 조회
   * @param userId 사용자 ID
   * @returns 전체 예약 수
   */
  async getUserReservationsCount(userId: string): Promise<number> {
    try {
      const count = await prisma.reservation.count({
        where: {
          userId,
        },
      });

      return count;
    } catch (error) {
      console.error('Error counting user reservations:', error);
      throw new Error('예약 수를 조회하는 중 오류가 발생했습니다.');
    }
  }
}
