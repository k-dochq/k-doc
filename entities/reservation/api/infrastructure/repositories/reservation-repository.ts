import { prisma } from 'shared/lib/prisma';
import {
  type ReservationWithHospital,
  type ReservationWithHospitalForList,
  type ReservationWithHospitalAndUser,
} from '../../entities/types';

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
   * @param hasReviewed 리뷰 작성 여부 필터 (true: 작성한 병원만, false: 미작성 병원만, undefined: 전체)
   * @returns 전체 예약 수
   */
  async getUserReservationsCount(
    userId: string,
    hasReviewed?: boolean,
  ): Promise<number> {
    try {
      const whereClause = await this.buildReservationsWhereClause(userId, hasReviewed);
      const count = await prisma.reservation.count({
        where: whereClause,
      });

      return count;
    } catch (error) {
      console.error('Error counting user reservations:', error);
      throw new Error('예약 수를 조회하는 중 오류가 발생했습니다.');
    }
  }

  /**
   * hasReviewed 필터에 따른 where 조건 생성
   */
  private async buildReservationsWhereClause(
    userId: string,
    hasReviewed?: boolean,
  ): Promise<{ userId: string; hospitalId?: { in?: string[]; notIn?: string[] } }> {
    const baseWhere = { userId };

    if (hasReviewed === undefined) {
      return baseWhere;
    }

    const reviews = await prisma.review.findMany({
      where: {
        userId,
        isActive: { not: false },
      },
      select: { hospitalId: true },
      distinct: ['hospitalId'],
    });
    const hospitalIdsWithReviews = reviews.map((r) => r.hospitalId);

    if (hasReviewed) {
      return {
        ...baseWhere,
        hospitalId: { in: hospitalIdsWithReviews },
      };
    }

    // hasReviewed=false: 리뷰 미작성 병원만. 비어있으면 모든 병원이 미작성
    if (hospitalIdsWithReviews.length === 0) {
      return baseWhere;
    }

    return {
      ...baseWhere,
      hospitalId: { notIn: hospitalIdsWithReviews },
    };
  }

  /**
   * 사용자의 예약 내역을 개별 예약 정보와 병원 정보를 함께 조회
   * @param userId 사용자 ID
   * @param page 페이지 번호
   * @param limit 페이지당 항목 수
   * @param hasReviewed 리뷰 작성 여부 필터 (true: 작성한 병원만, false: 미작성 병원만, undefined: 전체)
   * @returns 예약 내역 배열 (개별 예약 정보 포함)
   */
  async getUserReservations(
    userId: string,
    page: number,
    limit: number,
    hasReviewed?: boolean,
  ): Promise<ReservationWithHospitalForList[]> {
    try {
      const whereClause = await this.buildReservationsWhereClause(userId, hasReviewed);

      const reservations = await prisma.reservation.findMany({
        where: whereClause,
        include: {
          Hospital: {
            include: {
              HospitalImage: {
                where: {
                  isActive: true,
                  imageType: {
                    in: ['THUMBNAIL', 'LOGO'],
                  },
                },
                orderBy: [
                  { imageType: 'asc' }, // THUMBNAIL이 먼저 오도록
                  { order: 'asc' },
                ],
                select: {
                  imageType: true,
                  imageUrl: true,
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
      console.error('Error fetching user reservations:', error);
      throw new Error('예약 내역을 불러오는 중 오류가 발생했습니다.');
    }
  }

  /**
   * 예약 ID로 예약 상세 정보 조회 (병원 정보 포함)
   * @param reservationId 예약 ID
   * @param userId 사용자 ID (본인 예약만 조회 가능)
   * @returns 예약 상세 정보
   */
  async getReservationById(
    reservationId: string,
    userId: string,
  ): Promise<ReservationWithHospitalAndUser | null> {
    try {
      const reservation = await prisma.reservation.findFirst({
        where: {
          id: reservationId,
          userId, // 본인 예약만 조회 가능
        },
        include: {
          Hospital: {
            include: {
              HospitalImage: {
                where: {
                  isActive: true,
                  imageType: {
                    in: ['THUMBNAIL', 'LOGO'],
                  },
                },
                orderBy: [{ imageType: 'asc' }, { order: 'asc' }],
                select: {
                  imageType: true,
                  imageUrl: true,
                },
              },
              District: {
                select: {
                  id: true,
                  name: true,
                  displayName: true,
                  countryCode: true,
                },
              },
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              phoneNumber: true,
              genderType: true,
              raw_user_meta_data: true,
            },
          },
        },
      });

      return reservation;
    } catch (error) {
      console.error('Error fetching reservation by id:', error);
      throw new Error('예약 상세 정보를 불러오는 중 오류가 발생했습니다.');
    }
  }
}
