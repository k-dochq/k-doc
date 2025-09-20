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
    mutationFn: (hospitalId: string) => {
      return hospitalLikeApiService.toggleHospitalLike(hospitalId);
    },
    onSuccess: () => {
      // 병원 관련 모든 쿼리 invalidate (리스트, 상세, 좋아요한 병원 등)
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.all,
        exact: false, // 모든 hospitals 관련 쿼리를 invalidate
      });

      // 좋아요한 병원 리스트 쿼리도 별도로 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.liked.all(),
        exact: false, // 모든 liked hospitals 쿼리를 invalidate
      });

      // 병원 좋아요 상태 쿼리도 invalidate
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospitalLike.all,
        exact: false, // 모든 hospital-like 쿼리를 invalidate
      });
    },
    onError: (error: Error) => {
      console.error('좋아요 처리 중 오류:', error.message);
      // alert 대신 에러를 상위 컴포넌트에서 처리하도록 함
      // 401 에러는 상위 컴포넌트에서 LoginRequiredModal로 처리됨
    },
  });
}
