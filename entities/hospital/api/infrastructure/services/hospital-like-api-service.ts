import type { HospitalLikeToggleResponse } from 'entities/hospital-like';

/**
 * 병원 좋아요 API 서비스
 */
export class HospitalLikeApiService {
  /**
   * 병원 좋아요 토글
   */
  async toggleHospitalLike(hospitalId: string): Promise<HospitalLikeToggleResponse> {
    const response = await fetch(`/api/hospitals/${hospitalId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('로그인이 필요합니다');
      }
      if (response.status === 404) {
        throw new Error('병원을 찾을 수 없습니다');
      }
      throw new Error('좋아요 처리 중 오류가 발생했습니다');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || '좋아요 처리 중 오류가 발생했습니다');
    }

    return result.data;
  }
}
