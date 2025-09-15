'use client';

import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type MedicalSpecialtyType } from '@prisma/client';

interface UseHospitalSearchParams {
  currentCategory?: MedicalSpecialtyType;
  currentSort?: string;
}

interface HospitalSearchHandler {
  handleSearch: (searchTerm: string) => void;
}

/**
 * 병원 검색 기능을 위한 훅
 * 현재 쿼리 파라미터를 유지하면서 검색어만 변경하는 로직을 제공
 */
export function useHospitalSearch({
  currentCategory,
  currentSort,
}: UseHospitalSearchParams): HospitalSearchHandler {
  const router = useLocalizedRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams();

    // 기존 파라미터들 유지
    if (currentCategory) {
      params.set('category', currentCategory);
    }
    if (currentSort) {
      params.set('sort', currentSort);
    }

    // 검색어 설정
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    }

    const queryString = params.toString();
    router.push(`/hospitals${queryString ? `?${queryString}` : ''}`);
  };

  return { handleSearch };
}
