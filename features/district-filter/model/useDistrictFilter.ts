'use client';

import { useState, useCallback } from 'react';

export function useDistrictFilter() {
  // 로컬 상태로만 관리 - URL에 반영하지 않음
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<string[]>([]);

  // 지역 선택 토글
  const toggleDistrict = useCallback((districtId: string) => {
    setSelectedDistrictIds((prev) =>
      prev.includes(districtId) ? prev.filter((id) => id !== districtId) : [...prev, districtId],
    );
  }, []);

  // 모든 지역 선택
  const selectAllDistricts = useCallback((districtIds: string[]) => {
    setSelectedDistrictIds(districtIds);
  }, []);

  // 모든 지역 선택 해제
  const deselectAllDistricts = useCallback(() => {
    setSelectedDistrictIds([]);
  }, []);

  // 지역 필터 초기화
  const resetDistrictFilter = useCallback(() => {
    setSelectedDistrictIds([]);
  }, []);

  // 선택된 지역 필터 개수
  const selectedDistrictCount = selectedDistrictIds.length;

  return {
    // 상태
    selectedDistrictIds,
    selectedDistrictCount,

    // 액션
    toggleDistrict,
    selectAllDistricts,
    deselectAllDistricts,
    resetDistrictFilter,
    setSelectedDistrictIds,
  };
}
