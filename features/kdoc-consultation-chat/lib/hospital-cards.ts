import { type HospitalCardData } from 'shared/model/types';

export interface HospitalCardItem {
  id: string;
  nameKo: string;
  nameEn: string;
  districtKo: string;
  thumbnailImageUrl: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  rating: number;
  reviewCount: number;
  badges: string[];
  specialties: Array<{ id: string; nameKo: string; nameEn: string; specialtyType: string }>;
}

export interface HospitalCardsPayload {
  text?: string;
  hospitals: HospitalCardItem[];
}

export function parseHospitalCards(content: string): HospitalCardsPayload | null {
  try {
    const parsed = JSON.parse(content);
    if (parsed?.type === 'hospitalCards' && Array.isArray(parsed.hospitals)) {
      return { text: parsed.text, hospitals: parsed.hospitals };
    }
    return null;
  } catch {
    return null;
  }
}

export function toHospitalCardData(
  h: HospitalCardItem,
  thumbnailOverride: string | null | undefined,
): HospitalCardData {
  return {
    id: h.id,
    name: { ko_KR: h.nameKo, en_US: h.nameEn },
    address: { ko_KR: h.districtKo },
    thumbnailImageUrl: thumbnailOverride !== undefined ? thumbnailOverride : h.thumbnailImageUrl,
    prices: h.minPrice != null ? { minPrice: h.minPrice, maxPrice: h.maxPrice ?? undefined } : null,
    rating: h.rating,
    reviewCount: h.reviewCount,
    discountRate: null,
    badge: h.badges?.length ? h.badges : null,
    displayLocationName: h.districtKo ? { ko_KR: h.districtKo } : null,
    medicalSpecialties:
      h.specialties?.map((s) => ({
        id: s.id,
        name: { ko_KR: s.nameKo, en_US: s.nameEn },
        specialtyType: s.specialtyType,
        order: null,
      })) ?? [],
  };
}
