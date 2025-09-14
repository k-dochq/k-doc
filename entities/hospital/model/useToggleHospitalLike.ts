'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type User } from '@supabase/supabase-js';
import { queryKeys } from 'shared/lib/query-keys';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { HospitalLikeApiService } from '../api/infrastructure/services/hospital-like-api-service';

interface UseToggleHospitalLikeParams {
  queryParams: {
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
  };
  user: User | null;
}

/**
 * 병원 좋아요 토글 뮤테이션 훅
 */
export function useToggleHospitalLike({ queryParams, user }: UseToggleHospitalLikeParams) {
  const queryClient = useQueryClient();
  const router = useLocalizedRouter();
  const hospitalLikeApiService = new HospitalLikeApiService();

  return useMutation({
    mutationFn: (hospitalId: string) => {
      // 로그인 체크
      if (!user) {
        // 현재 페이지 URL을 redirect 파라미터로 설정
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
        return Promise.reject(new Error('로그인이 필요합니다'));
      }
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
      alert(error.message);
    },
  });
}
