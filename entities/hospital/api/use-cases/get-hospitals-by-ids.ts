import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type HospitalCardData, parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from '../../lib/image-utils';

/**
 * 주어진 ID 배열에 해당하는 병원들을 HospitalCardData 형식으로 조회합니다.
 * 결과는 입력 배열의 순서대로 반환됩니다.
 */
export async function getHospitalsByIds(ids: string[]): Promise<HospitalCardData[]> {
  if (ids.length === 0) return [];

  try {
    const hospitals = await prisma.hospital.findMany({
      where: {
        id: { in: ids },
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        address: true,
        prices: true,
        rating: true,
        discountRate: true,
        displayLocationName: true,
        ranking: true,
        badge: true,
        HospitalImage: {
          where: { isActive: true },
          orderBy: [{ imageType: 'asc' }, { order: 'asc' }],
          select: { imageType: true, imageUrl: true },
        },
        HospitalMedicalSpecialty: {
          where: { MedicalSpecialty: { isActive: true } },
          select: {
            MedicalSpecialty: {
              select: {
                id: true,
                name: true,
                specialtyType: true,
                parentSpecialtyId: true,
                order: true,
              },
            },
          },
          take: 3,
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
        _count: { select: { Review: true } },
      },
    });

    const mapped: HospitalCardData[] = hospitals.map((hospital) => ({
      id: hospital.id,
      name: parseLocalizedText(hospital.name),
      address: parseLocalizedText(hospital.address),
      prices: parsePriceInfo(hospital.prices),
      rating: hospital.rating,
      reviewCount: hospital._count.Review,
      thumbnailImageUrl: getHospitalThumbnailImageUrl(hospital.HospitalImage),
      discountRate: hospital.discountRate,
      medicalSpecialties: hospital.HospitalMedicalSpecialty.map((hms) => ({
        id: hms.MedicalSpecialty.id,
        name: parseLocalizedText(hms.MedicalSpecialty.name),
        specialtyType: hms.MedicalSpecialty.specialtyType,
        parentSpecialtyId: hms.MedicalSpecialty.parentSpecialtyId ?? undefined,
        order: hms.MedicalSpecialty.order ?? undefined,
      })),
      displayLocationName: parseLocalizedText(hospital.displayLocationName || '{}'),
      district: hospital.District || null,
      ranking: hospital.ranking,
      badge: hospital.badge ?? null,
    }));

    // 입력 ID 순서대로 정렬
    const indexMap = new Map(ids.map((id, i) => [id, i]));
    mapped.sort((a, b) => (indexMap.get(a.id) ?? 0) - (indexMap.get(b.id) ?? 0));

    return mapped;
  } catch (error) {
    throw handleDatabaseError(error, 'getHospitalsByIds');
  }
}
