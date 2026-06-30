import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type HospitalCardData, parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from '../../lib/image-utils';
import { fetchSortedHospitalPage } from '../lib/fetch-sorted-hospital-page';

// 카테고리별 병원 조회 옵션
export interface GetBestHospitalsOptions {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
}

/**
 * 메인페이지 "인기병원" carousel 데이터.
 *
 * 병원 리스트 페이지의 인기순(POPULAR)과 완전히 동일한 정렬을 사용한다.
 *  - ALL 탭   → RECOMMEND 큐레이션(category='RECOMMEND', sortType='POPULAR')
 *  - 진료과 탭 → 해당 specialtyType 큐레이션(sortType='POPULAR')
 * 정렬: e.position ASC NULLS LAST, h.rating DESC (fetchSortedHospitalPage 공유)
 * 배지: 리스트 페이지와 동일 — ALL(=RECOMMEND)은 Hospital.badge, 진료과는 큐레이션 엔트리 badge
 * carousel 특성상 카테고리별 limit(개수 제한)만 적용한다.
 */
export async function getBestHospitals(
  options: GetBestHospitalsOptions = {},
): Promise<HospitalCardData[]> {
  try {
    const { category = 'ALL', limit = 2 } = options;
    const isAll = category === 'ALL';

    const { rows } = await fetchSortedHospitalPage({
      curationCategory: isAll ? 'RECOMMEND' : category,
      adminSortType: 'POPULAR',
      specialtyType: isAll ? undefined : category,
      limit,
      offset: 0,
    });

    if (rows.length === 0) {
      return [];
    }

    const pageIds = rows.map((r) => r.id);
    const curationMap = new Map(rows.map((r) => [r.id, r]));

    // 정렬/필터는 위 쿼리가 처리했으므로, 카드 표시용 relations만 로드
    const hospitals = await prisma.hospital.findMany({
      where: { id: { in: pageIds } },
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
          where: {
            MedicalSpecialty: {
              isActive: true,
            },
          },
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
            Review: true, // 실제 리뷰 수 계산
          },
        },
      },
    });

    const hospitalMap = new Map(hospitals.map((h) => [h.id, h]));

    // DB 정렬 순서(rows) 복원 후 HospitalCardData로 변환 (findMany는 순서 보장 안 함)
    return pageIds
      .map((id) => {
        const hospital = hospitalMap.get(id);
        if (!hospital) return null;

        // 배지는 리스트 페이지와 동일하게:
        //  - ALL 탭(=RECOMMEND): 기본 배지 Hospital.badge
        //  - 진료과 탭: 큐레이션 엔트리 badge(e.badge)
        const curationBadge = curationMap.get(id)?.curation_badge;
        const badge = isAll
          ? ((hospital.badge as string[]) ?? null)
          : curationBadge
            ? [curationBadge]
            : null;

        return {
          id: hospital.id,
          name: parseLocalizedText(hospital.name),
          address: parseLocalizedText(hospital.address),
          prices: parsePriceInfo(hospital.prices),
          rating: hospital.rating,
          reviewCount: hospital._count.Review, // 실제 리뷰 수
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
          district: hospital.District || null, // District 정보 추가
          ranking: hospital.ranking,
          badge,
        };
      })
      .filter((h): h is NonNullable<typeof h> => h !== null);
  } catch (error) {
    throw handleDatabaseError(error, 'getBestHospitals');
  }
}
