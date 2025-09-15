/**
 * 지역 데이터 API 함수들
 */

import type { District } from '../model/types';

/**
 * 상위 지역 목록 조회 (level = 0)
 */
export async function fetchParentDistricts(): Promise<District[]> {
  const response = await fetch('/api/districts/parent');

  if (!response.ok) {
    throw new Error('상위 지역 목록을 불러오는 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '상위 지역 목록을 불러오는 중 오류가 발생했습니다');
  }

  return result.data || [];
}

/**
 * 하위 지역 목록 조회 (level = 1, parentId 기준)
 */
export async function fetchChildDistricts(parentId: string): Promise<District[]> {
  const response = await fetch(`/api/districts/children/${parentId}`);

  if (!response.ok) {
    throw new Error('하위 지역 목록을 불러오는 중 오류가 발생했습니다');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || '하위 지역 목록을 불러오는 중 오류가 발생했습니다');
  }

  return result.data || [];
}
