import { ReservationRepository } from '../infrastructure/repositories';
import {
  type GetUserReservedHospitalsResponse,
  type GetUserReservedHospitalsParams,
  type ReservedHospitalData,
  type ReservationWithHospital,
  type HospitalMedicalSpecialtyWithSpecialty,
} from '../entities/types';

/**
 * 예약 내역에서 병원 정보를 추출하고 중복 제거
 */
function extractUniqueHospitals(reservations: ReservationWithHospital[]): ReservedHospitalData[] {
  const hospitalMap = new Map<string, ReservedHospitalData>();

  for (const reservation of reservations) {
    const { Hospital } = reservation;

    // 이미 추가된 병원은 건너뛰기 (첫 번째 예약만 사용)
    if (hospitalMap.has(Hospital.id)) {
      continue;
    }

    const hospitalData: ReservedHospitalData = {
      id: Hospital.id,
      name: Hospital.name as Record<string, string>,
      address: Hospital.address as Record<string, string>,
      rating: Hospital.rating,
      reviewCount: Hospital.reviewCount,
      bookmarkCount: Hospital.bookmarkCount,
      thumbnailUrl: Hospital.HospitalImage[0]?.imageUrl || null,
      hospitalImages: Hospital.HospitalImage.map((img) => ({
        imageType: img.imageType,
        imageUrl: img.imageUrl,
      })),
      prices: Hospital.prices,
      discountRate: Hospital.discountRate,
      ranking: Hospital.ranking,
      displayLocationName: Hospital.displayLocationName,
      badge: Hospital.badge,
      district: Hospital.District
        ? {
            id: Hospital.District.id,
            name: Hospital.District.name,
            displayName: Hospital.District.displayName,
            countryCode: Hospital.District.countryCode,
            level: Hospital.District.level,
            order: Hospital.District.order,
            parentId: Hospital.District.parentId,
          }
        : null,
      specialties: Hospital.HospitalMedicalSpecialty.map((hms) => {
        const hmsWithSpecialty = hms as HospitalMedicalSpecialtyWithSpecialty;
        return {
          id: hmsWithSpecialty.MedicalSpecialty.id,
          name: hmsWithSpecialty.MedicalSpecialty.name as Record<string, string>,
          type: hmsWithSpecialty.MedicalSpecialty.specialtyType,
        };
      }),
      reservationInfo: {
        reservationId: reservation.id,
        reservationDate: reservation.reservationDate,
        procedureName: reservation.procedureName,
        status: reservation.status,
      },
    };

    hospitalMap.set(Hospital.id, hospitalData);
  }

  return Array.from(hospitalMap.values());
}

/**
 * 사용자의 예약 병원 목록 조회 UseCase
 */
export async function getUserReservedHospitals(
  params: GetUserReservedHospitalsParams,
): Promise<GetUserReservedHospitalsResponse> {
  const { userId, page, limit } = params;

  try {
    const repository = new ReservationRepository();

    // 예약 내역 조회
    const reservations = await repository.getUserReservationsWithHospitals(userId, page, limit);

    // 전체 예약 수 조회
    const totalCount = await repository.getUserReservationsCount(userId);

    // 중복 병원 제거 및 데이터 변환
    const hospitals = extractUniqueHospitals(reservations);

    // 다음 페이지 여부 계산
    const hasNextPage = page * limit < totalCount;

    return {
      hospitals,
      hasNextPage,
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.error('Error in getUserReservedHospitals use case:', error);
    throw error instanceof Error
      ? error
      : new Error('예약 병원 목록을 불러오는 중 오류가 발생했습니다.');
  }
}
