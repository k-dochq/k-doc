'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { HospitalLikeApiService } from '../api/infrastructure/services/hospital-like-api-service';

interface UseToggleHospitalLikeParams {
  queryParams: {
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
  };
}

/**
 * 병원 좋아요 토글 뮤테이션 훅
 */
export function useToggleHospitalLike({ queryParams }: UseToggleHospitalLikeParams) {
  const queryClient = useQueryClient();
  const hospitalLikeApiService = new HospitalLikeApiService();

  return useMutation({
    mutationFn: (hospitalId: string) => hospitalLikeApiService.toggleHospitalLike(hospitalId),
    onSuccess: () => {
      // 성공 시 쿼리를 invalidate하여 최신 데이터로 업데이트
      // TanStack Query가 기존 데이터를 placeholder로 유지하면서 백그라운드에서 새 데이터를 가져옴
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.infinite(queryParams),
      });
    },
    onError: (error: Error) => {
      console.error('좋아요 처리 중 오류:', error.message);
    },
  });
}
