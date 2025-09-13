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
      // 성공 시 쿼리를 invalidate하여 최신 데이터로 업데이트
      // TanStack Query가 기존 데이터를 placeholder로 유지하면서 백그라운드에서 새 데이터를 가져옴
      queryClient.invalidateQueries({
        queryKey: queryKeys.hospitals.infinite(queryParams),
      });
    },
    onError: (error: Error) => {
      console.error('좋아요 처리 중 오류:', error.message);
      alert(error.message);
    },
  });
}
