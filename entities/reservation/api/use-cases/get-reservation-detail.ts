import { ReservationRepository } from '../infrastructure/repositories';
import {
  type GetReservationDetailParams,
  type GetReservationDetailResponse,
  type ReservationDetailData,
  type ReservationWithHospitalForList,
} from '../entities/types';
import { getHospitalImageUrl } from 'shared/config/images';

/**
 * 예약 상세 정보 조회 UseCase
 */
export async function getReservationDetail(
  params: GetReservationDetailParams,
): Promise<GetReservationDetailResponse> {
  const { reservationId, userId } = params;

  try {
    const repository = new ReservationRepository();

    // 예약 상세 정보 조회
    const rawReservation = await repository.getReservationById(reservationId, userId);

    if (!rawReservation) {
      throw new Error('예약을 찾을 수 없습니다.');
    }

    // 데이터 변환
    const thumbnailUrl =
      rawReservation.Hospital.HospitalImage.find((img) => img.imageType === 'THUMBNAIL')
        ?.imageUrl || null;
    const logoImageUrl =
      rawReservation.Hospital.HospitalImage.find((img) => img.imageType === 'LOGO')?.imageUrl ||
      null;

    const reservation: ReservationDetailData = {
      id: rawReservation.id,
      reservationDate: rawReservation.reservationDate,
      reservationTime: rawReservation.reservationTime,
      status: rawReservation.status,
      procedureName: rawReservation.procedureName,
      hospital: {
        id: rawReservation.Hospital.id,
        name: rawReservation.Hospital.name as Record<string, string>,
        address: rawReservation.Hospital.address as Record<string, string>,
        directions: rawReservation.Hospital.directions as Record<string, string> | null,
        latitude: rawReservation.Hospital.latitude,
        longitude: rawReservation.Hospital.longitude,
        thumbnailImageUrl: thumbnailUrl,
        logoImageUrl: logoImageUrl,
        district: rawReservation.Hospital.District
          ? {
              id: rawReservation.Hospital.District.id,
              name: rawReservation.Hospital.District.name,
              displayName: rawReservation.Hospital.District.displayName,
              countryCode: rawReservation.Hospital.District.countryCode,
            }
          : null,
      },
      createdAt: rawReservation.createdAt,
      updatedAt: rawReservation.updatedAt,
    };

    return {
      reservation,
    };
  } catch (error) {
    console.error('Error in getReservationDetail use case:', error);
    throw error instanceof Error
      ? error
      : new Error('예약 상세 정보를 불러오는 중 오류가 발생했습니다.');
  }
}
