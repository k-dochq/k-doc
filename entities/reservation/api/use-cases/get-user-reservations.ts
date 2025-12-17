import { ReservationRepository } from '../infrastructure/repositories';
import {
  type GetUserReservationsResponse,
  type GetUserReservationsParams,
  type ReservationData,
  type ReservationWithHospitalForList,
} from '../entities/types';

/**
 * 예약 내역을 ReservationData 타입으로 변환
 */
function transformReservationToData(reservation: ReservationWithHospitalForList): ReservationData {
  const { Hospital } = reservation;

  // THUMBNAIL과 LOGO 이미지 분리
  const thumbnailImage = Hospital.HospitalImage.find((img) => img.imageType === 'THUMBNAIL');
  const logoImage = Hospital.HospitalImage.find((img) => img.imageType === 'LOGO');

  return {
    id: reservation.id,
    reservationDate: reservation.reservationDate,
    reservationTime: reservation.reservationTime,
    status: reservation.status,
    procedureName: reservation.procedureName,
    hospital: {
      id: Hospital.id,
      name: Hospital.name as Record<string, string>,
      address: Hospital.address as Record<string, string>,
      directions: (Hospital.directions as Record<string, string> | null) || null,
      latitude: Hospital.latitude,
      longitude: Hospital.longitude,
      thumbnailImageUrl: thumbnailImage?.imageUrl || null,
      logoImageUrl: logoImage?.imageUrl || null,
      district: Hospital.District
        ? {
            id: Hospital.District.id,
            name: Hospital.District.name,
            displayName: Hospital.District.displayName,
            countryCode: Hospital.District.countryCode,
          }
        : null,
    },
    createdAt: reservation.createdAt,
    updatedAt: reservation.updatedAt,
  };
}

/**
 * 사용자의 예약 내역 조회 UseCase
 */
export async function getUserReservations(
  params: GetUserReservationsParams,
): Promise<GetUserReservationsResponse> {
  const { userId, page, limit } = params;

  try {
    const repository = new ReservationRepository();

    // 예약 내역 조회
    const reservations = await repository.getUserReservations(userId, page, limit);

    // 전체 예약 수 조회
    const totalCount = await repository.getUserReservationsCount(userId);

    // 데이터 변환
    const reservationData = reservations.map(transformReservationToData);

    // 다음 페이지 여부 계산
    const hasNextPage = page * limit < totalCount;

    return {
      reservations: reservationData,
      hasNextPage,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.error('Error in getUserReservations use case:', error);
    throw error instanceof Error
      ? error
      : new Error('예약 내역을 불러오는 중 오류가 발생했습니다.');
  }
}
